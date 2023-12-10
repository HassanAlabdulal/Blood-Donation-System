import TableWithStripedRows from "./UI/TableWithStripedRowsProps";

export default function AggregatedAmountReport() {
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
          rows={[
            { type: "A+", bloodAmount: "37.5" },
            { type: "A-", bloodAmount: "20.2" },
            { type: "AB+", bloodAmount: "15.3" },
            { type: "AB-", bloodAmount: "9.8" },
            { type: "O+", bloodAmount: "45.0" },
            { type: "O-", bloodAmount: "22.7" },
          ]}
        />
      </div>
    </main>
  );
}
