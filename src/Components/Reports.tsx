import { Link } from "react-router-dom";

export default function Reports() {
  // Define a common card class for reuse
  const cardClass =
    "block w-full h-full p-8 bg-white hover:bg-gray-100 flex flex-col hover:scale-105 items-center justify-center text-center border-2 border-gray-300 rounded-xl shadow-lg hover:shadow-xl hover:border-gray-400 transition duration-300";

  return (
    <section className="flex items-center justify-center w-full min-h-screen px-4 bg-[#f7f7f7] md:px-10">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-2 md:gap-x-8 md:gap-y-12">
        <div className="min-w-[16rem] min-h-[24rem]">
          <Link to="/BloodDonationsReport" className={cardClass}>
            <h5 className="mb-2 text-2xl font-semibold text-gray-700 ">
              Blood Donations
            </h5>
            <p className="text-gray-500">
              List of all blood donations received in a month
            </p>
          </Link>
        </div>
        <div className="min-w-[16rem] min-h-[24rem]">
          <Link to="/AggregatedAmountReport" className={cardClass}>
            <h5 className="mb-2 text-2xl font-semibold text-gray-700">
              Aggregated Amount
            </h5>
            <p className="text-gray-500">
              The aggregated amount available for each blood type
            </p>
          </Link>
        </div>
        <div className="min-w-[16rem] min-h-[24rem]">
          <Link to="/CollectionDriveReport" className={cardClass}>
            <h5 className="mb-2 text-2xl font-semibold text-gray-700">
              Collection Drive
            </h5>
            <p className="text-gray-500">
              All Collection Drive and total blood collected during each drive
            </p>
          </Link>
        </div>
        <div className="min-w-[16rem] min-h-[24rem]">
          <Link to="/PaymentsReport" className={cardClass}>
            <h5 className="mb-2 text-2xl font-semibold text-gray-700">
              Payments
            </h5>
            <p className="text-gray-500">
              All Payments that have been confirmed as completed
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}
