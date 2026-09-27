'use client'

import { useState } from 'react'
import {
  CreditCard,
  DollarSign,
  MapPin,
  User,
  Mail,
  Building2,
  X,
  ArrowRight,
  AlertCircle,
} from 'lucide-react'
import type {
  OrderSnapshot,
  PaymentMethod,
  ProductWithQuantity,
  ShippingInfo,
  ValidationErrors,
} from '@/lib/order'
import { buildOrderLines, generateOrderId, validateEmail } from '@/lib/order'

type CheckoutModalProps = {
  open: boolean
  items: ProductWithQuantity[]
  subtotal: number
  onClose: () => void
  onPlaceOrder: (order: OrderSnapshot) => void
}

const EMPTY_SHIPPING: ShippingInfo = {
  fullName: '',
  email: '',
  address: '',
  city: '',
}

export function CheckoutModal({
  open,
  items,
  subtotal,
  onClose,
  onPlaceOrder,
}: CheckoutModalProps) {
  const [shipping, setShipping] = useState<ShippingInfo>(EMPTY_SHIPPING)
  const [payment, setPayment] = useState<PaymentMethod>('cod')
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [attempted, setAttempted] = useState(false)

  if (!open) return null

  const total = subtotal

  function setField<K extends keyof ShippingInfo>(key: K, value: ShippingInfo[K]) {
    setShipping((prev) => ({ ...prev, [key]: value }))
    if (attempted) {
      setErrors(validate({ ...shipping, [key]: value }))
    }
  }

  function validate(s: ShippingInfo): ValidationErrors {
    const next: ValidationErrors = {}
    if (!s.fullName.trim()) next.fullName = 'Full name is required'
    if (!s.email.trim()) next.email = 'Email is required'
    else if (!validateEmail(s.email)) next.email = 'Please enter a valid email address'
    if (!s.address.trim()) next.address = 'Shipping address is required'
    if (!s.city.trim()) next.city = 'City is required'
    return next
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setAttempted(true)
    const nextErrors = validate(shipping)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    const orderLines = buildOrderLines(items)
    const snapshot: OrderSnapshot = {
      orderId: generateOrderId(),
      shipping: {
        fullName: shipping.fullName.trim(),
        email: shipping.email.trim(),
        address: shipping.address.trim(),
        city: shipping.city.trim(),
      },
      paymentMethod: payment,
      items: orderLines,
      subtotal,
      total,
      createdAt: new Date().toISOString(),
    }
    onPlaceOrder(snapshot)
  }

  function handleCloseReset() {
    setShipping(EMPTY_SHIPPING)
    setPayment('cod')
    setErrors({})
    setAttempted(false)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-[60] bg-[#1c1c1a]/45 flex items-end sm:items-center justify-center"
      onClick={handleCloseReset}
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-title"
    >
      <div
        className="w-full max-w-[960px] max-h-[92vh] overflow-hidden rounded-t-2xl sm:rounded-2xl bg-[#f8f7f4] shadow-2xl grid grid-cols-1 lg:grid-cols-5"
        onClick={(e) => e.stopPropagation()}
      >
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-3 flex flex-col max-h-[92vh]"
          noValidate
        >
          <div className="flex items-center justify-between border-b border-[#deddd7] px-6 py-5">
            <div>
              <p className="font-serif text-2xl" id="checkout-title">Checkout</p>
              <p className="mt-1 text-xs text-[#77756e]">
                {items.reduce((s, i) => s + i.quantity, 0)}{' '}
                {items.reduce((s, i) => s + i.quantity, 0) === 1 ? 'item' : 'items'} in your bag
              </p>
            </div>
            <button
              type="button"
              onClick={handleCloseReset}
              className="rounded-full p-2 hover:bg-[#e8e6e0]"
              aria-label="Close checkout"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8 sm:py-7 space-y-8">
            <section aria-labelledby="shipping-heading">
              <div className="flex items-center gap-3 mb-5">
                <span className="flex size-9 items-center justify-center rounded-full bg-[#b95d3d]/10 text-[#b95d3d]">
                  <MapPin className="size-4" strokeWidth={1.8} />
                </span>
                <h2
                  id="shipping-heading"
                  className="font-serif text-xl tracking-[-0.01em]"
                >
                  Shipping Information
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <Label icon={User} htmlFor="fullName">Full Name</Label>
                  <TextField
                    id="fullName"
                    value={shipping.fullName}
                    onChange={(v) => setField('fullName', v)}
                    placeholder="Alex Morgan"
                    error={errors.fullName}
                    autoComplete="name"
                  />
                  <FieldError message={errors.fullName} />
                </div>
                <div className="sm:col-span-2">
                  <Label icon={Mail} htmlFor="email">Email</Label>
                  <TextField
                    id="email"
                    type="email"
                    value={shipping.email}
                    onChange={(v) => setField('email', v)}
                    placeholder="alex@example.com"
                    error={errors.email}
                    autoComplete="email"
                  />
                  <FieldError message={errors.email} />
                </div>
                <div className="sm:col-span-2">
                  <Label icon={Building2} htmlFor="address">Shipping Address</Label>
                  <TextField
                    id="address"
                    value={shipping.address}
                    onChange={(v) => setField('address', v)}
                    placeholder="123 Market Street, Apt 4B"
                    error={errors.address}
                    autoComplete="street-address"
                  />
                  <FieldError message={errors.address} />
                </div>
                <div className="sm:col-span-2">
                  <Label icon={MapPin} htmlFor="city">City</Label>
                  <TextField
                    id="city"
                    value={shipping.city}
                    onChange={(v) => setField('city', v)}
                    placeholder="Brooklyn"
                    error={errors.city}
                    autoComplete="address-level2"
                  />
                  <FieldError message={errors.city} />
                </div>
              </div>
            </section>

            <section aria-labelledby="payment-heading">
              <div className="flex items-center gap-3 mb-5">
                <span className="flex size-9 items-center justify-center rounded-full bg-[#b95d3d]/10 text-[#b95d3d]">
                  <CreditCard className="size-4" strokeWidth={1.8} />
                </span>
                <h2 id="payment-heading" className="font-serif text-xl tracking-[-0.01em]">
                  Payment Method
                </h2>
              </div>

              <div className="space-y-3">
                <PaymentOption
                  id="pay-cod"
                  name="payment"
                  icon={<DollarSign className="size-4" strokeWidth={1.8} />}
                  title="Cash on Delivery"
                  description="Pay when your order arrives."
                  checked={payment === 'cod'}
                  onChange={() => setPayment('cod')}
                />
                <PaymentOption
                  id="pay-card"
                  name="payment"
                  icon={<CreditCard className="size-4" strokeWidth={1.8} />}
                  title="Credit Card"
                  description="Coming soon — unavailable for this release."
                  checked={payment === 'card-soon'}
                  onChange={() => setPayment('card-soon')}
                  disabled
                  badge="Coming soon"
                />
              </div>
            </section>
          </div>

          <div className="border-t border-[#deddd7] px-6 py-5 sm:px-8">
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 bg-[#1c1c1a] py-4 text-xs font-semibold tracking-[0.14em] text-white uppercase transition hover:bg-[#b95d3d]"
            >
              Place Order
              <ArrowRight className="size-4" strokeWidth={1.8} />
            </button>
          </div>
        </form>

        <aside className="lg:col-span-2 border-t lg:border-t-0 lg:border-l border-[#deddd7] bg-[#f0eeea] flex flex-col max-h-[92vh]">
          <div className="border-b border-[#deddd7] px-6 py-5 hidden lg:block">
            <p className="font-serif text-2xl">Order Summary</p>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div
                  className={`relative size-20 shrink-0 overflow-hidden rounded-sm ${item.tone}`}
                >
                  <img
                    src={item.image}
                    alt=""
                    className="size-full object-cover"
                  />
                  <span className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-[#1c1c1a] text-[10px] font-semibold text-white">
                    {item.quantity}
                  </span>
                </div>
                <div className="min-w-0 flex-1 flex flex-col justify-between py-0.5">
                  <div>
                    <p className="truncate text-sm font-medium">{item.name}</p>
                    <p className="mt-0.5 text-xs text-[#77756e]">
                      ${item.price.toFixed(2)} each
                    </p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#77756e]">Qty {item.quantity}</span>
                    <span className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-[#deddd7] px-6 py-5 space-y-3 text-sm">
            <div className="flex justify-between text-[#6b6962]">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[#6b6962]">
              <span>Shipping</span>
              <span>{subtotal >= 100 ? 'Free' : '$8.00'}</span>
            </div>
            <div className="border-t border-[#deddd7] pt-3 flex justify-between items-baseline">
              <span className="text-sm font-medium">Total</span>
              <span className="font-serif text-2xl">${total.toFixed(2)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

function Label({
  icon,
  htmlFor,
  children,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  htmlFor: string
  children: React.ReactNode
}) {
  const Icon = icon
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-[0.1em] text-[#5f5e59] uppercase"
    >
      <Icon className="size-3.5 text-[#b95d3d]" strokeWidth={1.8} />
      {children}
    </label>
  )
}

function TextField({
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  autoComplete,
}: {
  id: string
  type?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
  autoComplete?: string
}) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      autoComplete={autoComplete}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`w-full rounded-md border px-4 py-3 bg-white text-sm outline-none transition placeholder:text-[#9a9890] focus:ring-2 focus:ring-[#b95d3d]/30 ${
        error
          ? 'border-[#b95d3d]/70 focus:border-[#b95d3d]'
          : 'border-[#d3d2cc] focus:border-[#1c1c1a]'
      }`}
    />
  )
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return (
    <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-[#b95d3d]">
      <AlertCircle className="size-3.5" strokeWidth={2} />
      {message}
    </p>
  )
}

function PaymentOption({
  id,
  name,
  icon,
  title,
  description,
  checked,
  onChange,
  disabled,
  badge,
}: {
  id: string
  name: string
  icon: React.ReactNode
  title: string
  description: string
  checked: boolean
  onChange: () => void
  disabled?: boolean
  badge?: string
}) {
  return (
    <label
      htmlFor={id}
      className={`group flex cursor-pointer items-start gap-4 rounded-md border px-4 py-4 transition ${
        disabled
          ? 'cursor-not-allowed opacity-60'
          : checked
          ? 'border-[#1c1c1a] bg-white shadow-sm'
          : 'border-[#d3d2cc] hover:border-[#1c1c1a]/60 hover:bg-white/60'
      }`}
    >
      <input
        id={id}
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="sr-only"
      />
      <span
        className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition ${
          checked
            ? 'border-[#b95d3d]'
            : 'border-[#bdbcb6] group-hover:border-[#1c1c1a]/60'
        }`}
        aria-hidden="true"
      >
        {checked && <span className="size-2.5 rounded-full bg-[#b95d3d]" />}
      </span>
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#e8e6e0] text-[#1c1c1a]">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-[#1c1c1a]">{title}</span>
          {badge && (
            <span className="rounded-full border border-[#deddd7] bg-[#f0eeea] px-2 py-0.5 text-[10px] font-semibold tracking-[0.1em] text-[#77756e] uppercase">
              {badge}
            </span>
          )}
        </span>
        <span className="mt-0.5 block text-xs leading-5 text-[#77756e]">
          {description}
        </span>
      </span>
    </label>
  )
}
