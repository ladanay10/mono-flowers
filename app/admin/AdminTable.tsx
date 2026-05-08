"use client";

import { useTransition } from "react";
import { setStatus, type Inquiry, type InquiryStatus } from "@/app/actions";

const STATUS_LABELS: Record<InquiryStatus, string> = {
  new: "Новий",
  contacted: "Зв'язались",
  confirmed: "Підтверджено",
  completed: "Виконано",
};

const EVENT_LABELS: Record<string, string> = {
  wedding: "Весілля",
  birthday: "День народження",
  christening: "Хрестини",
  engagement: "Заручини",
  corporate: "Корпоратив",
  photoshoot: "Фотосесія",
  other: "Інше",
};

const BADGE: Record<InquiryStatus, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-yellow-100 text-amber-800",
  confirmed: "bg-green-100 text-green-700",
  completed: "bg-mint-pale text-olive-dark",
};

const BTN: Record<InquiryStatus, string> = {
  new: "text-blue-700",
  contacted: "text-amber-800",
  confirmed: "text-green-700",
  completed: "text-olive-dark",
};

const STAT_BORDER: Record<string, string> = {
  "": "border-mint",
  "stat-new": "border-blue-400",
  "stat-conf": "border-green-500",
  "stat-done": "border-olive",
};

export function AdminTable({ inquiries }: { inquiries: Inquiry[] }) {
  const [isPending, startTransition] = useTransition();

  const counts = inquiries.reduce(
    (acc, i) => ({ ...acc, [i.status]: (acc[i.status] ?? 0) + 1 }),
    {} as Record<string, number>,
  );

  const stats = [
    { label: "Всього", val: inquiries.length, border: "border-mint" },
    { label: "Нові", val: counts.new ?? 0, border: "border-blue-400" },
    {
      label: "Підтверджено",
      val: counts.confirmed ?? 0,
      border: "border-green-500",
    },
    { label: "Виконано", val: counts.completed ?? 0, border: "border-olive" },
  ];

  function changeStatus(id: string, status: InquiryStatus) {
    startTransition(() => setStatus(id, status));
  }

  const allStatuses = [
    "new",
    "contacted",
    "confirmed",
    "completed",
  ] as InquiryStatus[];

  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-7 max-sm:grid-cols-2 max-sm:gap-3">
        {stats.map(({ label, val, border }) => (
          <div
            key={label}
            className={`bg-white p-6 pl-7 border-l-[3px] ${border}`}
          >
            <div className="font-display text-[44px] text-ink leading-none mb-[6px]">
              {val}
            </div>
            <div className="text-[11px] tracking-[0.18em] uppercase text-ink-light">
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div
        className={`bg-white transition-opacity duration-200 ${isPending ? "opacity-60" : ""}`}
      >
        <div className="flex items-center justify-between px-7 py-[22px] border-b border-mint-pale max-sm:px-[18px] max-sm:py-4">
          <h2 className="font-display text-[22px] font-light text-ink m-0">
            Запити клієнтів
          </h2>
          <span className="text-[11px] tracking-[0.16em] uppercase text-ink-light">
            {isPending ? "оновлення…" : `${inquiries.length} записів`}
          </span>
        </div>

        {inquiries.length === 0 ? (
          <div className="py-[60px] px-7 text-center text-[14px] leading-[1.8] text-ink-light">
            Запитів поки немає.{" "}
            <a href="/#cta" className="text-olive underline">
              Форма замовлення
            </a>{" "}
            — на головній сторінці.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[13px] min-w-[900px]">
              <thead>
                <tr>
                  {[
                    "Клієнт",
                    "Контакти",
                    "Подія",
                    "Дата / Бюджет",
                    "Побажання",
                    "Статус",
                    "Отримано",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left px-5 py-[13px] text-[10px] tracking-[0.22em] uppercase text-ink-light bg-cream border-b border-mint-light font-normal"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inq) => (
                  <tr
                    key={inq.id}
                    className={`border-b border-black/[0.04] last:border-b-0 align-top
                      ${inq.status === "new" ? "bg-[#fafcff]" : ""}
                      ${inq.status === "completed" ? "bg-[#f9faf8]" : ""}
                    `}
                  >
                    <td className="px-5 py-[15px] font-medium text-ink whitespace-nowrap">
                      {inq.name}
                    </td>

                    <td className="px-5 py-[15px]">
                      <a
                        href={`tel:${inq.phone}`}
                        className="text-olive no-underline block hover:underline"
                      >
                        {inq.phone}
                      </a>
                      {inq.email && (
                        <a
                          href={`mailto:${inq.email}`}
                          className="text-[12px] text-ink-light no-underline block mt-px hover:underline"
                        >
                          {inq.email}
                        </a>
                      )}
                    </td>

                    <td className="px-5 py-[15px]">
                      {EVENT_LABELS[inq.eventType] ?? inq.eventType}
                    </td>

                    <td className="px-5 py-[15px] whitespace-nowrap">
                      <span className="block">
                        {inq.eventDate || <em className="text-ink-light">—</em>}
                      </span>
                      {inq.budget && (
                        <span className="text-[12px] text-ink-light mt-[3px] block">
                          {inq.budget}
                        </span>
                      )}
                    </td>

                    <td className="px-5 py-[15px] max-w-[220px] text-[12px] text-ink-mid leading-[1.6]">
                      {inq.message || <em className="text-ink-light">—</em>}
                    </td>

                    <td className="px-5 py-[15px] min-w-[140px]">
                      <span
                        className={`inline-block px-[10px] py-1 text-[10px] tracking-[0.14em] uppercase mb-[10px] ${BADGE[inq.status]}`}
                      >
                        {STATUS_LABELS[inq.status]}
                      </span>
                      <div className="flex flex-wrap gap-[5px]">
                        {allStatuses
                          .filter((s) => s !== inq.status)
                          .map((s) => (
                            <button
                              key={s}
                              type="button"
                              disabled={isPending}
                              onClick={() => changeStatus(inq.id, s)}
                              className={`border border-current bg-transparent px-[9px] py-[3px] text-[10px] tracking-[0.12em] uppercase transition-all hover:bg-current hover:text-white disabled:opacity-40 ${BTN[s]}`}
                            >
                              {STATUS_LABELS[s]}
                            </button>
                          ))}
                      </div>
                    </td>

                    <td className="px-5 py-[15px] whitespace-nowrap text-[12px] text-ink-light">
                      {new Date(inq.createdAt).toLocaleDateString("uk-UA", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
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
  );
}
