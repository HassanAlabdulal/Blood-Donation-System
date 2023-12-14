import { useEffect, useState } from "react";
import TableWithStripedRows from "./UI/TableWithStripedRowsProps";
import { supabase } from "../utils/supabase";

type PaymentsReports = {
  full_name: string;
  deliveryCost: string;
  paymentDate: string
}

export default function PaymentsReport() {

  const [paymentsReports , setPaymentsReports] = useState<PaymentsReports[]>([]);

  useEffect(() => {
    getPaymentsReports()
  })

  const getPaymentsReports =async () => {
    const {data , error} = await supabase
    .from('paymentsreport')
    .select()

    if ( data ){
      setPaymentsReports(
        data.map(e => ({
          full_name: e.full_name,
          deliveryCost: e.deliveryCost,
          paymentDate: e.paymentDate,
        }))
      )
    }
  }

  return (
    <main className="bg-[#f7f7f7] min-h-screen w-full flex flex-col items-center justify-center">
      <div className="mb-24">
        <h1 className=" tracking-tight text-center font-roboto text-[#121212] mb-8 text-4xl font-extrabold leading-tight lg:text-5xl ">
          All Payments that have been confirmed as completed
        </h1>
      </div>
      <div className="w-2/3">
        <TableWithStripedRows
          headers={["Recipient Name", "Amount (USD)", "Confirmation Date"]}
          rows={paymentsReports}
        />
      </div>
    </main>
  );
}
