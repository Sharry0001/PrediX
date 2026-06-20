import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./Signup";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Explore from "./Explore";
import Markets from "./Markets";
import Portfolio from "./Portfolio";
import News from "./News";
import AIInsights from "./AIInsights";
function Home() {
  return (
<div className="relative min-h-screen flex items-center justify-center overflow-hidden">
  {/* Background Image */}

<div
  className="absolute inset-0 bg-cover bg-center blur-sm scale-110"
  style={{
    backgroundImage: "url('/grow-bg.jpg')"
  }}
></div>

{/* Dark Overlay */}

<div className="absolute inset-0 bg-black/50"></div>
<div className="relative z-10 bg-white/95 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-[450px]">
<h1 className="text-5xl font-extrabold text-center text-green-600 mb-2">
  PrediX
  </h1>

     <p className="text-center text-gray-600 mb-8">
  AI Powered Stock Forecasting Platform
</p>

        <Signup />

        <hr className="my-6" />

        <Login />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/dashboard" element={<Dashboard />} />

  <Route path="/explore" element={<Explore />} />
  <Route path="/markets" element={<Markets />} />
  <Route path="/portfolio" element={<Portfolio />} />
  <Route path="/news" element={<News />} />
  <Route path="/insights" element={<AIInsights />} />

</Routes>
    </BrowserRouter>
  );
}