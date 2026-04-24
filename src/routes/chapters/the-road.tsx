import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight, MapPin, Scroll } from 'lucide-react'

export const Route = createFileRoute('/chapters/the-road')({
  component: ChapterRoad,
  head: () => ({
    meta: [
      { title: 'Chapter 2: The Road — The Holston Road' },
      { name: 'description', content: 'The Old Stage Road connected the frontier to the world. Stagecoaches carried mail, passengers, and news through mud and mountain gaps.' },
    ],
  }),
})

function ChapterRoad() {
  return (
    <main>
      <section className="bg-stone-700 px-4 py-20 text-white sm:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-stone-300">Chapter 2</p>
          <h1 className="mb-6 font-display text-5xl font-bold tracking-tight sm:text-6xl">The Road</h1>
          <p className="max-w-2xl text-xl leading-relaxed text-stone-200">
            The Old Stage Road connected the frontier to the world. Stagecoaches carried mail,
            passengers, and news through mud and mountain gaps.
          </p>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-3xl space-y-8 text-lg leading-relaxed text-stone-700">
          <p>
            For fifty years, this was the only way through. Mud, bandits, broken wheels, and a
            50-cent fare. The people who traveled it were either desperate or determined. Usually both.
          </p>
          <p>
            Stagecoaches ran between Knoxville and Abingdon from the 1790s until the railroad arrived
            in 1856. The trip took days. The road was rarely paved. Passengers climbed out to push
            the coach through mud holes, or walked alongside when the horses couldn't pull the load.
          </p>
          <p>
            Exchange Place was a relay station — a place where exhausted horses were swapped for fresh
            ones, where passengers ate a hurried meal, where mail bags were transferred from one coach
            to another. The rhythm of the place was set by the schedule: coaches arrived, coaches departed,
            and in between, life happened.
          </p>
          <p>
            Today, Exchange Place is a living history farm. Visitors can still feel the rhythm —
            the seasons of planting and harvest, the daily work of a farm that fed travelers as much
            as it fed its own family. The stage road is gone, but the place remains: a crossroads
            where the frontier economy came alive.
          </p>
          <div className="rounded-xl border-l-4 border-forge-500 bg-forge-50 p-6">
            <p className="font-display text-lg font-bold text-forge-800">The Question</p>
            <p className="mt-2 text-stone-700">
              What's the hardest journey you've ever taken because you had to?
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-stone-200 bg-stone-100 px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 font-display text-2xl font-bold text-stone-900">Sites on This Chapter</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link to="/sites" className="group flex gap-4 rounded-xl border border-stone-200 bg-white p-5 transition hover:shadow-md">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-stone-200 text-stone-700">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-stone-900 group-hover:text-stone-700 transition">Exchange Place</h3>
                <p className="text-sm text-stone-600">Kingsport, TN — Stagecoach relay station</p>
              </div>
            </Link>
            <Link to="/sites" className="group flex gap-4 rounded-xl border border-stone-200 bg-white p-5 transition hover:shadow-md">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-stone-200 text-stone-700">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-stone-900 group-hover:text-stone-700 transition">Tipton-Haynes Estate</h3>
                <p className="text-sm text-stone-600">Johnson City, TN — Historic estate on the stage road</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl flex items-center justify-between">
          <Link
            to="/chapters/the-river"
            className="flex items-center gap-2 rounded-full border border-stone-300 px-6 py-3 font-medium text-stone-600 transition hover:bg-stone-100"
          >
            <ArrowLeft className="h-4 w-4" /> The River
          </Link>
          <Link
            to="/chapters/the-agreement"
            className="flex items-center gap-2 rounded-full bg-river-700 px-6 py-3 font-medium text-white transition hover:bg-river-800"
          >
            Next: The Agreement <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
