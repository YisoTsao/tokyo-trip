import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { trip } from "../../data/trip";
import { JournalDefs } from "../../illustrations/journal/defs";

const NAV = [
  { to: "/", label: "首頁", match: (p: string) => p === "/" },
  {
    to: "/day/1",
    label: "每日行程",
    match: (p: string) => p.startsWith("/day"),
  },
  {
    to: "/checklist",
    label: "行前清單",
    match: (p: string) => p === "/checklist",
  },
];

export function JournalLayout({
  children,
  belowNav,
}: {
  children: ReactNode;
  belowNav?: ReactNode;
}) {
  const { pathname } = useLocation();
  return (
    <div className="j-page">
      <JournalDefs />
      <header className="j-nav">
        <Link to="/" className="j-nav__brand" aria-label="初冬手帳 首頁">
          <b>初冬手帳</b>
          <span className="j-script" aria-hidden="true">
            winter notes ’26
          </span>
        </Link>
        <nav aria-label="主選單">
          <ul className="j-nav__links">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  aria-current={n.match(pathname) ? "page" : undefined}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      {belowNav}
      <main className="j-main">{children}</main>
      <footer className="j-main j-foot" style={{ paddingTop: 0 }}>
        <p>{trip.foot}</p>
        <p>
          <Link to="/classic">看舊版單頁行程表</Link>
        </p>
      </footer>
    </div>
  );
}
