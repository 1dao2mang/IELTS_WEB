import React from 'react'
import { Card, Button, Input } from '@/components'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = React.useState<FormStatus>('idle')
  const [errors, setErrors] = React.useState<Record<string, string>>({})

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Please enter a valid email'
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required'
    if (!formData.message.trim()) newErrors.message = 'Message is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('submitting')
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setStatus('idle'), 3000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error on change
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <Card>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600 mb-3">
              <Mail className="h-6 w-6" />
            </div>
            <h3 className="font-semibold mb-2">Email</h3>
            <p className="text-gray-600 text-sm">info@ieltsweb.com</p>
            <p className="text-gray-600 text-sm">support@ieltsweb.com</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600 mb-3">
              <Phone className="h-6 w-6" />
            </div>
            <h3 className="font-semibold mb-2">Phone</h3>
            <p className="text-gray-600 text-sm">+1 (234) 567-890</p>
            <p className="text-gray-600 text-sm">Mon-Fri 9am-6pm EST</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600 mb-3">
              <MapPin className="h-6 w-6" />
            </div>
            <h3 className="font-semibold mb-2">Office</h3>
            <p className="text-gray-600 text-sm">123 Learning Street</p>
            <p className="text-gray-600 text-sm">Education City, EC 12345</p>
          </div>
        </Card>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card title="Send us a Message">
          {status === 'success' && (
            <div className="mb-4 flex items-center gap-2 p-3 bg-green-50 text-green-700 rounded-lg">
              <CheckCircle className="h-5 w-5" />
              <span>Message sent successfully! We'll get back to you soon.</span>
            </div>
          )}
          {status === 'error' && (
            <div className="mb-4 flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-lg">
              <AlertCircle className="h-5 w-5" />
              <span>Something went wrong. Please try again.</span>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              error={errors.name}
              required
            />
            
            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              error={errors.email}
              required
            />
            
            <Input
              label="Subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
              placeholder="What is this regarding?"
              error={errors.subject}
              required
            />
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  errors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                }`}
                placeholder="Tell us more about your inquiry..."
                required
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-600">{errors.message}</p>
              )}
            </div>

            <Button
              type="submit"
              fullWidth
              size="lg"
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? (
                <>Sending...</>
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}
