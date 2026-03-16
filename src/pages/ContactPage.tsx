import { useState, type FormEvent } from 'react'
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react'
import { Input } from '@/components'

const contactInfo = [
  { icon: Mail, title: 'Email', value: 'info@ieltsweb.com' },
  { icon: Phone, title: 'Phone', value: '+1 (234) 567-890' },
  { icon: MapPin, title: 'Address', value: '123 Learning Street' },
]

export const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div>
      {/* Header */}
      <section className="relative hero-gradient py-20 sm:py-24 overflow-hidden">
        <div className="absolute bottom-10 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-float" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-glow-cyan mb-6">
            <MessageSquare className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight animate-fade-in-up">
            <span className="gradient-text">Contact</span> Us
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-300 animate-fade-in-up stagger-1">
            Have a question or feedback? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact info */}
            <div className="lg:col-span-2 space-y-4">
              {contactInfo.map((info, i) => {
                const Icon = info.icon
                return (
                  <div key={info.title} className={`glass p-5 flex items-start space-x-4 opacity-0 animate-fade-in-up stagger-${i + 1}`}>
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-display font-semibold text-sm">{info.title}</h3>
                      <p className="text-gray-400 text-sm mt-0.5">{info.value}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="glass p-8">
                {submitted ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center mb-4">
                      <Send className="h-8 w-8 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-white mb-2">Message Saved (Demo)</h3>
                    <p className="text-gray-400">
                      This is a demo — no backend is connected, so your message was not actually sent.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Honeypot — hidden from humans, caught by bots */}
                    <div aria-hidden="true" className="absolute -left-[9999px]">
                      <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Input label="First Name" name="firstName" placeholder="John" required />
                      <Input label="Last Name" name="lastName" placeholder="Doe" required />
                    </div>
                    <Input label="Email" name="email" type="email" placeholder="john@example.com" required />
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1.5">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        placeholder="How can we help?"
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent hover:border-white/20 resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn-gradient w-full px-6 py-3 text-sm font-semibold rounded-xl flex items-center justify-center space-x-2"
                    >
                      <span>Send Message</span>
                      <Send className="h-4 w-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
