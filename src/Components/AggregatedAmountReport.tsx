import { useEffect, useState } from "react";
import TableWithStripedRows from "./UI/TableWithStripedRowsProps";
import { supabase } from "../utils/supabase";

type AggregatedAmount = {
  bloodType: string;
  totalquantity: string;
  
}

export default function AggregatedAmountReport() {
  const [aggregatedAmount , setAggregatedAmount] = useState<AggregatedAmount[]>([])


  useEffect(() => {
    getAggregatedAmount()
  },[])

  const getAggregatedAmount =async () => {
    const {data , error} = await supabase
    .from('aggregatedreport')
    .select()

    if (data){
       setAggregatedAmount(
        data.map(e => ({bloodType: e.bloodType, totalquantity: e.totalquantity}))
       )
    }
  }



  return (
    <main className="bg-[#f7f7f7] min-h-screen w-full flex flex-col items-center justify-center">
      <div className="mb-24">
        <h1 className=" tracking-tight text-center font-roboto text-[#121212] mb-8 text-4xl font-extrabold leading-tight lg:text-5xl ">
          The aggregated amount available for each blood type
        </h1>
      </div>
      <div className="w-2/3">
        <TableWithStripedRows
          headers={["Blood Type", "Available Amount (Liters)"]}
          rows={aggregatedAmount}
        />
      </div>
    </main>
  );
}
