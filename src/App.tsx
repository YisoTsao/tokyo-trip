import { useEffect } from "react";
import {
  HashRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { ChecklistPage } from "./pages/ChecklistPage";
import { ItineraryPage } from "./pages/ItineraryPage";

const TITLES: Record<string, string> = {
  "/": "初冬北陸信州 7日旅",
  "/checklist": "初冬北陸信州 7日旅 清單",
};

function PageEffects() {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = TITLES[pathname] ?? TITLES["/"];
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <HashRouter>
      <PageEffects />
      <Routes>
        <Route path="/" element={<ItineraryPage />} />
        <Route path="/checklist" element={<ChecklistPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}
