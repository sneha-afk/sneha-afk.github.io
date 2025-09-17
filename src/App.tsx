import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  HomePage,
  ResumePage,
  Error404Page,
  BlogPost,
  BlogIndex,
  ProjectPage,
} from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/posts" element={<BlogIndex />} />
        <Route path="/posts/:slug" element={<BlogPost />} />
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </Router>
  );
}

export default App;
