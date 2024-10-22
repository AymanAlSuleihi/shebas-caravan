import decimal
import math
import string

import numpy as np
from fastapi import APIRouter
from app.services.metal_calculator import metal_calculator, MetalCalculator, Cuboid, Cylinder, Sphere

router = APIRouter()


@router.get(
    "/sheet/weight",
)
def sheet_weight(
    alloy: str,
    dim_x: float,
    dim_y: float,
    dim_z: float,
) -> float:
    density = metal_calculator.densities.get(alloy)
    return Cuboid(x=dim_x, y=dim_y, z=dim_z, density=density).get_weight()


@router.get(
    "/wire/weight",
)
def wire_weight(
    alloy: str,
    radius: float,
    length: float,
) -> float:
    density = metal_calculator.densities.get(alloy)
    return Cylinder(radius=radius, length=length, density=density).get_weight()


@router.get(
    "/wire/radius",
)
def wire_radius(
    alloy: str,
    length: float,
    weight: float,
) -> float:
    density = metal_calculator.densities.get(alloy)
    return Cylinder(length=length, weight=weight, density=density).get_radius()


@router.get(
    "/wire/length",
)
def wire_length(
    alloy: str,
    radius: float,
    weight: float,
) -> float:
    density = metal_calculator.densities.get(alloy)
    return Cylinder(radius=radius, weight=weight, density=density).get_length()


@router.get(
    "/granule/weight",
)
def granule_weight(
    alloy: str,
    radius: float,
) -> float:
    density = metal_calculator.densities.get(alloy)
    return Sphere(radius=radius, density=density).get_weight()


@router.get(
    "/granule/radius",
)
def granule_radius(
    alloy: str,
    weight: float,
) -> float:
    density = metal_calculator.densities.get(alloy)
    return Sphere(weight=weight, density=density).get_radius()


@router.get(
    "/granule/from-wire/rod-radius",
)
def wire_to_granule_rod_radius(
    wire_radius: float,
    granule_radius: float,
):
    granule_volume = Sphere(radius=granule_radius).get_volume()
    wire_length = granule_volume / (math.pi * wire_radius**2)
    rod_radius = wire_length / (2 * math.pi)
    return rod_radius


@router.get(
    "/granule/from-wire/wire-radius",
)
def wire_to_granule_wire_radius(
    rod_radius: float,
    granule_radius: float,
):
    rod_circumference = 2 * math.pi * rod_radius
    granule_volume = Sphere(radius=granule_radius).get_volume()
    wire_radius = math.sqrt(granule_volume / (math.pi * rod_circumference))
    return wire_radius


@router.get(
    "/granule/from-wire/granule-radius",
)
def wire_to_granule_granule_radius(
    wire_radius: float,
    rod_radius: float,
):
    rod_circumference = 2 * math.pi * rod_radius
    volume = Cylinder(radius=wire_radius, length=rod_circumference).get_volume()
    granule_radius = (3 * (volume / (4 * math.pi)))**(1/3)
    return granule_radius


@router.get(
    "/ring-blank",
)
def ring_blank(
    ring_size: float | str,
    size_format: str,
    ring_width: float,
    sheet_thickness: float,
):
    diameter = metal_calculator.get_ring_size_diameter(ring_size, size_format)
    blank_length = (diameter + sheet_thickness) * math.pi
    if ring_width > 4:
        blank_length += 0.5
    return blank_length


@router.get(
    "/ring-size-converter",
)
def ring_size_converter(
    size_format_from: str,
    size_format_to: str,
    ring_size: float | str,
):
    converted_size = None
    diameter = metal_calculator.get_ring_size_diameter(ring_size, size_format_from)
    if size_format_to == "US":
        converted_size = f"{1.23031496 * diameter - 14.30856299:.2f}"
    elif size_format_to == "UK":
        if diameter < 12:
            return "Too Small"
        elif diameter > 22.30:
            return "Too Large"
        circumference = diameter * math.pi
        converted_dec = (circumference - 37.8) / 1.252
        remainder = converted_dec % 1
        whole = converted_dec - remainder
        remainder = round(remainder * 4) / 4
        num, den = round(remainder, 2).as_integer_ratio()
        converted_size = chr(int(whole + 97)).upper()
        if num > 0:
            converted_size = ' '.join([converted_size, f" {num}/{den}"])
    elif size_format_to == "EU":
        converted_size = f"{diameter * math.pi:.2f}"
    return converted_size


@router.get(
    "/ring-size-formats",
)
def ring_size_formats():
    return ["US", "UK", "EU"]


@router.get(
    "/ring-sizes",
)
def ring_size_options(
    locale: str,
):
    options = []
    if locale == "US":
        options = np.arange(0, 16.25, 0.25).tolist()
    elif locale == "UK":
        for letter in list(string.ascii_uppercase):
            options.extend(letter)
            options.extend([
                f"{letter} 1/4",
                f"{letter} 1/2",
                f"{letter} 3/4"
            ])
    elif locale == "EU":
        options = np.arange(36, 78, 0.5).tolist()
    return options


@router.get(
    "/metals",
)
def metals():
    return list(metal_calculator.densities.keys())
