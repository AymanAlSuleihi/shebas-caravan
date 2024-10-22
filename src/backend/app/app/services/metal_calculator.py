import math


class Shape:
    def __init__(
        self,
        density: float = None,
        weight: float = None,
    ):
        self.density = density
        self.weight = weight

    def get_weight(self) -> float:
        return self.get_volume() * (self.density / 1000)


class Cuboid(Shape):
    def __init__(
        self,
        x: float = None,
        y: float = None,
        z: float = None,
        weight: float = None,
        density: float = None,
    ):
        super().__init__(density=density, weight=weight)
        self.x = x
        self.y = y
        self.z = z

    def get_volume(self):
        return self.x * self.y * self.z


class Cylinder(Shape):
    def __init__(
        self,
        radius: float = None,
        length: float = None,
        weight: float = None,
        density: float = None,
    ):
        super().__init__(density=density, weight=weight)
        self.radius = radius
        self.length = length
        self.weight = weight

    def get_volume(self) -> float:
        return (self.radius * self.radius * math.pi) * self.length

    def get_radius(self) -> float:
        return math.sqrt(
            math.pi * self.length * self.weight * (self.density/1000)
        ) / (math.pi * self.length * (self.density/1000))

    def get_length(self) -> float:
        return (1000 * self.weight) / (math.pi * self.density * (self.radius**2))


class Sphere(Shape):
    def __init__(
        self,
        radius: float = None,
        weight: float = None,
        density: float = None,
    ):
        super().__init__(density=density, weight=weight)
        self.radius = radius
        self.weight = weight

    def get_volume(self) -> float:
        return (4/3) * (self.radius**3) * math.pi

    def get_radius(self) -> float:
        return (
            10 * (6 * self.weight * (math.pi**2) * (self.density**2))**(1/3)
        ) / (2 * math.pi * self.density)


class MetalCalculator:
    def __init__(self):
        self._densities = {
            "Fine Silver": 10.5,
            "925 Silver": 10.36,
            "940 Silver": 10.38,
            "24ct Gold": 19.32,
            "22ct Yellow Gold": 17.86,
            "18ct Yellow Gold": 15.51,
            "18ct Pink Gold": 15.17,
            "18ct White Gold": 15.64,
            "14ct Yellow Gold": 12.96,
            "14ct Pink Gold": 13.09,
            "14ct White Gold": 13.87,
            "10ct Yellow Gold": 11.48,
            "10ct Pink Gold": 11.20,
            "10ct White Gold": 12.84,
            "9ct Yellow Gold": 11.16,
            "9ct Pink Gold": 11.23,
            "9ct White Gold": 12.55,
            "Platinum": 21.45,
            "950 Platinum Ruthenium": 20.70,
            "960 Platinum Copper": 20.32,
            "970 Platinum Copper": 20.59,
            "Palladium": 12.02,
            "950 Palladium Silver": 11.80,
            "Copper": 8.96,
            "Brass": 8.47,
        }

    def __call__(self):
        return self

    @property
    def densities(self):
        return self._densities

    # def get_weight(self, alloy: str, shape: Shape) -> float:
    #     return shape.get_volume() * (self._density.get(alloy) / 1000)

    # def get_radius(self, alloy: str, shape: Shape) -> float:
    #     radius = math.sqrt(
    #         math.pi * shape.length * shape.weight * (self._density.get(alloy)/1000)
    #     ) / (math.pi * shape.length * (self._density.get(alloy)/1000))
    #     return radius

    # def get_length(self, alloy: str, shape: Shape) -> float:
    #     return

    def get_ring_size_diameter(self, ring_size: float | str, size_format: str) -> float:
        diameter_mm = None
        if size_format == "US":
            diameter_mm = 0.8128 * ring_size + 11.63
        elif size_format == "UK":
            fraction_dec = 0
            if " " in ring_size:
                letter, fraction = ring_size.split(" ")
                num, den = fraction.split("/")
                fraction_dec = int(num) / int(den)
            else:
                letter = ring_size
            circumference_mm = ((
                ord(letter.lower()) + fraction_dec - 97) * 1.252) + 37.8
            diameter_mm = circumference_mm / math.pi
        elif size_format == "EU":
            diameter_mm = ring_size / math.pi
        return diameter_mm


metal_calculator = MetalCalculator()
