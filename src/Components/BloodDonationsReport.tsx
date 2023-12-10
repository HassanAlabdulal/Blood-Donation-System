import TableWithStripedRows from "./UI/TableWithStripedRowsProps";

export default function BloodDonationsReport() {
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
          rows={[
            { ID: "123456789", Name: "Hassan", ReceivedDate: "02/01/2023" },
            { ID: "112345678", Name: "Ali", ReceivedDate: "14/01/2023" },
            { ID: "123456567", Name: "Hussain", ReceivedDate: "08/01/2023" },
            { ID: "312341234", Name: "Abdullah", ReceivedDate: "06/01/2023" },
            { ID: "231234123", Name: "Lutfi", ReceivedDate: "16/01/2023" },
            { ID: "231234123", Name: "Lutfi", ReceivedDate: "16/01/2023" },
            { ID: "231234123", Name: "Lutfi", ReceivedDate: "16/01/2023" },
            { ID: "231234123", Name: "Lutfi", ReceivedDate: "16/01/2023" },
          ]}
        />
      </div>
    </main>
  );
}
