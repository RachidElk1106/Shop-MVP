'use client'

import { useMemo } from 'react'
import {
  ChevronDown,
  Search,
  Star,
} from 'lucide-react'

type Category = 'Electronics' | 'Apparel' | 'Home & Kitchen'
type Product = {
  id: number
  name: string
  category: Category
  price: number
  rating: number
  image: string
  tone: string
}

const products: Product[] = [
  { id: 2, name: 'Daily Carry Tote', category: 'Apparel', price: 78, rating: 4.8, image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=85', tone: 'bg-[#e6ddd5]' },
  { id: 3, name: 'Form Ceramic Set', category: 'Home & Kitchen', price: 64, rating: 4.7, image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=85', tone: 'bg-[#e3e4df]' },
  { id: 4, name: 'Studio Desk Lamp', category: 'Home & Kitchen', price: 128, rating: 4.9, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85', tone: 'bg-[#e4ddd6]' },
  { id: 5, name: 'Field Chronograph', category: 'Apparel', price: 245, rating: 4.8, image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85', tone: 'bg-[#dddeda]' },
  { id: 6, name: 'Cloud Knit Sweater', category: 'Apparel', price: 96, rating: 4.6, image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85', tone: 'bg-[#e5e0da]' },
  { id: 7, name: 'Linen Tableware', category: 'Home & Kitchen', price: 52, rating: 4.7, image: 'https://images.unsplash.com/photo-1603199506016-b9a594b593c0?auto=format&fit=crop&w=900&q=85', tone: 'bg-[#e7e0d9]' },
]

const categories = ['All', 'Electronics', 'Apparel', 'Home & Kitchen'] as const
type CategoryFilter = (typeof categories)[number]

type ShopProps = {
  query: string
  setQuery: (q: string) => void
  category: CategoryFilter
  setCategory: (c: CategoryFilter) => void
  sort: string
  setSort: (s: string) => void
  addToCart: (id: number) => void
}

export function Shop({
  query,
  setQuery,
  category,
  setCategory,
  sort,
  setSort,
  addToCart,
}: ShopProps) {
  const visibleProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase())
      const matchesCategory = category === 'All' || product.category === category
      return matchesQuery && matchesCategory
    })
    return [...filtered].sort((a, b) => {
      if (sort === 'price-low') return a.price - b.price
      if (sort === 'price-high') return b.price - a.price
      if (sort === 'rating') return b.rating - a.rating
      return a.id - b.id
    })
  }, [query, category, sort])

  return (
    <>
      <section className="mx-auto max-w-[1380px] px-5 pb-16 pt-14 lg:px-10 lg:pb-20 lg:pt-24">
        <div className="max-w-3xl">
          <p className="mb-5 text-[11px] font-semibold tracking-[0.24em] text-[#b95d3d] uppercase">Thoughtfully made, beautifully lived</p>
          <h1 className="font-serif text-5xl leading-[0.95] tracking-[-0.055em] sm:text-7xl lg:text-[92px]">Objects for <em className="font-normal text-[#b95d3d]">everyday</em> living.</h1>
          <p className="mt-7 max-w-lg text-base leading-7 text-[#6b6962]">A considered collection of useful things, made with intention and chosen to last.</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1380px] px-5 pb-24 lg:px-10">
        <div className="mb-8 flex flex-col gap-5 border-b border-[#deddd7] pb-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`rounded-full border px-4 py-2 text-xs transition-colors ${category === item ? 'border-[#1c1c1a] bg-[#1c1c1a] text-white' : 'border-[#d3d2cc] text-[#696762] hover:border-[#1c1c1a] hover:text-[#1c1c1a]'}`}>{item}</button>)}
          </div>
          <div className="flex items-center gap-3 text-sm text-[#6b6962]">
            <span>{visibleProducts.length} products</span><span className="h-4 w-px bg-[#d3d2cc]" />
            <label htmlFor="sort" className="sr-only">Sort products</label>
            <div className="relative"><select id="sort" value={sort} onChange={(e) => setSort(e.target.value)} className="appearance-none bg-transparent pr-7 text-sm text-[#1c1c1a] outline-none"><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="rating">Top rated</option></select><ChevronDown className="pointer-events-none absolute right-0 top-0.5 size-4" /></div>
          </div>
        </div>
        <div className="mb-6 flex items-center gap-3 sm:hidden"><Search className="size-4 text-[#77756e]" /><label htmlFor="mobile-search" className="sr-only">Search products</label><input id="mobile-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search the collection" className="w-full border-b border-[#bdbcb6] bg-transparent py-2 text-sm outline-none focus:border-[#1c1c1a]" /></div>
        {visibleProducts.length ? <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:grid-cols-4 lg:gap-y-14">{visibleProducts.map((product) => <article key={product.id} className="group"><div className={`relative aspect-[0.88] overflow-hidden ${product.tone}`}><img src={product.image} alt={product.name} className="size-full object-cover transition duration-500 group-hover:scale-[1.04]" /><button onClick={() => addToCart(product.id)} className="absolute bottom-3 left-3 right-3 translate-y-2 bg-[#f8f7f4] py-3 text-xs font-semibold tracking-[0.08em] text-[#1c1c1a] uppercase opacity-0 shadow-sm transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 focus:translate-y-0 focus:opacity-100">Add to bag</button></div><div className="mt-4 flex items-start justify-between gap-3"><div><p className="text-sm font-medium">{product.name}</p><p className="mt-1 text-xs text-[#7b7972]">{product.category}</p></div><p className="text-sm">${product.price}</p></div><div className="mt-2 flex items-center gap-1 text-xs text-[#77756e]"><Star className="size-3 fill-[#b95d3d] text-[#b95d3d]" aria-hidden="true" />{product.rating}</div></article>)}</div> : <div className="border border-dashed border-[#c9c8c1] py-20 text-center"><p className="font-serif text-3xl">Nothing found.</p><p className="mt-2 text-sm text-[#77756e]">Try a different search or category.</p><button onClick={() => { setQuery(''); setCategory('All') }} className="mt-5 text-sm underline underline-offset-4">Clear filters</button></div>}
      </section>
    </>
  )
}

export { products, categories }
export type { Product, Category, CategoryFilter }
