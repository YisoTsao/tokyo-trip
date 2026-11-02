import { useEffect, useRef } from "react";
import type { ExpenseRow } from "../../data/expenses";
import { rideOf } from "../../data/rides";
import { Icon } from "../../illustrations/journal/icons";
import { yenRange } from "../../lib/expenses";
import { JournalTimeline } from "./JournalTimeline";
import { Sticker } from "./ui";

export interface RideList {
  title: string;
  rows: ExpenseRow[];
}

const CLOSE_MS = 220;
const reducedMotion = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/**
 * Every ride behind some transport rows: the legs with their times (as on the day pages) and the
 * tickets to buy. Opens with a rise-and-fade, closes the same way in reverse.
 */
export function RideDialog({ list, onClose }: { list: RideList | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const closing = useRef(false);

  useEffect(() => {
    const d = ref.current;
    if (!d || !list) return;
    closing.current = false;
    d.classList.remove("is-closing");
    if (d.open) return;
    if (d.showModal) d.showModal();
    else d.setAttribute("open", "");
  }, [list]);

  function close() {
    const d = ref.current;
    if (!d || closing.current) return;
    closing.current = true;
    const done = () => {
      d.classList.remove("is-closing");
      if (d.close) d.close();
      else d.removeAttribute("open");
      onClose();
    };
    if (reducedMotion()) return done();
    d.classList.add("is-closing");
    setTimeout(done, CLOSE_MS);
  }

  return (
    <dialog
      ref={ref}
      className="j-dialog j-ride"
      aria-labelledby="ride-t"
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      {list && (
        <>
          <div className="j-dialog__head">
            <Icon name="ticket" size={19} style={{ color: "var(--c-rose-ink)" }} />
            <h2 id="ride-t">{list.title}：搭乘時間與票券</h2>
            <button type="button" className="j-btn j-btn--ghost" onClick={close}>
              關閉
            </button>
          </div>
          <div className="j-dialog__body">
            {list.rows.map((row, i) => {
              const ride = rideOf(row.id);
              return (
                <section key={row.id} className="j-ride__item" style={{ animationDelay: `${60 + i * 40}ms` }}>
                  <header className="j-ride__head">
                    <h3>{row.item}</h3>
                    <span className="j-num">{row.low !== undefined && row.high !== undefined ? yenRange(row.low, row.high) : "未填"}</span>
                  </header>
                  {ride ? (
                    <>
                      <p className="j-ride__day">
                        Day {ride.dayN}・{ride.date}
                      </p>
                      {ride.legs.length > 0 && <JournalTimeline items={ride.legs} />}
                      {ride.tickets.length > 0 && (
                        <ul className="j-booking">
                          {ride.tickets.map((b) => (
                            <li key={b.item}>
                              <span className="j-booking__item">{b.item}</span>
                              {b.price && <span className="j-booking__price">{b.price}</span>}
                              <span className="j-booking__how">
                                {b.included ? (
                                  <Sticker tone="rose">已含</Sticker>
                                ) : b.booked ? (
                                  <Sticker tone="sage">已訂好</Sticker>
                                ) : b.reserve ? (
                                  <Sticker tone="maple">要預約</Sticker>
                                ) : (
                                  <Sticker tone="sage">現場</Sticker>
                                )}
                                <span>{b.how}</span>
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <p className="j-ride__day">{row.note ?? "行程頁沒有這段的時刻，搭乘當天現場買票。"}</p>
                  )}
                </section>
              );
            })}
          </div>
        </>
      )}
    </dialog>
  );
}
