import TableWithStripedRows from "./UI/TableWithStripedRowsProps";

export default function CollectionDriveReport() {
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
          rows={[
            { type: "City Hall Blood Drive", bloodAmount: "75.0" },
            {
              type: "Healthcare Heroes Donation Campaign",
              bloodAmount: "62.4",
            },
            { type: "Summer College Blood Drive", bloodAmount: "88.3" },
            { type: "Neighborhood Heroes Blood Drive", bloodAmount: "46.5" },
            { type: "Corporate Giving Blood Drive", bloodAmount: "110.0" },
            { type: "Athletes for Life Blood Drive", bloodAmount: "53.2" },
            { type: "Hometown Heroes Blood Drive", bloodAmount: "48.1" },
            { type: "Holiday Season Blood Drive", bloodAmount: "67.9" },
          ]}
        />
      </div>
    </main>
  );
}
