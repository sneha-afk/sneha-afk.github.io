import { Route, BrowserRouter as Router, Routes, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import * as P from "@pages";
import PageTransition from "@components/ui/PageTransition";

const ROUTE_CONFIG = [
  { path: "/",         element: <P.HomePage /> },
  { path: "/home",     element: <Navigate to="/" replace /> },
  { path: "/resume",   element: <P.ResumePage /> },
  { path: "/projects", element: <P.ProjectsPage /> },
  { path: "/blog",     element: <P.BlogIndex /> },
  { path: "/blog/:slug", element: <P.BlogPost /> },
  { path: "*",         element: <P.NotFoundPage /> },
];

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {ROUTE_CONFIG.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={<PageTransition>{element}</PageTransition>}
          />
        ))}
      </Routes>
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}
