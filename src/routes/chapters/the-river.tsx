import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, MapPin, Waves } from 'lucide-react'

export const Route = createFileRoute('/chapters/the-river')({
  component: ChapterRiver,
  head: () => ({
    meta: [
      { title: 'Chapter 1: The River — The Holston Road' },
      { name: 'description', content: 'Before there were roads, there was the river. The Holston brought the first settlers, the first trade, the first conflicts.' },
    ],
  }),
})

function ChapterRiver() {
  return (
    <main>
      <section className="bg-river-800 px-4 py-20 text-white sm:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-river-300">Chapter 1</p>
          <h1 className="mb-6 font-display text-5xl font-bold tracking-tight sm:text-6xl">The River</h1>
          <p className="max-w-2xl text-xl leading-relaxed text-river-200">
            Before there were roads, there was the river. The Holston brought the first settlers,
            the first trade, the first conflicts. It was the only highway that mattered.
          </p>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-3xl space-y-8 text-lg leading-relaxed text-stone-700">
          <p>
            The first Europeans to see the Holston River valley did not arrive by road. There were no roads.
            They came by water — flatboats drifting downriver from Pennsylvania, carrying families,
            livestock, and everything they owned in a world that had no patience for second chances.
          </p>
          <p>
            The Holston was not gentle. It flooded without warning, froze in winter, and carved
            its way through mountain gaps that made overland travel nearly impossible. But it was
            a highway nonetheless — the only reliable route through the Appalachian wall that
            separated the coastal colonies from the western frontier.
          </p>
          <p>
            At the head of navigation, where the North and South Forks converged, William King established
            a boatyard. Flatboats were built here, loaded with cargo, and sent downstream toward
            the Tennessee River and beyond. Most never came back. They were broken up at journey's end
            for lumber — one-way vessels for a one-way migration.
          </p>
          <p>
            The Netherland Inn stands at this intersection of river and road. It is the only registered
            historic site in the nation that was both a boatyard and a stage stop. William King built
            boats in the morning and hosted travelers in the evening. His world was one of constant
            motion — people and goods flowing through a landscape that was still being invented.
          </p>
          <div className="rounded-xl border-l-4 border-forge-500 bg-forge-50 p-6">
            <p className="font-display text-lg font-bold text-forge-800">The Question</p>
            <p className="mt-2 text-stone-700">
              What would you build if you knew you'd never see it again — but someone else would?
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
                <h3 className="font-display text-lg font-bold text-stone-900 group-hover:text-river-700 transition">Netherland Inn</h3>
                <p className="text-sm text-stone-600">Kingsport, TN — Boatyard and stage stop</p>
              </div>
            </Link>
            <Link to="/sites" className="group flex gap-4 rounded-xl border border-stone-200 bg-white p-5 transition hover:shadow-md">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-river-100 text-river-700">
                <Waves className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-stone-900 group-hover:text-river-700 transition">Warriors' Path State Park</h3>
                <p className="text-sm text-stone-600">Kingsport, TN — River recreation</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl flex items-center justify-between">
          <span className="text-stone-400">Previous: —</span>
          <Link
            to="/chapters/the-road"
            className="flex items-center gap-2 rounded-full bg-river-700 px-6 py-3 font-medium text-white transition hover:bg-river-800"
          >
            Next: The Road <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
