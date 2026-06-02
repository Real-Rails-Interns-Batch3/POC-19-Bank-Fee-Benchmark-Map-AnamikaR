"use client";

import axios from "axios";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import FeeChart from "@/components/FeeChart";

const MapComponent = dynamic(
  () => import("@/components/MapComponent"),
  {
    ssr: false,
  }
);

export default function Home() {

  const [fees, setFees] = useState<any[]>([]);

  const [selectedBank, setSelectedBank] =
    useState("All");

  const [selectedFeeType, setSelectedFeeType] =
    useState("All");


  useEffect(() => {

    const fetchData = () => {

      axios

        .get(
          "http://127.0.0.1:8000/api/fees"
        )

        .then((res) => {

          setFees(
            res.data
          );

        })

        .catch(console.log);

    };

    fetchData();

    const interval =
      setInterval(
        fetchData,
        10000
      );

    return () =>
      clearInterval(
        interval
      );

  }, []);


  /* FILTER LOGIC */

  const filteredFees = fees.filter((item) => {

    const bankMatch =

      selectedBank === "All" ||

      item.bank === selectedBank;


    const feeTypeMatch =

      selectedFeeType === "All" ||

      item.fee_type?.trim() ===
      selectedFeeType;


    return (
      bankMatch &&
      feeTypeMatch
    );

  });


  /* REGIONAL AVERAGE */

  const regionalAverage =

    filteredFees.length > 0

      ?

      Math.round(

        filteredFees.reduce(

          (sum, item) =>

            sum + item.fee,

          0

        )

        /

        filteredFees.length

      )

      : 0;


  /* DOWNLOAD */

  const downloadData = () => {

    const dataStr =

      "data:text/json;charset=utf-8," +

      encodeURIComponent(

        JSON.stringify(

          filteredFees,

          null,

          2

        )

      );

    const link =
      document.createElement(
        "a"
      );

    link.href =
      dataStr;

    link.download =
      "bank_fee_data.json";

    link.click();

  };


  return (

<div className="
flex
h-screen
bg-[#030712]
text-white
">

{/* LEFT PANEL */}

<div className="
w-[70%]
flex
flex-col
">

<div className="
p-6
border-b
border-gray-800
">

<h1 className="
text-4xl
font-bold
text-cyan-400
">

Bank Fee Benchmark Map

</h1>

<p className="
text-gray-400
mt-2
">

Real-time banking fee infrastructure visualization

</p>

</div>


<div className="flex-1">

<MapComponent

fees={filteredFees}

/>

</div>

</div>


{/* SIDEBAR */}

<div className="
w-[30%]
bg-[#0B1117]
p-6
overflow-y-auto
">

<h1 className="
text-3xl
font-bold
text-cyan-400
mb-2
">

Real Rails

</h1>

<p className="
text-gray-400
mb-6
">

Real-time banking fee infrastructure intelligence

</p>


{/* BANK FILTER */}

<div className="
border
border-gray-800
rounded-xl
p-4
mb-6
">

<h2 className="
text-lg
font-semibold
mb-3
">

Filter By Bank

</h2>

<select

className="
w-full
p-3
rounded-lg
bg-[#111827]
border
border-gray-700
"

value={selectedBank}

onChange={(e)=>

setSelectedBank(
e.target.value
)

}

>

<option value="All">

All Banks

</option>

{[

...new Set(

fees.map(
(item)=>
item.bank
)

)

].map(

(bank,index)=>(

<option

key={index}

value={bank}

>

{bank}

</option>

)

)}

</select>

</div>



{/* FEE FILTER */}

<div className="
border
border-gray-800
rounded-xl
p-4
mb-6
">

<h2 className="
text-lg
font-semibold
mb-3
">

Filter By Fee Type

</h2>

<select

className="
w-full
p-3
rounded-lg
bg-[#111827]
border
border-gray-700
"

value={selectedFeeType}

onChange={(e)=>

setSelectedFeeType(
e.target.value
)

}

>

<option value="All">

All Types

</option>

{[

...new Set(

fees

.filter(
(item)=>
item.fee_type
)

.map(
(item)=>
item.fee_type.trim()
)

)

].map(

(type,index)=>(

<option

key={index}

value={type}

>

{type}

</option>

)

)}

</select>

</div>



{/* ANALYTICS */}

<div className="
border
border-gray-800
rounded-xl
p-4
mb-6
">

<h2 className="
text-lg
font-semibold
mb-4
">

Fee Comparison Analytics

</h2>

<FeeChart

fees={filteredFees}

/>

</div>



{/* METRIC */}

<div className="
border
border-gray-800
rounded-xl
p-4
mb-6
">

<h2 className="
text-lg
font-semibold
mb-2
">

Regional Average

</h2>

<p className="
text-4xl
font-bold
text-cyan-400
">

₹{regionalAverage}

</p>

</div>



{/* DOWNLOAD */}

<button

onClick={downloadData}

className="
w-full
bg-cyan-400
text-black
font-semibold
p-3
rounded-xl
mb-6
"

>

Download Sample Data

</button>



{/* BANK CARDS */}

<div className="
space-y-4
">

{filteredFees.map(

(item,index)=>(

<div

key={index}

className="
border
border-gray-800
rounded-xl
p-4
bg-[#111827]
"

>

<h2 className="
text-xl
font-semibold
text-cyan-400
">

{item.bank}

</h2>

<p>

{item.city}

</p>

<p>

Fee: ₹{item.fee}

</p>

<p className="
text-gray-500
text-sm
">

{item.fee_type}

</p>

<p className="
text-gray-500
text-sm
">

{item.status}

</p>

</div>

)

)}

</div>

</div>

</div>

);

}