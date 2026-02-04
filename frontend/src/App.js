import "@/index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "@/pages/HomePage";
import MarkdownPage from "@/pages/MarkdownPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Homepage */}
        <Route path="/" element={<HomePage />} />
        
        {/* Dynamic markdown pages - all content pages use this route */}
        <Route path="/pages/:pageId" element={<MarkdownPage />} />
        
        {/* Catch-all for 404 */}
        <Route path="*" element={<MarkdownPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
