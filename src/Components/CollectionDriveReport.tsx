import { useEffect, useState } from "react";
import TableWithStripedRows from "./UI/TableWithStripedRowsProps";
import { supabase } from "../utils/supabase";

type CollectionDrive = {
  title: string;
  totalblood: string;
}
export default function CollectionDriveReport() {

  const [collectionDriveReport , setCollectionDriveReport] = useState<CollectionDrive[]>([])

  useEffect(() => {
    getCollectionDriveReport()
  })

  const getCollectionDriveReport =async () => {
    const {data , error} = await supabase
    .from('bloodcollecteddrive')
    .select()

    if ( data ){
      setCollectionDriveReport(
        data.map(e => ({
          title: e.title,
          totalblood: e.totalblood
        }))
      )
     
    }
  }

  return (
    <main className="bg-[#f7f7f7] min-h-screen w-full flex flex-col items-center justify-center">
      <div className="mb-24">
        <h1 className=" tracking-tight text-center font-roboto text-[#121212] mb-8 text-4xl font-extrabold leading-tight lg:text-5xl ">
          Total blood collected during each drive
        </h1>
      </div>
      <div className="w-2/3">
        <TableWithStripedRows
          headers={["Collection Drive", "Total Blood (Liters)"]}
          rows={collectionDriveReport}
        />
      </div>
    </main>
  );
}
