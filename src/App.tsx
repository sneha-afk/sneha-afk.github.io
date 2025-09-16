import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage, ResumePage, Error404Page } from "./pages";

function App() {
  // const links = [{ label: "Home", href: "/" }];

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </Router>
  );
}

export default App;
