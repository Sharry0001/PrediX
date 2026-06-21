import { useState, useEffect, useRef } from "react";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Footer from "./components/Footer";
const API_URL = "https://sharil0001-predix-backend.hf.space";
function TradingViewChart({ symbol }) {
  const location = useLocation();
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    chartRef.current.innerHTML = "";

    const script = document.createElement("script");

    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";

    script.type = "text/javascript";
    script.async = true;

    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: symbol,
      interval: "D",
      timezone: "Asia/Kolkata",
      theme: "light",
      style: "1",
      locale: "en",
      allow_symbol_change: true,
      hide_top_toolbar: false,
      withdateranges: true,
    });

    chartRef.current.appendChild(script);
  }, [symbol]);

  return (
    <div
      ref={chartRef}
      style={{
        width: "100%",
        height: "450px",
      }}
    />
  );
}

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [stock, setStock] = useState(
location.state?.selectedStock || "AAPL"
);
const [tvSymbol, setTvSymbol] = useState("NASDAQ:AAPL");
useEffect(() => {

  const symbolMap = {

    AAPL: "NASDAQ:AAPL",
    MSFT: "NASDAQ:MSFT",
    GOOGL: "NASDAQ:GOOGL",
    NVDA: "NASDAQ:NVDA",
    AMD: "NASDAQ:AMD",

    V: "NYSE:V",
    MA: "NYSE:MA",
    JPM: "NYSE:JPM",
    GS: "NYSE:GS",

    PFE: "NYSE:PFE",

    "HDFCBANK.NS": "NSE:HDFCBANK",
    "ICICIBANK.NS": "NSE:ICICIBANK",
    "SBIN.NS": "NSE:SBIN",
    "KOTAKBANK.NS": "NSE:HDFCBANK",

    "RELIANCE.NS": "NSE:RELIANCE",

    "ONGC.NS": "NSE:RELIANCE",
    "BPCL.NS": "NSE:RELIANCE",
    "IOC.NS": "NSE:RELIANCE",

    TSLA: "NASDAQ:TSLA",
    F: "NYSE:F",
    GM: "NYSE:GM",

    "TATAMOTORS.NS": "BSE:TATAMOTORS",
    "M&M.NS": "NSE:TATAMOTORS",

    "SUNPHARMA.NS": "NYSE:PFE",
    "DRREDDY.NS": "NYSE:PFE",
    "CIPLA.NS": "NYSE:PFE"

  };

  setTvSymbol(
    symbolMap[stock] || "NASDAQ:AAPL"
  );

}, [stock]);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [marketData,setMarketData]=useState([]);
  const [indices,setIndices]=useState([]);
  const [search,setSearch] = useState("");
  const [chartData, setChartData] = useState(null);
  const email = auth.currentUser?.email || "";

const userName = email
  .split("@")[0]
  .replace(/[0-9]/g, "");

const displayName =
  userName.charAt(0).toUpperCase() +
  userName.slice(1);
  useEffect(() => {

  axios
    .get(`${API_URL}/stock-data/${stock}`)
    .then((res) => {

      setChartData({
        labels: res.data.dates,
        datasets: [
          {
            label: stock,
            data: res.data.prices,
            borderColor: "#16a34a",
            backgroundColor: "#16a34a",
            tension: 0.4,
          },
        ],
      });

    })
    .catch((err) => console.log(err));

}, [stock]);
useEffect(()=>{
  fetchStocks();
},[stock]);

useEffect(()=>{
  fetchIndices();
},[]);
const fetchIndices = async()=>{

const res = await axios.get(
`${API_URL}/indices`
);

setIndices(res.data);

}
  useEffect(() => {
  const saved =
    JSON.parse(
      localStorage.getItem("watchlist")
    ) || [];

  setWatchlist(saved);
}, []);
  
  const logout = async () => {
    await signOut(auth);
    navigate("/");
  };
  
const addToWatchlist = () => {

  if (!watchlist.includes(stock)) {

    const updated = [
      ...watchlist,
      stock
    ];

    setWatchlist(updated);

    localStorage.setItem(
      "watchlist",
      JSON.stringify(updated)
    );
  }
};

const removeFromWatchlist = (ticker) => {

  const updated =
    watchlist.filter(
      (item) => item !== ticker
    );

  setWatchlist(updated);

  localStorage.setItem(
    "watchlist",
    JSON.stringify(updated)
  );
};
const fetchStocks=async()=>{

const res=await axios.get(`${API_URL}/stock-data/${stock}`)
setMarketData(res.data);

};
  const predictStock = async () => {
    try {
      setLoading(true);
      setError("");
const response = await axios.get(
  `https://sharil0001-predix-backend.hf.space/predict/${stock}`
);

      setResult(response.data);
setHistory((prev) => [
  response.data,
  ...prev.slice(0, 4)
]);
   
    }
    catch (error) {
  console.log(error);

  if (error.response?.status === 404) {
    setError("❌ Stock Not Found");

setTimeout(() => {
  setError("");
}, 3000);
  } else {
    setError("⚠️ Backend Connection Error");

setTimeout(() => {
  setError("");
}, 3000);
  }
}
finally {
      setLoading(false);
    }
  };

  
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">

      {/* Navbar */}
     <nav className="bg-white shadow-sm border-b px-8 py-4 flex justify-between items-center">

<div className="flex items-center gap-10">

<div className="flex items-center gap-3">

<img
  src="/predix-logo.jpg"
  alt="PrediX"
  className="h-14 w-14 rounded-lg object-contain"
/>

<div>

<h1 className="text-2xl font-bold text-green-600">
PrediX
</h1>

<p className="text-sm text-gray-500">
AI Stock Forecasting Platform
</p>

</div>

</div>

<div className="flex gap-6 text-gray-600">

<button onClick={() => navigate("/explore")}
className="hover:text-green-600 transition">
Explore
</button>

<button onClick={() => navigate("/markets")}
  className="hover:text-green-600 transition">
Markets
</button>

<button onClick={() => navigate("/news")}
  className="hover:text-green-600 transition">
News
</button>

<button onClick={() => navigate("/insights")}
  className="hover:text-green-600 transition">
AI Insights
</button>

<button onClick={() => navigate("/portfolio")}
  className="hover:text-green-600 transition">
Portfolio
</button>

</div>

</div>

<input
type="text"
placeholder="Search Company or Ticker (Press Enter)"
value={search}
onChange={(e)=>setSearch(e.target.value)}
onKeyDown={(e)=>{
  if(e.key === "Enter") {
    const searchMap = {
      APPLE: "AAPL",
      MICROSOFT: "MSFT",
      GOOGLE: "GOOGL",
      NVIDIA: "NVDA",
      SBI: "SBIN.NS",
      HDFC: "HDFCBANK.NS",
      ICICI: "ICICIBANK.NS",
      CIPLA: "CIPLA.NS",
      PFIZER: "PFE",
      RELIANCE: "RELIANCE.NS",
      ONGC: "ONGC.NS",
      BPCL: "BPCL.NS",
      TESLA: "TSLA"
    };

    const value = search.trim().toUpperCase();

    setStock(searchMap[value] || value);
    setSearch("");
  }
}}
className="border rounded-lg px-4 py-2 w-80"
/>

<button
  onClick={logout}
  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
>
  Logout
</button>
</nav>
<marquee
className="bg-white border-b py-3 text-sm font-medium"
>

{Array.isArray(indices) &&
indices.map((item,index)=>(

<span
key={index}
className="mr-10"
>

{item.name}

{" "}

{item.value}

<span
className={
item.change >= 0
?
"text-green-600 ml-2"
:
"text-red-600 ml-2"
}
>

{item.change}%

</span>

</span>

))}

</marquee>

<div className="px-6 py-4">
<h2 className="text-xl font-bold">
  Welcome back, {displayName} 👋
</h2>
</div>
<h2 className="text-2xl font-bold px-6 mt-4">
Top Movers Today
</h2>
<div className="grid md:grid-cols-4 gap-4 p-6">

{Array.isArray(marketData) &&
marketData
.filter((item)=>
item.ticker
.toLowerCase()
.includes(search.toLowerCase())
)
.map((stock)=>(

<div
key={stock.ticker}
className="bg-white rounded-xl shadow p-5"
>

<h3 className="font-bold text-lg">
{stock.ticker}
</h3>

<p className="text-2xl font-semibold">
₹{stock.price}
</p>

<p
className={
stock.change >= 0
? "text-green-600 font-medium"
: "text-red-600 font-medium"
}
>
{stock.change}%
</p>

</div>

))
}

</div>
      {/* Stats */}
<div className="grid md:grid-cols-3 gap-4 px-6 mb-6">

<div className="bg-white p-4 rounded-lg">
<p className="text-gray-400 text-sm">
Predictions
</p>

<p className="text-2xl font-semibold text-green-600">
{history.length}
</p>
</div>

<div className="bg-white p-4 rounded-lg">
<p className="text-gray-400 text-sm">
Accuracy
</p>

<p className="text-2xl font-semibold text-green-600">
{result?.accuracy || 0}%
</p>
</div>

<div className="bg-white p-4 rounded-lg">
<p className="text-gray-400 text-sm">
Signal
</p>

<p className="text-2xl font-semibold text-green-600">
{result?.signal || "-"}
</p>
</div>

</div>
      {/* Prediction */}
      <div className="bg-white p-6 rounded-xl shadow mx-6">

        <h2 className="text-2xl font-bold mb-4">
          Stock Prediction Dashboard
        </h2>
        {error && (
  <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
    {error}
  </div>
)}
<div className="flex items-center gap-4 mb-6">

  <select
    value={stock}
    onChange={(e) => setStock(e.target.value)}
    className="w-80 p-3 rounded-lg bg-gray-100 border border-gray-300"
  >

    {/* Technology */}
    <option value="AAPL">Apple</option>
    <option value="MSFT">Microsoft</option>
    <option value="GOOGL">Google</option>
    <option value="NVDA">Nvidia</option>
    <option value="AMD">AMD</option>

    {/* Finance */}
    <option value="V">Visa</option>
    <option value="MA">Mastercard</option>
    <option value="JPM">JP Morgan</option>
    <option value="GS">Goldman Sachs</option>

    {/* Healthcare */}
    <option value="SUNPHARMA.NS">Sun Pharma</option>
    <option value="DRREDDY.NS">Dr Reddy's</option>
    <option value="CIPLA.NS">Cipla</option>
    <option value="PFE">Pfizer</option>

    {/* Banking */}
    <option value="HDFCBANK.NS">HDFC Bank</option>
    <option value="ICICIBANK.NS">ICICI Bank</option>
    <option value="SBIN.NS">State Bank of India</option>
    <option value="KOTAKBANK.NS">Kotak Bank</option>

    {/* Energy */}
    <option value="RELIANCE.NS">Reliance</option>
    <option value="ONGC.NS">ONGC</option>
    <option value="BPCL.NS">BPCL</option>
    <option value="IOC.NS">Indian Oil</option>

    {/* Automobile */}
    <option value="TSLA">Tesla</option>
    <option value="F">Ford</option>
    <option value="GM">General Motors</option>
    <option value="TATAMOTORS.NS">Tata Motors</option>
    <option value="M&M.NS">Mahindra & Mahindra</option>

  </select>
<div className="flex gap-4 mb-6">

<button
  onClick={predictStock}
  disabled={loading}
  className="bg-green-600 text-white px-10 py-3 rounded-xl hover:bg-green-700 font-semibold"
>
  Predict Stock
</button>

<button
  onClick={addToWatchlist}
  className="bg-white border-2 border-green-600 text-green-600 px-8 py-3 rounded-xl hover:bg-green-50 font-medium"
>
  Add To Watchlist
</button>
</div>
</div>

        
<div className="grid md:grid-cols-4 gap-6 mt-6">

  {/* LEFT SIDE */}
<div className="bg-white p-6 rounded-xl shadow h-fit min-h-[220px]">

  <h2 className="font-bold text-lg mb-4">
    Prediction Result
  </h2>

  <div className="grid grid-cols-2 gap-4">

    <div>
      <p className="text-gray-500">Ticker</p>
      <p className="font-semibold">
        {result?.ticker || "--"}
      </p>
    </div>

    <div>
      <p className="text-gray-500">Signal</p>
      <p
        className={`font-bold ${
          result?.signal === "BUY"
            ? "text-green-600"
            : result?.signal === "SELL"
            ? "text-red-600"
            : "text-gray-400"
        }`}
      >
        {result?.signal || "--"}
      </p>
    </div>

    <div>
      <p className="text-gray-500">Current Price</p>
      <p className="font-semibold">
        {result ? `₹${result.current_price}` : "--"}
      </p>
    </div>

    <div>
      <p className="text-gray-500">Predicted Price</p>
      <p className="font-semibold">
        {result ? `₹${result.predicted_price}` : "--"}
      </p>
    </div>

  </div>

</div>

<div className="md:col-span-2 bg-white p-4 rounded-xl shadow">
  <p className="mb-2 text-red-600 font-bold">
{tvSymbol}
</p>
  <TradingViewChart symbol={tvSymbol} />
</div>

  {/* RIGHT SIDE */}
<div className="md:col-span-1">
    <div className="bg-white p-4 rounded-xl shadow mb-4">

      <h2 className="font-bold text-lg mb-3">
        Watchlist
      </h2>

      {watchlist.length === 0 ? (
        <p>No Stocks Added</p>
      ) : (
        watchlist.map((item,index)=>(
          <div
            key={index}
            className="border-b py-2 flex justify-between"
          >
            <span
onClick={() => {

  setStock(item);

  setTimeout(() => {
    predictStock();
  }, 500);

}}  className="cursor-pointer hover:text-green-600"
>
  {item}
</span>

            <button
              onClick={()=>removeFromWatchlist(item)}
              className="text-red-500"
            >
              X
            </button>
          </div>
        ))
      )}

    </div>

    <div className="bg-white p-4 rounded-xl shadow">

      <h2 className="font-bold text-lg mb-3">
        Recent Predictions
      </h2>

      {history.length === 0 ? (
        <p>No Predictions</p>
      ) : (
        history.map((item,index)=>(
          <div
            key={index}
            className="border-b py-2"
          >
            {item.ticker} → ₹{item.predicted_price}
          </div>
        ))
      )}

    </div>

  </div>

</div>
</div>   

  <Footer />

 </div>
  );
}