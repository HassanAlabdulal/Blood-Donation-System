import { useEffect, useState } from "react";
import TableWithStripedRows from "./UI/TableWithStripedRowsProps";
import { supabase } from "../utils/supabase";

type BloodDonation = {
  donorID: string;
  full_name:string;
  donationDate: string;
}


export default function BloodDonationsReport() {

  const [bloodDonations, setBloodDonations] = useState<BloodDonation[]>([])



  useEffect(() => {
    getBloodDonations()
  })

  const getBloodDonations =async () => {
    const {data , error} = await supabase
    .from('donationspermonthreport')
    .select()

    if ( data ){
      setBloodDonations(
        data.map(e => ({
          donorID: e.donorID,
          full_name: e.full_name,
          donationDate: e.donationDate,
        }))
      )
     
    }
  }


  return (
    <main className="bg-[#f7f7f7] min-h-screen w-full flex flex-col items-center justify-center">
      <div className="mb-24">
        <h1 className=" tracking-tight text-center font-roboto text-[#121212] mb-8 text-4xl font-extrabold leading-tight lg:text-5xl ">
          All blood donations received in the last month
        </h1>
      </div>
      <div className="w-2/3">
        <TableWithStripedRows
          headers={["ID", "Name", "Received Date"]}
          rows={bloodDonations}
        />
      </div>
    </main>
  );
}
