import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, MapPin, Landmark } from 'lucide-react'

export const Route = createFileRoute('/chapters/the-state')({
  component: ChapterState,
  head: () => ({
    meta: [
      { title: 'Chapter 5: The State — The Holston Road' },
      { name: 'description', content: 'From wilderness to territory to state in one generation. The Southwest Territory, William Blount, and the road to Tennessee\'s birth.' },
    ],
  }),
})

function ChapterState() {
  return (
    <main>
      <section className="bg-river-900 px-4 py-20 text-white sm:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-river-300">Chapter 5</p>
          <h1 className="mb-6 font-display text-5xl font-bold tracking-tight sm:text-6xl">The State</h1>
          <p className="max-w-2xl text-xl leading-relaxed text-river-200">
            From wilderness to territory to state in one generation. The Southwest Territory,
            William Blount, and the road to Tennessee's birth.
          </p>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-3xl space-y-8 text-lg leading-relaxed text-stone-700">
          <p>
            In 1790, the federal government created the Southwest Territory — the first territory
            established under the U.S. Constitution. William Blount was appointed governor. He needed
            a capital. He chose Rocky Mount.
          </p>
          <p>
            For two years, from 1790 to 1792, a farmhouse in Piney Flats was the seat of government
            for everything west of the Appalachians and south of the Ohio River. William Cobb's home
            became the territorial capital. The dining room was the council chamber. The bedroom was
            the governor's office. The kitchen fed the territorial legislature.
          </p>
          <p>
            Andrew Jackson lived here for six weeks while waiting for his law license. He was 23 years
            old, sleeping in a log house that was also the seat of government, reading law by candlelight
            while Blount negotiated treaties with the Cherokee in the next room.
          </p>
          <p>
            The Southwest Territory became Tennessee in 1796 — the first state created entirely from
            federal territory, the first admitted under the Constitution, and the first to elect a
            governor without ever having been a colony. The frontier had become a state. And it had
            done so on its own terms.
          </p>
          <div className="rounded-xl border-l-4 border-forge-500 bg-forge-50 p-6">
            <p className="font-display text-lg font-bold text-forge-800">The Question</p>
            <p className="mt-2 text-stone-700">
              What institution would you build if you started with nothing but a farmhouse and a conviction?
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
                <h3 className="font-display text-lg font-bold text-stone-900 group-hover:text-river-700 transition">Rocky Mount</h3>
                <p className="text-sm text-stone-600">Piney Flats, TN — First territorial capital</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl flex items-center justify-between">
          <Link
            to="/chapters/the-march"
            className="flex items-center gap-2 rounded-full border border-stone-300 px-6 py-3 font-medium text-stone-600 transition hover:bg-stone-100"
          >
            <ArrowLeft className="h-4 w-4" /> The March
          </Link>
          <span className="text-stone-400">Next: —</span>
        </div>
      </section>
    </main>
  )
}
