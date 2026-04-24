import { useState } from 'react'
import { Mail, ArrowRight, Check } from 'lucide-react'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail('')
    }
  }

  return (
    <section id="newsletter" className="bg-river-800 py-16 text-white">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <Mail className="mx-auto mb-4 h-8 w-8 text-forge-400" />
        <h2 className="mb-2 text-2xl font-bold">The Watauga Dispatch</h2>
        <p className="mb-6 text-river-200">
          Weekly stories from the frontier. No spam, no filler — just the road.
        </p>

        {submitted ? (
          <div className="flex items-center justify-center gap-2 rounded-lg bg-river-700 py-4 text-river-100">
            <Check className="h-5 w-5" />
            <span>You're on the list. Welcome to the Road.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg bg-river-700 px-4 py-3 text-white placeholder-river-300 outline-none ring-1 ring-river-600 transition focus:ring-forge-400 sm:w-72"
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-lg bg-forge-500 px-6 py-3 font-medium text-white transition hover:bg-forge-600"
            >
              Subscribe <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        )}

        <p className="mt-4 text-xs text-river-300">
          Join 500+ travelers who get the Dispatch every Tuesday.
        </p>
      </div>
    </section>
  )
}
