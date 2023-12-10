import Lottie from "lottie-react";
import animationData from "../Assets/Animations/Homapage-Animation.json";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="flex items-center justify-center w-full h-screen gap-3 max-md:mt-30 bg-[#f7f7f7]">
      <div className="flex flex-col items-center justify-center">
        <div className="w-1/2 h-1/2 max-xl:w-80 max-xl:h-80 max-lg:mt-24">
          <Lottie animationData={animationData} />
        </div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.02,
              },
            },
            hidden: {},
          }}
          className="max-w-2xl mx-6 my-16 text-3xl font-black leading-none tracking-tight text-center text-red-700 sm:text-4xl sm:max-w-3xl lg:text-5xl lg:max-w-4xl xl:text-6xl xl:max-w-5xl font-nunito"
        >
          {Array.from(
            "DonorHub: Where Every Drop Tells a Story of Hope and Help!"
          ).map((char, index) => (
            <motion.span
              key={index}
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 50 },
              }}
              transition={{ type: "spring", stiffness: 50 }}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>

        <div className="flex items-center gap-3">
          <Link
            to="/Main"
            className="flex select-none items-center cursor-pointer justify-center rounded-lg bg-[#292828] border-2 border-[#292828] px-3 py-2.5
             text-base font-bold text-white align-middle transition-all duration-700 hover:bg-black focus:outline-none shadow-md hover:shadow-xl
               disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            data-ripple-dark="true"
          >
            Get Started
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              aria-hidden="true"
              className="w-5 h-5 ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              ></path>
            </svg>
          </Link>

          <a
            className="flex select-none items-center justify-center rounded-lg border-2 border-[#292828]
           px-[1.623rem] py-2.5 text-base font-bold text-[#292828] align-middle transition-all duration-500
            hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
            href="#learn-more"
          >
            Learn More
          </a>
        </div>
      </div>
    </main>
  );
}
