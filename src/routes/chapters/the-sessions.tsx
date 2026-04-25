import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react'
import { createPageHead } from '../../lib/seo'

export const Route = createFileRoute('/chapters/the-sessions')({
  component: ChapterSessions,
  head: () =>
    createPageHead({
      title: 'The Sessions — The Holston Road',
      description: 'The 1927 Bristol Sessions. Twelve days that changed American music forever.',
      path: '/chapters/the-sessions',
    }),
})

function ChapterSessions() {
  return (
    <main>
      <section className="bg-burgundy-700 px-4 py-20 text-white sm:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-burgundy-300">Chapter 3</p>
          <h1 className="mb-6 font-display text-5xl font-bold tracking-tight sm:text-6xl">The Sessions</h1>
          <p className="max-w-2xl text-xl leading-relaxed text-burgundy-200">
            The 1927 Bristol Sessions. Twelve days that changed American music forever.
          </p>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-3xl space-y-8 text-lg leading-relaxed text-stone-700">
          <p>
            In July and August of 1927, Ralph Peer set up a temporary recording studio in a converted
            hat warehouse at 408 State Street in Bristol, Tennessee. He had a microphone, a disc-cutting
            machine, and a hunch that rural musicians had commercial potential. He was right.
          </p>
          <p>
            Over twelve days, Peer recorded nineteen acts. The Carter Family — A.P., Sara, and Maybelle —
            walked in with songs learned from old ballads and church hymns. Jimmie Rodgers, a former
            railroad worker, brought a yodel and a blues sensibility that nobody had heard before.
            Ernest Stoneman, Blind Alfred Reed, and a dozen others added their own sounds to the mix.
          </p>
          <p>
            When the dust settled, Peer had the foundation of an industry. The Carter Family became
            the first stars of country music. Jimmie Rodgers became the "Father of Country Music."
            And Bristol became the Birthplace of Country Music — a designation Congress made official
            in 1998.
          </p>
          <p>
            Johnny Cash said it best: "The Bristol Sessions were the single most important event in
            the history of country music." And they happened because one man believed that the sound
            of the mountains deserved to be heard by everyone.
          </p>
          <div className="rounded-xl border-l-4 border-amber-600 bg-amber-50 p-6">
            <p className="font-display text-lg font-bold text-amber-900">The Question</p>
            <p className="mt-2 text-stone-700">
              What would you record if you had twelve days in a warehouse and a microphone?
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-stone-200 bg-stone-100 px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 font-display text-2xl font-bold text-stone-900">Related Venues</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link to="/sites/$slug" params={{ slug: 'birthplace-of-country-music-museum' }} className="group flex gap-4 rounded-xl border border-stone-200 bg-white p-5 transition hover:shadow-md">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-burgundy-100 text-burgundy-700">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-stone-900 group-hover:text-burgundy-700 transition">Birthplace of Country Music Museum</h3>
                <p className="text-sm text-stone-600">Bristol, VA/TN — Museum & recording legacy</p>
              </div>
            </Link>
            <Link to="/sites" className="group flex gap-4 rounded-xl border border-stone-200 bg-white p-5 transition hover:shadow-md">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-burgundy-100 text-burgundy-700">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-stone-900 group-hover:text-burgundy-700 transition">Historic 408 State Street</h3>
                <p className="text-sm text-stone-600">Bristol, TN — Original Sessions location</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl flex items-center justify-between">
          <Link
            to="/chapters/the-railroad"
            className="flex items-center gap-2 rounded-full border border-stone-300 px-6 py-3 font-medium text-stone-600 transition hover:bg-stone-100"
          >
            <ArrowLeft className="h-4 w-4" /> The Railroad
          </Link>
          <Link
            to="/chapters/the-festival"
            className="flex items-center gap-2 rounded-full bg-burgundy-700 px-6 py-3 font-medium text-white transition hover:bg-burgundy-800"
          >
            Next: The Festival <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
