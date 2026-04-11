import { useState } from 'react'
import { Mail, MessageSquare, Send, MapPin, Clock } from 'lucide-react'

export const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3000)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <div className="min-h-screen">
      {/* ─── Hero ─────────────────────────── */}
      <section className="hero-gradient relative pt-32 pb-20 sm:pt-36 sm:pb-24 px-4">
        <div className="orb orb-cyan w-[350px] h-[350px] -top-28 -right-28 animate-float opacity-35" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h1 className="text-3xl sm:text-5xl font-display font-bold text-heading">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="mt-5 text-body max-w-lg mx-auto leading-relaxed">
            Have a question, suggestion, or need help with your IELTS preparation? We'd love to hear from you.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-14 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* ─── Info ──────────────────────── */}
          <div className="md:col-span-2 space-y-5">
            {[
              { icon, title: 'Email', value: 'support@ieltsweb.com' },
              { icon, title: 'Location', value: 'Available worldwide, online' },
              { icon, title: 'Response', value: 'Within 24 hours' },
            ].map((info, i) => (
              <div
                key={i}
                className="glass-hover flex items-start space-x-4 p-5 opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${i * 100 + 100}ms` }}
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0">
                  <info.icon className="h-5 w-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-heading">{info.title}</h3>
                  <p className="text-xs text-muted mt-0.5">{info.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ─── Form ─────────────────────── */}
          <div className="md:col-span-3">
            <form onSubmit={handleSubmit} className="glass p-7 space-y-5">
              <div className="flex items-center space-x-3 mb-2">
                <MessageSquare className="h-5 w-5 text-cyan-400" />
                <h2 className="text-lg font-display font-semibold text-heading">Send a Message</h2>
              </div>

              <div>
                <label htmlFor="contact-name" className="block text-xs font-medium text-body mb-1.5">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="input-glow"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-medium text-body mb-1.5">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="input-glow"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-medium text-body mb-1.5">Message</label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className="input-glow resize-none"
                  placeholder="How can we help?"
                />
              </div>

              <button
                type="submit"
                className="btn-gradient w-full py-3 text-sm inline-flex items-center justify-center space-x-2"
              >
                <Send className="h-4 w-4" />
                <span>{sent ? 'Message Sent!' : 'Send Message'}</span>
              </button>

              {sent && (
                <p className="text-xs text-emerald-400 text-center animate-fade-in">
                  Thanks! We'll get back to you within 24 hours.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

