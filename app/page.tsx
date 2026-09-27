'use client'

import { useEffect, useState } from 'react'
import {
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react'
import { Shop, products, type CategoryFilter } from '@/components/Shop'
import { OurStory } from '@/components/OurStory'
import { Journey } from '@/components/Journey'
import { Journal } from '@/components/Journal'
import { CheckoutModal } from '@/components/CheckoutModal'
import { OrderConfirmation } from '@/components/OrderConfirmation'
import type { OrderSnapshot, ProductWithQuantity } from '@/lib/order'

type PageKey = 'shop' | 'story' | 'journey' | 'journal'

const VALID_PAGES: Record<string, PageKey> = {
  shop: 'shop',
  story: 'story',
  journey: 'journey',
  journal: 'journal',
}

function getPageFromHash(hash: string): PageKey {
  const clean = hash.replace(/^#/, '').trim().toLowerCase()
  if (!clean) return 'shop'
  return VALID_PAGES[clean] ?? 'shop'
}

const NAV_ITEMS: { key: PageKey; label: string; hash: string }[] = [
  { key: 'shop', label: 'Shop', hash: '#shop' },
  { key: 'story', label: 'Our Story', hash: '#story' },
  { key: 'journey', label: 'Journey', hash: '#journey' },
  { key: 'journal', label: 'Journal', hash: '#journal' },
]

export default function Page() {
  const [currentPage, setCurrentPage] = useState<PageKey>('shop')
  const [isHydrated, setIsHydrated] = useState(false)

  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<CategoryFilter>('All')
  const [sort, setSort] = useState('featured')
  const [cart, setCart] = useState<Record<number, number>>({})
  const [cartOpen, setCartOpen] = useState(false)

  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [confirmationOpen, setConfirmationOpen] = useState(false)
  const [lastOrder, setLastOrder] = useState<OrderSnapshot | null>(null)

  useEffect(() => {
    setCurrentPage(getPageFromHash(window.location.hash))
    setIsHydrated(true)

    function handleHashChange() {
      setCurrentPage(getPageFromHash(window.location.hash))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const cartItems = products.filter((product) => cart[product.id])
  const cartItemsWithQty: ProductWithQuantity[] = cartItems.map((p) => ({
    ...p,
    quantity: cart[p.id],
  }))
  const itemCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0)
  const subtotal = cartItems.reduce((sum, product) => sum + product.price * cart[product.id], 0)

  function addToCart(id: number) {
    setCart((current) => ({ ...current, [id]: (current[id] || 0) + 1 }))
  }
  function changeQuantity(id: number, amount: number) {
    setCart((current) => {
      const next = Math.max(0, (current[id] || 0) + amount)
      if (!next) {
        const { [id]: _, ...rest } = current
        return rest
      }
      return { ...current, [id]: next }
    })
  }

  function openCheckout() {
    if (cartItems.length === 0) return
    setCartOpen(false)
    setCheckoutOpen(true)
  }

  function handlePlaceOrder(order: OrderSnapshot) {
    setLastOrder(order)
    setCart({})
    setCheckoutOpen(false)
    setConfirmationOpen(true)
  }

  function handleContinueShopping() {
    setConfirmationOpen(false)
    setLastOrder(null)
    if (window.location.hash !== '#shop') {
      window.location.hash = '#shop'
    } else {
      setCurrentPage('shop')
    }
  }

  function renderPage() {
    if (!isHydrated) {
      return (
        <Shop
          query={query}
          setQuery={setQuery}
          category={category}
          setCategory={setCategory}
          sort={sort}
          setSort={setSort}
          addToCart={addToCart}
        />
      )
    }
    switch (currentPage) {
      case 'story':
        return <OurStory />
      case 'journey':
        return <Journey />
      case 'journal':
        return <Journal />
      case 'shop':
      default:
        return (
          <Shop
            query={query}
            setQuery={setQuery}
            category={category}
            setCategory={setCategory}
            sort={sort}
            setSort={setSort}
            addToCart={addToCart}
          />
        )
    }
  }

  return (
    <main className="min-h-screen bg-[#f8f7f4] text-[#1c1c1a]">
      <div className="border-b border-[#deddd7] bg-[#1c1c1a] px-4 py-2 text-center text-[11px] font-medium tracking-[0.18em] text-[#f8f7f4] uppercase sm:text-xs">
        Complimentary shipping on orders over $100
      </div>
      <header className="sticky top-0 z-40 border-b border-[#deddd7] bg-[#f8f7f4]/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1380px] items-center justify-between gap-6 px-5 py-5 lg:px-10">
          <a href="#shop" onClick={() => setCurrentPage('shop')} className="font-serif text-2xl tracking-[-0.04em] sm:text-3xl">nōma</a>
          <nav className="hidden items-center gap-8 text-sm text-[#5f5e59] lg:flex" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.key}
                href={item.hash}
                className={`transition-colors hover:text-[#1c1c1a] ${currentPage === item.key ? 'text-[#1c1c1a]' : ''}`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3 sm:gap-5">
            <div className="relative hidden w-44 items-center sm:flex">
              <Search className="absolute left-0 size-[17px] text-[#77756e]" aria-hidden="true" />
              <label htmlFor="header-search" className="sr-only">Search products</label>
              <input
                id="header-search"
                value={currentPage === 'shop' ? query : ''}
                onChange={(e) => {
                  if (currentPage !== 'shop') {
                    window.location.hash = '#shop'
                  }
                  setQuery(e.target.value)
                }}
                placeholder="Search"
                className="w-full border-b border-[#bdbcb6] bg-transparent py-1 pl-7 text-sm outline-none placeholder:text-[#898781] focus:border-[#1c1c1a]"
              />
            </div>
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 text-sm"
              aria-label={`Open cart with ${itemCount} items`}
            >
              <ShoppingBag className="size-[19px]" strokeWidth={1.6} aria-hidden="true" />
              <span className="hidden sm:inline">Bag</span>
              {itemCount > 0 && (
                <span className="flex size-5 items-center justify-center rounded-full bg-[#b95d3d] text-[10px] font-semibold text-white">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
        <nav className="flex items-center justify-center gap-6 border-t border-[#f0eeea] px-5 py-3 text-xs tracking-[0.08em] text-[#5f5e59] uppercase lg:hidden" aria-label="Mobile navigation">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.key}
              href={item.hash}
              className={`transition-colors hover:text-[#1c1c1a] ${currentPage === item.key ? 'text-[#1c1c1a]' : ''}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      {renderPage()}

      {cartOpen && (
        <div className="fixed inset-0 z-50 bg-[#1c1c1a]/35" onClick={() => setCartOpen(false)}>
          <aside
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-[#f8f7f4] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between border-b border-[#deddd7] px-6 py-5">
              <div>
                <p className="font-serif text-2xl">Your bag</p>
                <p className="mt-1 text-xs text-[#77756e]">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'}
                </p>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="rounded-full p-2 hover:bg-[#e8e6e0]"
                aria-label="Close cart"
              >
                <X className="size-5" />
              </button>
            </div>
            {cartItems.length ? (
              <>
                <div className="flex-1 overflow-y-auto px-6">
                  {cartItems.map((product) => (
                    <div key={product.id} className="flex gap-4 border-b border-[#deddd7] py-5">
                      <img src={product.image} alt="" className="size-20 object-cover" />
                      <div className="min-w-0 flex-1">
                        <div className="flex justify-between gap-3">
                          <div>
                            <p className="truncate text-sm font-medium">{product.name}</p>
                            <p className="mt-1 text-xs text-[#77756e]">${product.price}</p>
                          </div>
                          <button
                            onClick={() => changeQuantity(product.id, -cart[product.id])}
                            className="text-[#77756e] hover:text-[#b95d3d]"
                            aria-label={`Remove ${product.name}`}
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                        <div className="mt-4 flex items-center gap-3">
                          <div className="flex items-center border border-[#d3d2cc]">
                            <button
                              onClick={() => changeQuantity(product.id, -1)}
                              className="p-1.5 hover:bg-[#e8e6e0]"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="size-3" />
                            </button>
                            <span className="w-7 text-center text-xs">{cart[product.id]}</span>
                            <button
                              onClick={() => changeQuantity(product.id, 1)}
                              className="p-1.5 hover:bg-[#e8e6e0]"
                              aria-label="Increase quantity"
                            >
                              <Plus className="size-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-[#deddd7] px-6 py-6">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <p className="mt-2 text-xs text-[#77756e]">Shipping and taxes calculated at checkout.</p>
                  <button
                    onClick={openCheckout}
                    className="mt-5 w-full bg-[#1c1c1a] py-4 text-xs font-semibold tracking-[0.14em] text-white uppercase transition hover:bg-[#b95d3d]"
                  >
                    Checkout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                <ShoppingBag className="mb-5 size-9 stroke-1 text-[#77756e]" />
                <p className="font-serif text-3xl">Your bag is empty.</p>
                <p className="mt-2 text-sm text-[#77756e]">Add something beautiful to get started.</p>
                <button
                  onClick={() => setCartOpen(false)}
                  className="mt-6 border-b border-[#1c1c1a] pb-1 text-sm"
                >
                  Continue shopping
                </button>
              </div>
            )}
          </aside>
        </div>
      )}

      <CheckoutModal
        open={checkoutOpen}
        items={cartItemsWithQty}
        subtotal={subtotal}
        onClose={() => setCheckoutOpen(false)}
        onPlaceOrder={handlePlaceOrder}
      />

      <OrderConfirmation
        open={confirmationOpen}
        order={lastOrder}
        onContinueShopping={handleContinueShopping}
      />
    </main>
  )
}
