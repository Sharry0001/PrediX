import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function AIInsights() {

return (

<div className="min-h-screen bg-gray-100">

<Navbar />

<div className="p-8">

<h1 className="text-4xl font-bold text-green-600 mb-8">
AI Insights
</h1>

<div className="grid md:grid-cols-2 gap-6">

<div className="bg-green-50 border border-green-200 rounded-2xl p-6 shadow-lg">

<h2 className="text-2xl font-bold text-green-700 mb-4">
Buy Signals
</h2>

<ul className="space-y-3 text-lg">

<li>🟢 Apple</li>
<li>🟢 Microsoft</li>
<li>🟢 Google</li>
<li>🟢 Nvidia</li>

</ul>

</div>

<div className="bg-red-50 border border-red-200 rounded-2xl p-6 shadow-lg">

<h2 className="text-2xl font-bold text-red-700 mb-4">
Sell Signals
</h2>

<ul className="space-y-3 text-lg">

<li>🔴 Tesla</li>
<li>🔴 Intel</li>
<li>🔴 PayPal</li>

</ul>

</div>

</div>

<div className="bg-white rounded-2xl shadow-lg p-8 mt-8">

<h2 className="text-2xl font-bold mb-4">
AI Confidence Score
</h2>

<p className="text-5xl text-green-600 font-bold">
92%
</p>

<p className="text-gray-500 mt-4">
Current Market Sentiment : Bullish
</p>

</div>

</div>
<Footer />
</div>

);

}