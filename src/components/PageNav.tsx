import { NavLink } from "react-router-dom";

export function PageNav() {
  return (
    <nav className="pagenav" aria-label="頁面">
      <NavLink to="/classic" end className={() => ""}>
        行程表
      </NavLink>
      <NavLink to="/classic/checklist" className={() => ""}>
        預訂與行李清單
      </NavLink>
    </nav>
  );
}
