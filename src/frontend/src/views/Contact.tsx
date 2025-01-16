import React, { ChangeEvent, FormEvent, useState } from "react"
import { Input, Textarea, Button } from "@material-tailwind/react"
import { UtilsService } from "../client"
import { AlertMessage } from "../components/AlertMessage"
import { useDarkMode } from "../contexts/DarkModeContext"

const Contact: React.FC = () => {
  const [alertContent, setAlertContent] = useState<string>()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })
  const { isDarkMode } = useDarkMode()

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
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred"
      setAlertContent("Error sending form: " + errorMessage)
    }
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <main className={`flex-grow ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="max-w-7xl mx-auto py-6 px-5 sm:px-6 lg:px-8">
        <h2 className={`my-5 font-semibold text-2xl mb-4 ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>Contact</h2>
        {alertContent && 
          <AlertMessage variant="outlined" className="!bg-green-50 border-gray-500 border rounded my-4" timeout={3000} onClose={() => setAlertContent("")}>
            {alertContent}
          </AlertMessage>
        }
        <div className="flex flex-col md:flex-row">
          <div className={`md:pr-2 pb-2 ${isDarkMode ? "text-gray-300" : "text-gray-800"}`}>
            If you have any questions or inquiries, feel free to reach out via email at {" "}
            <a 
              href="mailto:contact@shebascaravan.com" 
              className={`underline hover:text-gray-700 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}
            >
              contact@shebascaravan.com
            </a>
            , instagram at {" "}
            <a
              href="https://www.instagram.com/shebascaravan"
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:text-gray-700 transition ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}
              aria-label="Instagram"
            >
              @shebascaravan
            </a> {" "}
            or use the following form.
          </div>
          <form className="flex w-full md:pl-2 pt-2" onSubmit={handleSubmit}>
            <div className="space-y-4 w-full">
              <Input
                type="text"
                label="Name"
                value={formData.name}
                onChange={handleChange}
                name="name"
                required
                className={`${isDarkMode ? "text-gray-200" : "text-gray-900"}`}
                labelProps={{ className: `${isDarkMode ? "!text-gray-200" : ""}` }}
              />
              <Input
                type="email"
                label="Email"
                value={formData.email}
                onChange={handleChange}
                name="email"
                required
                className={`${isDarkMode ? "text-gray-200" : "text-gray-900"}`}
                labelProps={{ className: `${isDarkMode ? "!text-gray-200" : ""}` }}
              />
              <Textarea
                label="Message"
                resize={true}
                value={formData.message}
                onChange={handleChange}
                name="message"
                required
                className={`${isDarkMode ? "text-gray-200" : "text-gray-900"}`}
                labelProps={{ className: `${isDarkMode ? "!text-gray-200" : ""}` }}
              />
              <Button
                type="submit"
                variant="outlined"
                ripple={false}
                className={`rounded border-gray-500 mt-5 ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}
              >Submit</Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

export default Contact