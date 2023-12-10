import TableWithStripedRows from "./UI/TableWithStripedRowsProps";

export default function PaymentsReport() {
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
          rows={[
            {
              PayerName: "John Doe",
              Amount: "150.00",
              ConfirmationDate: "2023-01-12",
            },
            {
              PayerName: "Jane Smith",
              Amount: "200.00",
              ConfirmationDate: "2023-01-15",
            },
            {
              PayerName: "Bob Johnson",
              Amount: "350.00",
              ConfirmationDate: "2023-02-01",
            },
            {
              PayerName: "Alice Brown",
              Amount: "125.00",
              ConfirmationDate: "2023-02-05",
            },
            {
              PayerName: "Charlie Davis",
              Amount: "500.00",
              ConfirmationDate: "2023-02-20",
            },
          ]}
        />
      </div>
    </main>
  );
}
