'use client'

import { useTransition } from 'react'
import { setStatus, type Inquiry, type InquiryStatus } from '@/app/actions'

const STATUS_LABELS: Record<InquiryStatus, string> = {
  new: 'Новий',
  contacted: "Зв'язались",
  confirmed: 'Підтверджено',
  completed: 'Виконано',
}

const EVENT_LABELS: Record<string, string> = {
  wedding: 'Весілля',
  birthday: 'День народження',
  christening: 'Хрестини',
  engagement: 'Заручини',
  corporate: 'Корпоратив',
  photoshoot: 'Фотосесія',
  other: 'Інше',
}

export function AdminTable({ inquiries }: { inquiries: Inquiry[] }) {
  const [isPending, startTransition] = useTransition()

  function changeStatus(id: string, status: InquiryStatus) {
    startTransition(() => setStatus(id, status))
  }

  const counts = inquiries.reduce(
    (acc, i) => ({ ...acc, [i.status]: (acc[i.status] ?? 0) + 1 }),
    {} as Record<string, number>
  )

  return (
    <>
      <div className="admin-stats">
        {(
          [
            { label: 'Всього', val: inquiries.length, cls: '' },
            { label: 'Нові', val: counts.new ?? 0, cls: 'stat-new' },
            { label: 'Підтверджено', val: counts.confirmed ?? 0, cls: 'stat-confirmed' },
            { label: 'Виконано', val: counts.completed ?? 0, cls: 'stat-completed' },
          ] as const
        ).map(({ label, val, cls }) => (
          <div key={label} className={`admin-stat ${cls}`}>
            <div className="astat-num">{val}</div>
            <div className="astat-label">{label}</div>
          </div>
        ))}
      </div>

      <div className={`admin-card${isPending ? ' admin-card--pending' : ''}`}>
        <div className="admin-card-head">
          <h2>Запити клієнтів</h2>
          <span className="admin-count">
            {isPending ? 'оновлення…' : `${inquiries.length} записів`}
          </span>
        </div>

        {inquiries.length === 0 ? (
          <div className="admin-empty">
            <p>
              Запитів поки немає.{' '}
              <a href="/#cta">Форма замовлення</a> — на головній сторінці.
            </p>
          </div>
        ) : (
          <div className="admin-table-scroll">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Клієнт</th>
                  <th>Контакти</th>
                  <th>Подія</th>
                  <th>Дата / Бюджет</th>
                  <th>Побажання</th>
                  <th>Статус</th>
                  <th>Отримано</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inq) => (
                  <tr key={inq.id} className={`row-${inq.status}`}>
                    <td className="td-name">{inq.name}</td>
                    <td className="td-contact">
                      <a href={`tel:${inq.phone}`}>{inq.phone}</a>
                      {inq.email && (
                        <>
                          <br />
                          <a href={`mailto:${inq.email}`} className="td-email">
                            {inq.email}
                          </a>
                        </>
                      )}
                    </td>
                    <td>{EVENT_LABELS[inq.eventType] ?? inq.eventType}</td>
                    <td className="td-meta">
                      {inq.eventDate ? (
                        <span>{inq.eventDate}</span>
                      ) : (
                        <span className="na">—</span>
                      )}
                      {inq.budget && <span className="budget">{inq.budget}</span>}
                    </td>
                    <td className="td-msg">
                      {inq.message || <span className="na">—</span>}
                    </td>
                    <td className="td-status">
                      <span className={`status-badge badge-${inq.status}`}>
                        {STATUS_LABELS[inq.status]}
                      </span>
                      <div className="status-actions">
                        {inq.status !== 'new' && (
                          <button
                            type="button"
                            className="saction-btn saction-new"
                            onClick={() => changeStatus(inq.id, 'new')}
                            disabled={isPending}
                          >
                            Новий
                          </button>
                        )}
                        {inq.status !== 'contacted' && (
                          <button
                            type="button"
                            className="saction-btn saction-contacted"
                            onClick={() => changeStatus(inq.id, 'contacted')}
                            disabled={isPending}
                          >
                            Зв&apos;язались
                          </button>
                        )}
                        {inq.status !== 'confirmed' && (
                          <button
                            type="button"
                            className="saction-btn saction-confirmed"
                            onClick={() => changeStatus(inq.id, 'confirmed')}
                            disabled={isPending}
                          >
                            Підтвердити
                          </button>
                        )}
                        {inq.status !== 'completed' && (
                          <button
                            type="button"
                            className="saction-btn saction-completed"
                            onClick={() => changeStatus(inq.id, 'completed')}
                            disabled={isPending}
                          >
                            Виконано
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="td-date">
                      {new Date(inq.createdAt).toLocaleDateString('uk-UA', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}
