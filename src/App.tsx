import { useEffect } from "react";
import {
  HashRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { ChecklistPage } from "./pages/ChecklistPage";
import { JournalChecklistPage } from "./pages/JournalChecklistPage";
import { ExpensesPage } from "./pages/ExpensesPage";
import { ItineraryPage } from "./pages/ItineraryPage";
import { DayPage } from "./pages/DayPage";
import { HomePage } from "./pages/HomePage";

const TITLES: Record<string, string> = {
  "/": "初冬北陸信州 7日旅",
  "/classic": "初冬北陸信州 7日旅",
  "/checklist": "行前清單・初冬北陸信州 7日旅",
  "/expenses": "旅費總覽・初冬北陸信州 7日旅",
  "/classic/checklist": "初冬北陸信州 7日旅 清單",
};

function PageEffects() {
  const { pathname } = useLocation();
  useEffect(() => {
    const day = pathname.match(/^\/day\/(\d)/)?.[1];
    document.title = day
      ? `Day ${day}・初冬北陸信州 7日旅`
      : (TITLES[pathname] ?? TITLES["/"]);
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <HashRouter>
      <PageEffects />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/day/:n" element={<DayPage />} />
        <Route path="/classic" element={<ItineraryPage />} />
        <Route path="/checklist" element={<JournalChecklistPage />} />
        <Route path="/expenses" element={<ExpensesPage />} />
        <Route path="/classic/checklist" element={<ChecklistPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}
