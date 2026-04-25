import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, MapPin } from 'lucide-react'
import { createPageHead } from '../../lib/seo'

export const Route = createFileRoute('/chapters/the-next-generation')({
  component: ChapterNextGen,
  head: () =>
    createPageHead({
      title: 'The Next Generation — The Holston Road',
      description:
        "ETSU's Bluegrass, Old Time and Country Music program is one of the most respected in the nation. Young players are keeping the tradition alive — and making it their own.",
      path: '/chapters/the-next-generation',
    }),
})

function ChapterNextGen() {
  return (
    <main>
      <section className="bg-burgundy-900 px-4 py-20 text-white sm:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-burgundy-300">Chapter 5</p>
          <h1 className="mb-6 font-display text-5xl font-bold tracking-tight sm:text-6xl">The Next Generation</h1>
          <p className="max-w-2xl text-xl leading-relaxed text-burgundy-200">
            ETSU's Bluegrass, Old Time and Country Music program is one of the most respected in
            the nation. Young players are keeping the tradition alive — and making it their own.
          </p>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-3xl space-y-8 text-lg leading-relaxed text-stone-700">
          <p>
            In 1982, East Tennessee State University did something unusual: it started a degree program
            in bluegrass, old-time, and country music. Students would study music theory, history, and
            business — but they'd also study under master musicians who had played with Bill Monroe,
            Flatt & Scruggs, and the Stanley Brothers.
          </p>
          <p>
            Forty years later, the program is one of the most respected in the nation. Students come
            from across the country and around the world to study in Johnson City. They learn flatpicking
            from guitar legends. They learn old-time fiddle from players who learned it from players
            who learned it in the mountains. They learn the business of music — how to book shows,
            manage a career, and keep a tradition alive in a world that doesn't always value it.
          </p>
          <p>
            Graduates go on to play with major acts — the Steep Canyon Rangers, Balsam Range, and
            dozens of others. Some become teachers themselves, passing the tradition to the next
            generation. Some open venues, start festivals, or build recording studios in the same
            region where Ralph Peer set up his temporary studio in 1927.
          </p>
          <p>
            The sound that started on front porches and in churches didn't die when the recording
            industry moved to Nashville. It found a home at ETSU — and the students there are making
            sure it never leaves.
          </p>
          <div className="rounded-xl border-l-4 border-amber-600 bg-amber-50 p-6">
            <p className="font-display text-lg font-bold text-amber-900">The Question</p>
            <p className="mt-2 text-stone-700">
              What tradition would you study if you could learn it from the masters?
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-stone-200 bg-stone-100 px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 font-display text-2xl font-bold text-stone-900">Related Venues</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link to="/sites/$slug" params={{ slug: 'etsu-bluegrass' }} className="group flex gap-4 rounded-xl border border-stone-200 bg-white p-5 transition hover:shadow-md">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-burgundy-100 text-burgundy-700">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-stone-900 group-hover:text-burgundy-700 transition">ETSU Bluegrass Program</h3>
                <p className="text-sm text-stone-600">Johnson City, TN — Education & performance</p>
              </div>
            </Link>
            <Link to="/sites/$slug" params={{ slug: 'down-home' }} className="group flex gap-4 rounded-xl border border-stone-200 bg-white p-5 transition hover:shadow-md">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-burgundy-100 text-burgundy-700">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-stone-900 group-hover:text-burgundy-700 transition">The Down Home</h3>
                <p className="text-sm text-stone-600">Johnson City, TN — Live music venue</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl flex items-center justify-between">
          <Link
            to="/chapters/the-festival"
            className="flex items-center gap-2 rounded-full border border-stone-300 px-6 py-3 font-medium text-stone-600 transition hover:bg-stone-100"
          >
            <ArrowLeft className="h-4 w-4" /> The Festival
          </Link>
          <span className="text-stone-400">Next: —</span>
        </div>
      </section>
    </main>
  )
}
