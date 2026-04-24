import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight, MapPin, Shield } from 'lucide-react'

export const Route = createFileRoute('/chapters/the-agreement')({
  component: ChapterAgreement,
  head: () => ({
    meta: [
      { title: 'Chapter 3: The Agreement — The Holston Road' },
      { name: 'description', content: 'When the government failed them, the settlers made their own. The Watauga Association was the first autonomous white government in the British colonies.' },
    ],
  }),
})

function ChapterAgreement() {
  return (
    <main>
      <section className="bg-river-700 px-4 py-20 text-white sm:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-river-300">Chapter 3</p>
          <h1 className="mb-6 font-display text-5xl font-bold tracking-tight sm:text-6xl">The Agreement</h1>
          <p className="max-w-2xl text-xl leading-relaxed text-river-200">
            When the government failed them, the settlers made their own. The Watauga Association
            was the first autonomous white government in the British colonies.
          </p>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-3xl space-y-8 text-lg leading-relaxed text-stone-700">
          <p>
            Twenty families walked into Cherokee land, realized no government would protect them,
            and wrote their own constitution. It was 1772. They were not asking for permission.
          </p>
          <p>
            The Watauga Association was illegal under British law. The settlers were squatting on
            land they did not own, governed by a body that had no charter, enforcing laws that had
            no precedent. It should have collapsed within a year. It lasted five years — and became
            the model for every frontier government that followed.
          </p>
          <p>
            At Sycamore Shoals, the Wataugans negotiated directly with the Cherokee. They leased
            the land for ten years, promising annual payments of trade goods. In 1775, Richard
            Henderson and Daniel Boone arrived with an even bolder proposal: the Transylvania
            Purchase, the largest private land deal in American history. The Cherokee sold 20 million
            acres for £10,000 worth of goods.
          </p>
          <p>
            The Watauga Association did not wait for Virginia or North Carolina to decide their fate.
            They decided it themselves. That decision — to self-govern in the absence of legitimate
            authority — is the thread that runs through every chapter of this trail.
          </p>
          <div className="rounded-xl border-l-4 border-forge-500 bg-forge-50 p-6">
            <p className="font-display text-lg font-bold text-forge-800">The Question</p>
            <p className="mt-2 text-stone-700">
              What would you build if the rules didn't exist yet?
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-stone-200 bg-stone-100 px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 font-display text-2xl font-bold text-stone-900">Sites on This Chapter</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link to="/sites" className="group flex gap-4 rounded-xl border border-stone-200 bg-white p-5 transition hover:shadow-md">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-river-100 text-river-700">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-stone-900 group-hover:text-river-700 transition">Sycamore Shoals</h3>
                <p className="text-sm text-stone-600">Elizabethton, TN — Fort Watauga and muster grounds</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl flex items-center justify-between">
          <Link
            to="/chapters/the-road"
            className="flex items-center gap-2 rounded-full border border-stone-300 px-6 py-3 font-medium text-stone-600 transition hover:bg-stone-100"
          >
            <ArrowLeft className="h-4 w-4" /> The Road
          </Link>
          <Link
            to="/chapters/the-march"
            className="flex items-center gap-2 rounded-full bg-river-700 px-6 py-3 font-medium text-white transition hover:bg-river-800"
          >
            Next: The March <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
