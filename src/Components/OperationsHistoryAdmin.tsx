import OperationsHistory from "./UI/OperationsHistory";

// const sampleDataFromBackend = [
//   { type: "Donate", toFrom: "Ali Alabdulal", date: "22/11/2023" },
//   { type: "Donate", toFrom: "Hassan Alabdulal", date: "02/09/2021" },
//   { type: "Recipient", toFrom: "Abdullah Al Matawah", date: "17/12/2020" },
//   { type: "Recipient", toFrom: "Abdullah Al Matawah", date: "17/12/2020" },
//   { type: "Recipient", toFrom: "Abdullah Al Matawah", date: "17/12/2020" },
//   { type: "Recipient", toFrom: "Abdullah Al Matawah", date: "17/12/2020" },
//   { type: "Recipient", toFrom: "Abdullah Al Matawah", date: "17/12/2020" },
//   { type: "Recipient", toFrom: "Abdullah Al Matawah", date: "17/12/2020" },
// ];

export default function OperationsHistoryAdmin() {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-[#f7f7f7]">
      <OperationsHistory />
    </div>
  );
}
