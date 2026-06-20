import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
export default function News() {

const news = [
"Nvidia Surges On AI Demand",
"Microsoft Expands AI Services",
"Apple Launches New AI Features",
"Tesla Reports Strong EV Sales",
"Google Invests In AI Infrastructure",
"Meta Introduces New AI Products"
];

return (

<div className="min-h-screen bg-gray-100">

<Navbar />

<div className="p-8">

<h1 className="text-4xl font-bold text-green-600 mb-8">
Market News
</h1>

<div className="space-y-4">

{news.map((item,index)=>(

<div
key={index}
className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition"
>

<h2 className="text-xl font-bold">
{item}
</h2>

<p className="text-gray-500 mt-2">
Latest market update and AI-driven stock movement.
</p>

</div>

))}

</div>

</div>
<Footer />
</div>

);

}