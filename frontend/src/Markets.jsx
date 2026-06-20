import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
export default function Markets() {

const indices = [
{
name:"NIFTY 50",
value:"24,013",
change:"-0.64%"
},
{
name:"SENSEX",
value:"76,802",
change:"-0.78%"
},
{
name:"BANKNIFTY",
value:"57,685",
change:"-0.48%"
},
{
name:"FINNIFTY",
value:"26,431",
change:"+0.22%"
}
];

return (

<div className="min-h-screen bg-gray-100">

<Navbar />

<div className="p-8">

<h1 className="text-4xl font-bold text-green-600 mb-8">
Market Overview
</h1>

<div className="grid md:grid-cols-4 gap-6">

{indices.map((item,index)=>(

<div
key={index}
className="bg-white rounded-2xl shadow-lg p-6"
>

<h2 className="text-gray-500 mb-2">
{item.name}
</h2>

<p className="text-4xl font-bold">
{item.value}
</p>

<p
className={
item.change.includes("+")
?
"text-green-600 font-semibold mt-2"
:
"text-red-600 font-semibold mt-2"
}
>
{item.change}
</p>

</div>

))}

</div>

<div className="bg-white rounded-2xl shadow-lg p-8 mt-8">

<h2 className="text-2xl font-bold mb-4">
Today's Market Summary
</h2>

<p className="text-gray-600 leading-8">
Technology stocks remain strong while banking stocks
show mixed performance. AI companies continue to
attract investor attention.
</p>

</div>

</div>
  <Footer />

</div>

);

}