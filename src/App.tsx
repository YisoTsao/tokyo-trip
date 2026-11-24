import { lazy, Suspense, useEffect } from "react";
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
import { PhrasesPage } from "./pages/PhrasesPage";

const TITLES: Record<string, string> = {
  "/": "初冬北陸信州 7日旅",
  "/classic": "初冬北陸信州 7日旅",
  "/checklist": "行前清單・初冬北陸信州 7日旅",
  "/expenses": "旅費總覽・初冬北陸信州 7日旅",
  "/phrases": "旅途日語會話・初冬北陸信州 7日旅",
  "/n3": "日檢 N3 學習本",
  "/classic/checklist": "初冬北陸信州 7日旅 清單",
};

// The N3 study book is large and unrelated to the trip, so load it only when opened.
const N3Page = lazy(() => import("./pages/N3Page").then((m) => ({ default: m.N3Page })));
const n3 = (
  <Suspense fallback={null}>
    <N3Page />
  </Suspense>
);

function PageEffects() {
  const { pathname } = useLocation();
  useEffect(() => {
    const day = pathname.match(/^\/day\/(\d)/)?.[1];
    document.title = day
      ? `Day ${day}・初冬北陸信州 7日旅`
      : pathname.startsWith("/n3")
        ? TITLES["/n3"]
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
        <Route path="/phrases" element={<PhrasesPage />} />
        <Route path="/n3" element={n3} />
        <Route path="/n3/:tab" element={n3} />
        <Route path="/classic/checklist" element={<ChecklistPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}
