import { useState } from "react";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
export default function Explore() {
const navigate = useNavigate();
const sectors = {

Technology:[
"AAPL",
"MSFT",
"GOOGL",
"NVDA",
"AMD"
],

Finance:[
"V",
"MA",
"JPM",
"GS"
],

Healthcare:[
"SUNPHARMA.NS",
"DRREDDY.NS",
"CIPLA.NS",
"PFE"
],

Banking:[
"HDFCBANK.NS",
"ICICIBANK.NS",
"SBIN.NS",
"KOTAKBANK.NS"
],

Energy:[
"RELIANCE.NS",
"ONGC.NS",
"BPCL.NS",
"IOC.NS"
],

Automobile:[
"TSLA",
"F",
"GM",
"TATAMOTORS.NS",
"M&M.NS"
]

};

const [selected,setSelected] =
useState(null);

return (

<div className="min-h-screen bg-gray-50 flex flex-col">

  <Navbar />

  <div className="flex-grow p-8">

    <h1 className="text-4xl font-bold text-green-600 mb-8">
      Explore Sectors
    </h1>

    <div className="grid md:grid-cols-3 gap-6">

      {Object.keys(sectors).map((sector,index)=>(

        <div
          key={index}
          onClick={()=>setSelected(sector)}
          className="bg-white p-6 rounded-xl shadow cursor-pointer hover:shadow-lg transition"
        >

          <h2 className="text-2xl font-bold">
            {sector}
          </h2>

          <p className="text-gray-500 mt-2">
            Click to view stocks
          </p>

        </div>

      ))}

    </div>

    {selected && (

      <div className="bg-white mt-10 p-6 rounded-xl shadow">

        <h2 className="text-2xl font-bold text-green-600 mb-4">
          {selected} Stocks
        </h2>

        <div className="grid md:grid-cols-4 gap-4">

          {sectors[selected].map((stock,index)=>(

            <div
              key={index}
              onClick={() =>
                navigate("/dashboard", {
                  state: {
                    selectedStock: stock
                  }
                })
              }
              className="
              border p-4 rounded-lg
              text-center font-semibold
              cursor-pointer
              hover:bg-green-50
              hover:border-green-500
              hover:scale-105
              transition
              "
            >
              {stock}
            </div>

          ))}

        </div>

      </div>

    )}

  </div>

  <Footer />

</div>

);
}