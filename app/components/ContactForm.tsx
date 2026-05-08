'use client'

import { useActionState } from 'react'
import { submitInquiry } from '@/app/actions'

const EVENT_TYPES = [
  { v: 'wedding', l: 'Весілля' },
  { v: 'birthday', l: 'День народження' },
  { v: 'christening', l: 'Хрестини' },
  { v: 'engagement', l: 'Заручини' },
  { v: 'corporate', l: 'Корпоратив' },
  { v: 'photoshoot', l: 'Фотосесія' },
  { v: 'other', l: 'Інше' },
]

const BUDGETS = [
  { v: '400-800', l: 'від 400 до 800 грн' },
  { v: '800-3000', l: 'від 800 до 3 000 грн' },
  { v: '3000+', l: 'від 3 000 грн' },
  { v: 'discuss', l: 'Обговоримо' },
]

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitInquiry, null)

  if (state?.ok) {
    return (
      <div className="form-success">
        <div className="form-success-icon">✦</div>
        <h3>Дякуємо за запит!</h3>
        <p>Ми отримали ваше звернення і зв&apos;яжемося найближчим часом.</p>
      </div>
    )
  }

  return (
    <form className="booking-form" action={formAction} noValidate>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="bf-name">
            Ваше ім&apos;я <span aria-hidden="true">*</span>
          </label>
          <input
            type="text"
            id="bf-name"
            name="name"
            placeholder="Олена Іваненко"
            required
            autoComplete="name"
          />
        </div>
        <div className="form-field">
          <label htmlFor="bf-phone">
            Телефон <span aria-hidden="true">*</span>
          </label>
          <input
            type="tel"
            id="bf-phone"
            name="phone"
            placeholder="+380 68 054 09 55"
            required
            autoComplete="tel"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="bf-email">Email</label>
          <input
            type="email"
            id="bf-email"
            name="email"
            placeholder="elena@gmail.com"
            autoComplete="email"
          />
        </div>
        <div className="form-field">
          <label htmlFor="bf-event">
            Тип події <span aria-hidden="true">*</span>
          </label>
          <select id="bf-event" name="eventType" required defaultValue="">
            <option value="" disabled>
              Оберіть тип події
            </option>
            {EVENT_TYPES.map(({ v, l }) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="bf-date">Дата події</label>
          <input type="date" id="bf-date" name="eventDate" />
        </div>
        <div className="form-field">
          <label htmlFor="bf-budget">Бюджет</label>
          <select id="bf-budget" name="budget" defaultValue="">
            <option value="" disabled>
              Оберіть бюджет
            </option>
            {BUDGETS.map(({ v, l }) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-field form-field-full">
        <label htmlFor="bf-msg">Побажання</label>
        <textarea
          id="bf-msg"
          name="message"
          rows={4}
          placeholder="Розкажіть про захід, стиль, кількість гостей..."
        />
      </div>

      {state?.err && (
        <p className="form-error" role="alert">
          {state.err}
        </p>
      )}

      <button type="submit" className="form-submit" disabled={isPending}>
        {isPending ? 'Надсилаємо…' : 'Надіслати запит →'}
      </button>
    </form>
  )
}
