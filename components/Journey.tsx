'use client'

import { Sparkles, Store, Award, Users, Globe, Leaf } from 'lucide-react'

const milestones = [
  {
    year: '2018',
    icon: Sparkles,
    title: 'The First Collection',
    description: 'nōma is founded in a small studio apartment with eight hand-thrown ceramic pieces. Our first pop-up sells out in two days.',
  },
  {
    year: '2019',
    icon: Store,
    title: 'Workshop Partnerships',
    description: 'We travel to Portugal and Japan, forming our first long-term artisan partnerships. The collection expands to include textiles and woodwork.',
  },
  {
    year: '2020',
    icon: Users,
    title: 'Growing Community',
    description: 'Despite a challenging year, our community of nōma friends grows to over 25,000 worldwide. We launch our journal to share maker stories.',
  },
  {
    year: '2021',
    icon: Leaf,
    title: 'Sustainability Pledge',
    description: 'We publish our first impact report, commit to 100% recyclable packaging, and offset all shipping emissions across every order.',
  },
  {
    year: '2022',
    icon: Award,
    title: 'Design Recognition',
    description: 'Our Field Chronograph and Form Ceramic Set receive international design awards, bringing our makers&apos; work to a global audience.',
  },
  {
    year: '2024',
    icon: Globe,
    title: 'A Global Family',
    description: 'nōma is now loved in 47 countries, with 18 workshop partners and a team of 34 people dedicated to thoughtful everyday design.',
  },
]

export function Journey() {
  return (
    <main className="pb-24">
      <section className="mx-auto max-w-[1380px] px-5 pb-12 pt-20 lg:px-10 lg:pb-16 lg:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-5 text-[11px] font-semibold tracking-[0.24em] text-[#b95d3d] uppercase">Our Journey</p>
          <h1 className="font-serif text-5xl leading-[0.98] tracking-[-0.05em] sm:text-7xl lg:text-[88px]">
            Six years of <em className="font-normal text-[#b95d3d]">quiet</em> progress.
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-[#6b6962]">
            From a single set of ceramics to a global collection of thoughtfully made objects —
            here are the moments that shaped us along the way.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1380px] px-5 pb-20 lg:px-10 lg:pb-28">
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-[#b95d3d]/40 via-[#deddd7] to-transparent sm:left-1/2 lg:left-1/2" aria-hidden="true" />

          <ol className="space-y-14 sm:space-y-20">
            {milestones.map((milestone, index) => {
              const isEven = index % 2 === 0
              const Icon = milestone.icon
              return (
                <li key={milestone.year} className="relative">
                  <div className={`flex flex-col gap-8 sm:grid sm:grid-cols-2 sm:gap-12 ${isEven ? '' : 'sm:[&>*:first-child]:col-start-2'}`}>
                    <div className={`${isEven ? 'sm:pr-16 sm:text-right' : 'sm:col-start-2 sm:pl-16'}`}>
                      <div className="flex items-center gap-4 sm:block">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[#deddd7] bg-[#f8f7f4] text-[#b95d3d] shadow-sm sm:mb-6 sm:ml-auto sm:mr-0 sm:size-14 [&>*:last-child]:sm:ml-0 [&>*:last-child]:sm:mr-auto">
                          <Icon className="size-5 sm:size-6" strokeWidth={1.7} />
                        </div>
                        <div className="sm:mt-0">
                          <p className="font-serif text-4xl tracking-[-0.02em] text-[#b95d3d] sm:text-5xl">
                            {milestone.year}
                          </p>
                        </div>
                      </div>
                      <h3 className="mt-4 font-serif text-2xl text-[#1c1c1a] sm:mt-5 sm:text-3xl">
                        {milestone.title}
                      </h3>
                      <p className="mt-4 text-sm leading-8 text-[#6b6962] sm:mt-5 sm:text-base">
                        {milestone.description}
                      </p>
                    </div>
                    <div className="hidden sm:block" aria-hidden="true" />
                  </div>

                  <span
                    className="absolute left-4 top-1 flex size-3 -translate-x-1/2 rounded-full bg-[#b95d3d] ring-4 ring-[#f8f7f4] sm:left-1/2 sm:top-4 sm:size-4"
                    aria-hidden="true"
                  />
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      <section className="bg-[#1c1c1a] text-[#f8f7f4] py-20 lg:py-28">
        <div className="mx-auto max-w-[1380px] px-5 lg:px-10">
          <div className="grid gap-10 sm:grid-cols-3 sm:gap-8">
            <div className="text-center">
              <p className="font-serif text-6xl tracking-[-0.03em] text-[#b95d3d] sm:text-7xl">18</p>
              <p className="mt-3 text-xs tracking-[0.18em] text-[#c9c7be] uppercase sm:text-sm">Workshop Partners</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-6xl tracking-[-0.03em] text-[#b95d3d] sm:text-7xl">47</p>
              <p className="mt-3 text-xs tracking-[0.18em] text-[#c9c7be] uppercase sm:text-sm">Countries Served</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-6xl tracking-[-0.03em] text-[#b95d3d] sm:text-7xl">34</p>
              <p className="mt-3 text-xs tracking-[0.18em] text-[#c9c7be] uppercase sm:text-sm">Team Members</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
