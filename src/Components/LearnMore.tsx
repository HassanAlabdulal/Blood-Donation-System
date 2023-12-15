import { useEffect } from "react";
import { Link } from "react-router-dom";
import bloodImage from "../Assets/Blood donation-.png";
import bloodTypes from "../Assets/blood types.png";

export default function LearnMore() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section>
      <div
        id="learn-more"
        className="py-8 text-red-700 bg-[#f7f7f7] font-nunito"
      >
        <h1 className="mx-6 mt-16 text-2xl font-extrabold text-center uppercase md:text-3xl xl:text-4xl tracking-loose">
          DISCOVER, CONTRIBUTE, & SAVE LIVES
        </h1>
        <div className="flex flex-col-reverse items-center justify-center px-4 py-0 md:flex-row md:px-6 md:py-12 lg:px-8">
          {/* Left side content */}
          <div className="flex flex-col w-full px-4 md:w-6/12 lg:w-5/12 xl:w-4/12">
            <p className="mb-1 text-2xl font-semibold leading-normal md:text-3xl md:leading-relaxed lg:text-4xl lg:mb-2">
              What is DonorHub?
            </p>
            <p className="mb-6 font-roboto text-base text-[#121212] md:text-lg lg:text-xl">
              DonorHub is a pivotal system designed to streamline the blood
              donation process. It serves as a vital link between donors,
              recipients, and health facilities, ensuring that every drop of
              blood reaches those in dire need. Our platform simplifies the
              management of blood inventories, donor and recipient records, and
              blood drives, fostering a community where generosity leads to
              life-saving actions.
            </p>
            <p className="mb-1 text-2xl font-semibold leading-normal md:text-3xl md:leading-relaxed lg:text-4xl lg:mb-2">
              Our Mission
            </p>
            <p className="mb-6 font-roboto text-base text-[#121212] md:text-lg lg:text-xl">
              Our mission is to make blood donation and management a seamless
              process, ensuring that all individuals in need have timely access
              to the right type of blood. We aim to uphold the highest standards
              of safety and efficiency, while also promoting awareness and
              education about the importance of blood donation.
            </p>
            <p className="mb-1 text-2xl font-semibold leading-normal md:text-3xl md:leading-relaxed lg:text-4xl lg:mb-2">
              Join Us
            </p>
            <p className="mb-6 font-roboto text-base text-[#121212] md:text-lg lg:text-xl">
              Become an integral part of our lifesaving mission. Whether you're
              a donor, a health professional, or someone looking to make a
              difference, your journey starts here. Sign up today and be a
              beacon of hope.
            </p>
            <div className="flex items-center gap-3">
              {/* <Link
                to="/SignUp"
                className="flex select-none items-center justify-center cursor-pointer
                 rounded-lg bg-[#292828] border-2 border-[#292828] px-[1.693rem]
                   py-2 text-base font-bold text-white align-middle
                   transition-all duration-700 hover:bg-black focus:outline-none shadow-md hover:shadow-xl
               disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                data-ripple-dark="true"
              >
                Sign up
              </Link> */}

              <a
                className="flex select-none items-center justify-center rounded-lg border-2 border-[#292828]
                px-2 py-2 text-base font-bold text-[#292828] align-middle transition-all duration-500
                 hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
                href="#features"
              >
                Blood Types
              </a>
            </div>
          </div>
          {/* Right side image */}
          <div className="w-full px-4 mt-16 md:w-1/2">
            <img
              className="w-full h-auto mx-auto max-md:max-w-md md:w-5/6 md:h-5/6"
              src={bloodImage}
              alt="Project Creator"
            />
          </div>
        </div>

        <div
          id="features"
          className="flex flex-col items-center justify-center mt-32 mb-8"
        >
          <h1 className="mx-6 mt-24 mb-16 text-2xl font-extrabold text-center uppercase md:text-3xl xl:text-4xl tracking-loose">
            Vital Connections: Understanding Blood Type Compatibility
          </h1>
          <div className="relative ml-0 md:my-8 lg:w-10/12">
            <div className="container w-full h-full mx-auto">
              <div className="relative h-full p-8 overflow-hidden wrap">
                {/* Vertical line */}
                <div
                  className="absolute transform -translate-x-1/2 border-[#292828] left-1/2"
                  style={{ height: "100%", top: "0", borderLeftWidth: "2px" }}
                ></div>

                {/* Timeline entries */}
                <div className="flex flex-row-reverse items-center justify-between w-full mb-8 left-timeline">
                  <div className="order-1 w-5/12"></div>
                  <div className="order-1 w-5/12 px-1 py-4 text-left">
                    <h4 className="mb-1 text-2xl font-semibold leading-normal text-left md:text-center md:text-3xl md:leading-relaxed lg:text-4xl lg:mb-2">
                      Know Your Type
                    </h4>
                    <p className="text-base leading-snug text-left text-[#121212] text-opacity-100 font-roboto md:text-center md:text-lg lg:text-xl">
                      Unravel the significance of your blood type in the
                      life-saving journey of donation. At DonorHub, we
                      illuminate the importance of each blood type and how it
                      can become a beacon of hope for those in need.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full mb-8 right-timeline">
                  <div></div>
                  <div className="order-1 w-5/12"></div>
                  <div className="order-1 w-5/12 px-1 py-4 text-left">
                    <h4 className="mb-1 text-2xl font-semibold leading-normal text-left md:text-center md:text-3xl md:leading-relaxed lg:text-4xl lg:mb-2">
                      Gift of Compatibility
                    </h4>
                    <p className="text-base leading-snug text-left text-[#121212] text-opacity-100 font-roboto md:text-center md:text-lg lg:text-xl">
                      Thrive on Collaboration Dive into a collaborative oasis
                      where feedback refines and perfects. Engage with a
                      community where each critique enriches your work, ensuring
                      your projects not only shine but evolve through a dynamic
                      exchange of ideas.
                    </p>
                  </div>
                </div>

                <div className="flex flex-row-reverse items-center justify-between w-full mb-8 left-timeline">
                  <div className="order-1 w-5/12"></div>
                  <div className="order-1 w-5/12 px-1 py-4 text-left">
                    <h4 className="mb-1 text-2xl font-semibold leading-normal text-left md:text-center md:text-3xl md:leading-relaxed lg:text-4xl lg:mb-2">
                      Be a Lifesaver
                    </h4>
                    <p className="text-base leading-snug text-left text-[#121212] text-opacity-100 font-roboto md:text-center md:text-lg lg:text-xl">
                      Every blood type has the potential to save lives. Discover
                      how your unique type contributes to the collective effort
                      in emergencies and planned medical procedures.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full mb-8 right-timeline">
                  <div className="order-1 w-5/12"></div>
                  <div className="order-1 w-5/12 px-1 py-4">
                    <h4 className="mb-1 text-2xl font-semibold leading-normal text-left md:text-center md:text-3xl md:leading-relaxed lg:text-4xl lg:mb-2">
                      Connect the Drops
                    </h4>
                    <p className="text-base leading-snug text-left text-[#121212] text-opacity-100 font-roboto md:text-center md:text-lg lg:text-xl">
                      Your blood type is more than a biological marker; it's a
                      link in the lifesaving chain of humanity. Understand the
                      power of your donation and see how every type plays a role
                      in the universal story of giving.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <img
              className="w-6/12 mx-auto mt-10"
              src={bloodTypes}
              alt="blood types"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
