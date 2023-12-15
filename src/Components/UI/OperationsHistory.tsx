// import React from "react";

// interface Operation {
//   type: string;
//   toFrom: string;
//   date: string;
// }

// interface OperationsHistoryProps {
//   data: Operation[];
// }

// const OperationsHistory: React.FC<OperationsHistoryProps> = ({ data }) => {
//   return (
//     <div className="bg-[#f7f7f7] w-full justify-center flex flex-col items-center">
//       <div className="w-1/2 p-8 m-6 space-y-8 overflow-hidden bg-white rounded-lg shadow-lg ">
//         <h1 className="text-2xl font-semibold text-center text-gray-900">
//           Operations History
//         </h1>
//         <table className="w-full text-left">
//           <thead>
//             <tr>
//               <th className="px-4 py-2 text-center bg-gray-100 border-b-2 border-gray-200">
//                 Type
//               </th>
//               <th className="px-4 py-2 text-center bg-gray-100 border-b-2 border-gray-200">
//                 To/From
//               </th>
//               <th className="px-4 py-2 text-center bg-gray-100 border-b-2 border-gray-200">
//                 Date
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((operation, index) => (
//               <tr key={index}>
//                 <td className="px-4 py-2 text-center border-b border-gray-200">
//                   {operation.type}
//                 </td>
//                 <td className="px-4 py-2 text-center border-b border-gray-200">
//                   {operation.toFrom}
//                 </td>
//                 <td className="px-4 py-2 text-center border-b border-gray-200">
//                   {operation.date}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default OperationsHistory;

import React, { useState, useEffect } from "react";
import { supabase } from "../../utils/supabase";

// Define the type for a single operation
interface Operation {
  type: string;
  toFrom: string;
  date: string;
}

export default function OperationsHistory({id}:{id: string}) {

  const [operationsHistory, setOperationsHistory] = useState<Operation[]>();
  const [isRecipient , setIsRecipient ] = useState(false);



  useEffect(() => {
    getIsRecipient()
    getOperationsHistory()
  });

  const getIsRecipient =async () => {
    const {data , error} = await supabase
    .from("Recipient")
    .select()
    .eq("PatientId", id)
    if ( data ){ if ( data.length>0 ){setIsRecipient(true)} }
  }

  const getOperationsHistory =async () => {
    const {data, error} = await supabase
    .from('operationshistory')
    .select()
    .eq(isRecipient ? 'recipientID': 'donorID' , id)

    if ( data ){
      setOperationsHistory(
        data.map(e => ({
          type : isRecipient ? 'Recipient': 'Donate',
          toFrom : isRecipient ? e.donor_full_name: e.recipient_full_name,
          date : e.donationDate
        }))
      )
    }
  }

  return (
    <div className="bg-[#f7f7f7] w-full justify-center flex flex-col items-center">
      <div className="w-1/2 p-8 m-6 space-y-8 overflow-hidden bg-white rounded-lg shadow-lg ">
        <h1 className="text-2xl font-semibold text-center text-gray-900">
          Operations History
        </h1>
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="px-4 py-2 text-center bg-gray-100 border-b-2 border-gray-200">
                Type
              </th>
              {isRecipient && (<th className="px-4 py-2 text-center bg-gray-100 border-b-2 border-gray-200">
                From
              </th>)}
              {!isRecipient && (<th className="px-4 py-2 text-center bg-gray-100 border-b-2 border-gray-200">
                To
              </th>)}
              <th className="px-4 py-2 text-center bg-gray-100 border-b-2 border-gray-200">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {operationsHistory?.map((operation, index) => (
              <tr key={index}>
                <td className="px-4 py-2 text-center border-b border-gray-200">
                  {operation.type}
                </td>
                <td className="px-4 py-2 text-center border-b border-gray-200">
                  {operation.toFrom}
                </td>
                <td className="px-4 py-2 text-center border-b border-gray-200">
                  {operation.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
