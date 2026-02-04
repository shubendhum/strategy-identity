import "@/index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "@/pages/HomePage";
import WhyChangePage from "@/pages/WhyChangePage";
import WhatIsChangingPage from "@/pages/WhatIsChangingPage";
import SecurityPage from "@/pages/SecurityPage";
import BusinessPage from "@/pages/BusinessPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/why-change" element={<WhyChangePage />} />
        <Route path="/what-is-changing" element={<WhatIsChangingPage />} />
        <Route path="/security" element={<SecurityPage />} />
        <Route path="/business" element={<BusinessPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
