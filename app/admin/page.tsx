import { getInquiries, setStatus, type InquiryStatus } from '../actions'

export const dynamic = 'force-dynamic'

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

export default async function AdminPage() {
  const inquiries = await getInquiries()

  const counts = inquiries.reduce(
    (acc, i) => ({ ...acc, [i.status]: (acc[i.status] ?? 0) + 1 }),
    {} as Record<string, number>
  )

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div className="admin-logo">
          <span>MONO</span>
          <em>flowers</em>
          <span className="admin-sep">·</span>
          <span className="admin-panel-label">Панель управління</span>
        </div>
        <a href="/" className="admin-back-link">
          ← На сайт
        </a>
      </header>

      <main className="admin-main">
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

        <div className="admin-card">
          <div className="admin-card-head">
            <h2>Запити клієнтів</h2>
            <span className="admin-count">{inquiries.length} записів</span>
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
                  {inquiries.map((inq) => {
                    const toNew = setStatus.bind(null, inq.id, 'new')
                    const toContacted = setStatus.bind(null, inq.id, 'contacted')
                    const toConfirmed = setStatus.bind(null, inq.id, 'confirmed')
                    const toCompleted = setStatus.bind(null, inq.id, 'completed')

                    return (
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
                              <form action={toNew}>
                                <button type="submit" className="saction-btn saction-new">
                                  Новий
                                </button>
                              </form>
                            )}
                            {inq.status !== 'contacted' && (
                              <form action={toContacted}>
                                <button type="submit" className="saction-btn saction-contacted">
                                  Зв&apos;язались
                                </button>
                              </form>
                            )}
                            {inq.status !== 'confirmed' && (
                              <form action={toConfirmed}>
                                <button type="submit" className="saction-btn saction-confirmed">
                                  Підтвердити
                                </button>
                              </form>
                            )}
                            {inq.status !== 'completed' && (
                              <form action={toCompleted}>
                                <button type="submit" className="saction-btn saction-completed">
                                  Виконано
                                </button>
                              </form>
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
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
