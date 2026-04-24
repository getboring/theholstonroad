import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight, MapPin, Mountain } from 'lucide-react'

export const Route = createFileRoute('/chapters/the-march')({
  component: ChapterMarch,
  head: () => ({
    meta: [
      { title: 'Chapter 4: The March — The Holston Road' },
      { name: 'description', content: 'When threatened, the frontier did not hide. It marched 330 miles over mountains to fight a battle that turned the tide of a war.' },
    ],
  }),
})

function ChapterMarch() {
  return (
    <main>
      <section className="bg-forge-700 px-4 py-20 text-white sm:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-forge-300">Chapter 4</p>
          <h1 className="mb-6 font-display text-5xl font-bold tracking-tight sm:text-6xl">The March</h1>
          <p className="max-w-2xl text-xl leading-relaxed text-forge-200">
            When threatened, the frontier didn't hide. It marched 330 miles over mountains to fight
            a battle that turned the tide of a war.
          </p>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-3xl space-y-8 text-lg leading-relaxed text-stone-700">
          <p>
            September 24, 1780. Nine hundred men camped at Rocky Mount, ate William Cobb's bacon,
            loaded his bullets, and prepared to march over the Blue Ridge Mountains toward Kings Mountain,
            South Carolina. They were not soldiers. They were farmers, hunters, and frontiersmen who
            had decided that British Major Patrick Ferguson would not be allowed to threaten their homes.
          </p>
          <p>
            The Overmountain Men were called that because they lived west of the mountains — "over"
            the Appalachians from the perspective of the coastal colonies. They had no official status
            in the Continental Army. Many had no military training at all. What they had was rifles,
            horses, and a profound unwillingness to let anyone tell them what they could or could not do.
          </p>
          <p>
            The march took two weeks. They crossed rivers, climbed ridges, and slept in the open.
            At Kings Mountain, they surrounded Ferguson's Loyalist force on a rocky plateau and
            destroyed it in an hour. Ferguson was killed. His entire command was killed, wounded,
            or captured. It was the first major American victory after the fall of Charleston,
            and it convinced British General Cornwallis that the southern campaign would not be easy.
          </p>
          <p>
            William Cobb fed those men without asking North Carolina for permission. He just did it.
            That is the spirit of this trail.
          </p>
          <div className="rounded-xl border-l-4 border-forge-500 bg-forge-50 p-6">
            <p className="font-display text-lg font-bold text-forge-800">The Question</p>
            <p className="mt-2 text-stone-700">
              When was the last time you did something before you were officially allowed to?
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-stone-200 bg-stone-100 px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 font-display text-2xl font-bold text-stone-900">Sites on This Chapter</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link to="/sites" className="group flex gap-4 rounded-xl border border-stone-200 bg-white p-5 transition hover:shadow-md">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-forge-100 text-forge-700">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-stone-900 group-hover:text-forge-700 transition">Rocky Mount</h3>
                <p className="text-sm text-stone-600">Piney Flats, TN — Overmountain Men resupply point</p>
              </div>
            </Link>
            <Link to="/sites" className="group flex gap-4 rounded-xl border border-stone-200 bg-white p-5 transition hover:shadow-md">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-forge-100 text-forge-700">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-stone-900 group-hover:text-forge-700 transition">Sycamore Shoals</h3>
                <p className="text-sm text-stone-600">Elizabethton, TN — Muster grounds</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl flex items-center justify-between">
          <Link
            to="/chapters/the-agreement"
            className="flex items-center gap-2 rounded-full border border-stone-300 px-6 py-3 font-medium text-stone-600 transition hover:bg-stone-100"
          >
            <ArrowLeft className="h-4 w-4" /> The Agreement
          </Link>
          <Link
            to="/chapters/the-state"
            className="flex items-center gap-2 rounded-full bg-river-700 px-6 py-3 font-medium text-white transition hover:bg-river-800"
          >
            Next: The State <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
