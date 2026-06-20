import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md border-b px-8 py-4 flex justify-between items-center">

      <div className="flex items-center gap-10">

        <div className="flex items-center gap-3">
  <img
    src="/predix-logo.jpg"
    alt="PrediX"
className="h-16 w-16 object-contain rounded-lg"  />

  <div>
    <h1 className="text-3xl font-black text-green-600 tracking-wide">
  PrediX
</h1>

    <p className="text-xs text-gray-500">
      AI Stock Forecasting Platform
    </p>
  </div>
</div>
</div>

      <div className="flex gap-6">

        <button onClick={() => navigate("/dashboard")} className="hover:text-green-600">
          Dashboard
        </button>

        <button onClick={() => navigate("/explore")} className="hover:text-green-600">
          Explore
        </button>

        <button onClick={() => navigate("/markets")} className="hover:text-green-600">
          Markets
        </button>

        <button onClick={() => navigate("/news")} className="hover:text-green-600">
          News
        </button>

        <button onClick={() => navigate("/insights")} className="hover:text-green-600">
          AI Insights
        </button>

        <button onClick={() => navigate("/portfolio")} className="hover:text-green-600">
          Portfolio
        </button>

      </div>

    </nav>
  );
}