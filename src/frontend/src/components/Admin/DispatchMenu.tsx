import React, { FormEvent, useState } from "react"
import { Button, Dialog, DialogHeader, DialogBody, Input, AccordionBody, Accordion, AccordionHeader, Checkbox, Tooltip } from "@material-tailwind/react"
import { OrdersService, ShipmentCreate, ShipmentOut, ShipmentsService } from "../../client"
import { TruckIcon, ChevronDownIcon, ChevronUpIcon, XMarkIcon } from "@heroicons/react/24/solid"

type DispatchMenuProps = {
  orderId: number
  shipments?: ShipmentOut[]
  orderStatus: (status: number) => void
}

const DispatchMenu: React.FC<DispatchMenuProps> = ({ orderId, shipments, orderStatus }: DispatchMenuProps) => {
  const [open, setOpen] = useState(false)
  const [shippingFields, setShippingFields] = useState<ShipmentCreate[]>([])
  const [checkedShipmentIds, setCheckedShipmentIds] = useState<number[]>([])
  const [previousShipmentsOpen, setPreviousShipmentsOpen] = useState(false)
  const [newShipmentsOpen, setNewShipmentsOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleAdd = () => {
    setShippingFields([
      ...shippingFields,
      { dispatched_at: "", method: "", tracking_number: "", tracking_link: "" }
    ])
  }

  const handleDelete = (index: number) => {
    const updatedFields = [...shippingFields]
    updatedFields.splice(index, 1)
    setShippingFields(updatedFields)
  }

  const handleChange = (index: number, field: keyof typeof shippingFields[0], value: string) => {
    const updatedFields = [...shippingFields]
    updatedFields[index][field] = value
    setShippingFields(updatedFields)
  }

  const clearForm = () => {
    setShippingFields([])
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const shipmentId = parseInt(event.target.value)
    const isChecked = event.target.checked

    if (isChecked) {
      setCheckedShipmentIds(prevIds => [...prevIds, shipmentId])
    } else {
      setCheckedShipmentIds(prevIds => prevIds.filter(id => id !== shipmentId))
    }
  }

  const dispatch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(shippingFields)
    const shipmentIds: number[] = []
    for (const shipment of shippingFields) {
      shipment.dispatched_at = new Date(shipment.dispatched_at).toISOString()
      const shipmentCreate = await ShipmentsService.shipmentsCreateShipmentByOrder({
        orderId: orderId,
        requestBody: shipment,
      })
      shipmentIds.push(shipmentCreate.id)
    }

    const order = await OrdersService.ordersDispatchOrder({
      orderId: orderId,
      requestBody: [...shipmentIds, ...checkedShipmentIds],
    })

    setOpen(false)
    clearForm()
    orderStatus(order.status)
  }

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleOpen}>Dispatch</Button> */}
      <Button onClick={handleOpen} className="flex items-center gap-3 shadow-none hover:shadow-md" size="sm">
        <TruckIcon strokeWidth={2} className="h-4 w-4" /> Dispatch
      </Button>
      <Dialog open={open} handler={handleClose} className="max-h-screen overflow-auto">
        <DialogHeader>Shipments</DialogHeader>
        <DialogBody>
          {shipments &&
            <Accordion
              className="rounded border p-5 m-2 w-auto "
              open={previousShipmentsOpen}
              icon={
                previousShipmentsOpen ? 
                <ChevronUpIcon className="h-6 w-6" /> :
                <ChevronDownIcon className="h-6 w-6" />
              }
            >
              <AccordionHeader onClick={() => setPreviousShipmentsOpen(!previousShipmentsOpen)}>Previous Shipments</AccordionHeader>
              <AccordionBody>
                <table className="w-full">
                  <tbody>
                    {shipments.map((shipment) => (
                      <tr>
                        <td><Checkbox value={shipment.id} onChange={handleCheckboxChange}/></td>
                        <td>{shipment.dispatched_at.split("T")[0]}</td>
                        <td>{shipment.method}</td>
                        <td>{shipment.tracking_number}</td>
                        <td>
                          <a href={shipment.tracking_link}>
                            <Button size="sm">Track</Button>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </AccordionBody>
            </Accordion>
          }
          <form onSubmit={dispatch}>
            <Accordion
              className="rounded border p-5 m-2 w-auto"
              open={newShipmentsOpen}
              icon={
                newShipmentsOpen ? 
                <ChevronUpIcon className="h-6 w-6" /> :
                <ChevronDownIcon className="h-6 w-6" />
              }
            >
              <AccordionHeader onClick={() => setNewShipmentsOpen(!newShipmentsOpen)}>New Shipments</AccordionHeader>
              <AccordionBody>
                {shippingFields.map((field, index) => (
                  <div key={index} className="p-5 my-2 border rounded">
                    <Tooltip content="Delete Shipment" className="z-[9999]">
                      <Button
                        className="flex ml-auto h-8 w-8 p-0"
                        variant="text"
                        onClick={() => handleDelete(index)}
                      ><XMarkIcon className="h-4 w-4 m-auto" /></Button>
                    </Tooltip>
                    <div className="mb-2">
                      Dispatched At
                      <Input
                        type="date"
                        value={field.dispatched_at}
                        className="!border !border-gray-300 bg-white text-gray-900 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10"
                        onChange={(e) => handleChange(index, "dispatched_at", e.target.value)}
                        labelProps={{
                          className: "hidden",
                        }}
                        required
                      />
                    </div>
                    <div className="mb-2">
                      Shipping Method
                      <Input
                        type="text"
                        value={field.method}
                        className="!border !border-gray-300 bg-white text-gray-900 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10"
                        onChange={(e) => handleChange(index, "method", e.target.value)}
                        labelProps={{
                          className: "hidden",
                        }}
                        required
                      />
                    </div>
                    <div className="mb-2">
                      Tracking Number
                      <Input
                        type="text"
                        value={field.tracking_number}
                        className="!border !border-gray-300 bg-white text-gray-900 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10"
                        onChange={(e) => handleChange(index, "tracking_number", e.target.value)}
                        labelProps={{
                          className: "hidden",
                        }}
                        required
                      />
                    </div>
                    <div className="mb-2">
                      Tracking Link
                      <Input
                        type="text"
                        value={field.tracking_link}
                        className="!border !border-gray-300 bg-white text-gray-900 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10"
                        onChange={(e) => handleChange(index, "tracking_link", e.target.value)}
                        labelProps={{
                          className: "hidden",
                        }}
                      />
                    </div>
                  </div>
                ))}
                <Button
                  onClick={handleAdd}
                  className="flex items-center mx-auto shadow-none hover:shadow-md"
                  size="sm"
                >
                  Add
                </Button>
              </AccordionBody>
            </Accordion>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button
                onClick={handleClose}
                className="flex items-center ml-auto gap-3 shadow-none hover:shadow-md"
                size="sm"
              >
                Close
              </Button>
              <button id="submit">
                <Button
                  className="flex items-center ml-auto gap-3 shadow-none hover:shadow-md"
                  color="green"
                  size="sm"
                >
                  <TruckIcon strokeWidth={2} className="h-4 w-4" />
                  {(shippingFields.length === 0 && checkedShipmentIds.length === 0) ?
                    "Dispatch Without Tracking" : "Dispatch"
                  }
                </Button>
              </button>
            </div>
          </form>
        </DialogBody>
      </Dialog>
    </div>
  )
}

export default DispatchMenu