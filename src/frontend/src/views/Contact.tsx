import React, { ChangeEvent, FormEvent, useState } from "react"
import { Input, Textarea, Button } from "@material-tailwind/react"
import { UtilsService } from "../client"
import { AlertMessage } from "../components/AlertMessage"

const Contact: React.FC = () => {
  const [alertContent, setAlertContent] = useState<string>()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await UtilsService.utilsContactFormEmail({
        name: formData.name,
        emailFrom: formData.email,
        message: formData.message,
      })
      setAlertContent("Form sent successfully")
      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      setAlertContent("Error sending form")
    }
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <main className="flex-grow bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-5 sm:px-6 lg:px-8">
        <h2 className="my-5 font-semibold text-2xl mb-4">Contact</h2>
        {alertContent && 
          <AlertMessage variant="outlined" className="!bg-green-50 border-gray-500 border rounded my-4" timeout={3000} onClose={() => setAlertContent("")}>
            {alertContent}
          </AlertMessage>
        }
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              type="text"
              label="Name"
              value={formData.name}
              onChange={handleChange}
              name="name"
              required
            />
            <Input
              type="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              name="email"
              required
            />
            <Textarea
              label="Message"
              resize={true}
              value={formData.message}
              onChange={handleChange}
              name="message"
              required
            />
            <Button
              type="submit"
              variant="outlined"
              ripple={false}
              className="rounded border-gray-500 mt-5"
            >Submit</Button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default Contact