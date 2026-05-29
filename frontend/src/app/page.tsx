"use client";

import axios from "axios";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import FeeChart from "@/components/FeeChart";

// Dynamic Map Import
const MapComponent = dynamic(
  () => import("@/components/MapComponent"),
  {
    ssr: false,
  }
);

export default function Home() {

  const [fees, setFees] = useState<any[]>([]);
  const [selectedBank, setSelectedBank] = useState("All");

  useEffect(() => {

    axios
      .get("http://127.0.0.1:8000/api/fees")
      .then((res) => {

        setFees(res.data);

      })
      .catch((err) => {

        console.log(err);

      });

  }, []);


  // FILTER DATA

  const filteredFees =
    selectedBank === "All"
      ? fees
      : fees.filter(
          (item) =>
            item.bank === selectedBank
        );


  // DYNAMIC REGIONAL AVERAGE

  const regionalAverage =
    filteredFees.length > 0
      ? Math.round(

          filteredFees.reduce(
            (sum, item) =>
              sum + item.fee,
            0
          ) / filteredFees.length

        )
      : 0;


  // DOWNLOAD DATA

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
      document.createElement("a");

    link.href = dataStr;

    link.download =
      "bank_fee_data.json";

    link.click();

  };


  return (

    <div className="flex h-screen bg-[#030712] text-white">

      {/* MAP */}

      <div className="w-[70%]">

        <MapComponent
          fees={filteredFees}
        />

      </div>


      {/* SIDEBAR */}

      <div className="w-[30%] bg-[#0B1117] p-6 overflow-y-auto">

        {/* TITLE */}

        <h1 className="text-3xl font-bold text-cyan-400 mb-2">

          Real Rails

        </h1>

        <p className="text-gray-400 mb-6">

          Real-time banking fee infrastructure intelligence

        </p>


        {/* FILTER */}

        <div className="border border-gray-800 rounded-xl p-4 mb-6">

          <h2 className="text-lg font-semibold mb-3">

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


            {fees.map(
              (item,index)=>(

                <option

                  key={index}

                  value={item.bank}

                >

                  {item.bank}

                </option>

              )
            )}

          </select>

        </div>


        {/* ANALYTICS */}

        <div className="border border-gray-800 rounded-xl p-4 mb-6">

          <h2 className="text-lg font-semibold mb-4">

            Fee Comparison Analytics

          </h2>

          <FeeChart
            fees={filteredFees}
          />

        </div>


        {/* METRIC */}

        <div className="border border-gray-800 rounded-xl p-4 mb-6">

          <h2 className="text-lg font-semibold mb-2">

            Regional Average

          </h2>

          <p className="text-4xl font-bold text-cyan-400">

            ₹{regionalAverage}

          </p>

          <p className="text-gray-500 mt-2">

            Cross-bank transfer benchmark

          </p>

        </div>


        {/* WHY */}

        <div className="border border-gray-800 rounded-xl p-4 mb-6">

          <h2 className="text-lg font-semibold mb-3">

            Why This Matters

          </h2>

          <p className="text-gray-400">

            High transfer fees increase remittance friction
            across banking corridors.

          </p>

        </div>


        {/* CONTROL */}

        <div className="border border-gray-800 rounded-xl p-4 mb-6">

          <h2 className="text-lg font-semibold mb-3">

            Who Controls The Rail

          </h2>

          <p className="text-gray-400">

            Large banking institutions dominate payment
            infrastructure and influence pricing.

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
          hover:opacity-90
          "

        >

          Download Sample Data

        </button>


        {/* BANK CARDS */}

        <div className="space-y-4">

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

                <h2 className="text-xl font-semibold text-cyan-400">

                  {item.bank}

                </h2>

                <p className="text-gray-400">

                  {item.city}

                </p>

                <p className="mt-2">

                  Fee: ₹{item.fee}

                </p>

                <p className="text-sm text-gray-500 mt-1">

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