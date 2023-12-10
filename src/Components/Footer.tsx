import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className=" bg-[#f7f7f7] rounded-lg shadow">
      <div className="w-full max-w-screen-xl p-4 mx-auto md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            to="/"
            className="flex items-center mb-4 space-x-3 sm:mb-0 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold text-red-700 whitespace-nowrap">
              DonorHub
            </span>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0">
            <li>
              <Link to="/AboutUs" className="hover:underline me-4 md:me-6">
                About us
              </Link>
            </li>
            <li>
              <Link to="/Policy" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/ContactUs" className="hover:underline">
                Contact us
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center ">
          © 2023{" "}
          <Link to="/" className="hover:underline">
            DonorHub™
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
