'use client'

import {
  CheckCircle2,
  Package,
  MapPin,
  Mail,
  ArrowRight,
} from 'lucide-react'
import type { OrderSnapshot } from '@/lib/order'

type OrderConfirmationProps = {
  open: boolean
  order: OrderSnapshot | null
  onContinueShopping: () => void
}

export function OrderConfirmation({
  open,
  order,
  onContinueShopping,
}: OrderConfirmationProps) {
  if (!open || !order) return null

  const totalQty = order.items.reduce((s, i) => s + i.quantity, 0)

  return (
    <div
      className="fixed inset-0 z-[70] bg-[#1c1c1a]/45 flex items-end sm:items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirmation-title"
    >
      <div
        className="w-full max-w-[640px] max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-[#f8f7f4] shadow-2xl animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="px-6 pt-8 sm:px-10 sm:pt-10 text-center">
          <div className="relative mx-auto size-20">
            <span
              className="absolute inset-0 rounded-full bg-[#b95d3d]/15 animate-ping"
              aria-hidden="true"
              style={{ animationDuration: '1.4s' }}
            />
            <span className="relative flex size-20 items-center justify-center rounded-full bg-[#b95d3d]/10 text-[#b95d3d]">
              <CheckCircle2
                className="size-10 animate-in zoom-in duration-300 fill-[#b95d3d] text-white"
                strokeWidth={1.5}
              />
            </span>
          </div>
          <p className="mt-6 font-serif text-3xl tracking-[-0.02em] sm:text-4xl" id="confirmation-title">
            Thank you for your order!
          </p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#6b6962]">
            We&apos;ve received your order and a confirmation is on its way to{' '}
            <span className="font-medium text-[#1c1c1a]">{order.shipping.email}</span>.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#deddd7] bg-white px-4 py-2 text-xs font-semibold tracking-[0.14em] uppercase">
            <Package className="size-4 text-[#b95d3d]" strokeWidth={1.8} />
            Order #{order.orderId}
          </div>
        </div>

        <div className="px-6 py-6 sm:px-10 space-y-6">
          <div className="rounded-md border border-[#deddd7] overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#deddd7] bg-[#f0eeea] px-5 py-3.5">
              <p className="text-xs font-semibold tracking-[0.14em] text-[#5f5e59] uppercase">
                Items ({totalQty})
              </p>
              <p className="text-xs text-[#77756e]">
                {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Credit Card'}
              </p>
            </div>
            <ul className="divide-y divide-[#f0eeea] bg-white px-5 py-2">
              {order.items.map((item) => (
                <li key={item.id} className="flex items-center justify-between py-3 text-sm">
                  <div className="min-w-0 flex-1 pr-4">
                    <p className="truncate font-medium text-[#1c1c1a]">{item.name}</p>
                    <p className="mt-0.5 text-xs text-[#77756e]">
                      Qty {item.quantity} · ${item.unitPrice.toFixed(2)} each
                    </p>
                  </div>
                  <p className="font-medium text-[#1c1c1a]">
                    ${item.lineTotal.toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
            <div className="border-t border-[#deddd7] bg-[#f0eeea] px-5 py-4 flex items-end justify-between">
              <div>
                <p className="text-xs tracking-[0.14em] text-[#5f5e59] uppercase">Total</p>
                <p className="mt-1 text-xs text-[#77756e]">
                  Subtotal ${order.subtotal.toFixed(2)}
                </p>
              </div>
              <p className="font-serif text-3xl tracking-[-0.02em] text-[#1c1c1a]">
                ${order.total.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="rounded-md border border-[#deddd7] bg-white px-5 py-5">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-[#5f5e59] uppercase">
              <MapPin className="size-3.5 text-[#b95d3d]" strokeWidth={1.8} />
              Shipping to
            </div>
            <div className="mt-3 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-[#1c1c1a]">
                  {order.shipping.fullName}
                </p>
                <p className="mt-1 text-sm leading-6 text-[#6b6962]">
                  {order.shipping.address}
                </p>
                <p className="text-sm leading-6 text-[#6b6962]">
                  {order.shipping.city}
                </p>
              </div>
              <div className="inline-flex items-center gap-2 self-start text-xs text-[#6b6962]">
                <Mail className="size-3.5" strokeWidth={1.8} />
                {order.shipping.email}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onContinueShopping}
            className="inline-flex w-full items-center justify-center gap-2 bg-[#1c1c1a] py-4 text-xs font-semibold tracking-[0.14em] text-white uppercase transition hover:bg-[#b95d3d]"
          >
            Continue Shopping
            <ArrowRight className="size-4" strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </div>
  )
}
