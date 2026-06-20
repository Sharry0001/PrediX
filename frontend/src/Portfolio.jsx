import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
export default function Portfolio() {

return (

<div className="min-h-screen bg-gray-100">

<Navbar />

<div className="p-8">

<h1 className="text-4xl font-bold text-green-600 mb-8">
Portfolio
</h1>

<div className="grid md:grid-cols-3 gap-6">

<div className="bg-white p-6 rounded-2xl shadow-lg">
<h2 className="text-gray-500">
Total Investment
</h2>
<h1 className="text-4xl font-bold mt-2">
₹1,20,000
</h1>
</div>

<div className="bg-white p-6 rounded-2xl shadow-lg">
<h2 className="text-gray-500">
Current Value
</h2>
<h1 className="text-4xl font-bold mt-2">
₹1,38,500
</h1>
</div>

<div className="bg-white p-6 rounded-2xl shadow-lg">
<h2 className="text-gray-500">
Profit
</h2>
<h1 className="text-4xl text-green-600 font-bold mt-2">
₹18,500
</h1>
</div>

</div>

<div className="bg-white rounded-2xl shadow-lg p-8 mt-8">

<h2 className="text-2xl font-bold mb-4">
Holdings
</h2>

<table className="w-full">

<thead>

<tr className="border-b">

<th className="text-left py-3">
Stock
</th>

<th className="text-left py-3">
Quantity
</th>

<th className="text-left py-3">
Profit/Loss
</th>

</tr>

</thead>

<tbody>

<tr>
<td className="py-3">AAPL</td>
<td>10</td>
<td className="text-green-600">+₹4,500</td>
</tr>

<tr>
<td className="py-3">MSFT</td>
<td>5</td>
<td className="text-green-600">+₹2,100</td>
</tr>

<tr>
<td className="py-3">GOOGL</td>
<td>8</td>
<td className="text-green-600">+₹3,400</td>
</tr>

</tbody>

</table>

</div>

</div>
<Footer />
</div>

);

}