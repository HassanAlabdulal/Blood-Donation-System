interface PolicyProps {
  onClose?: () => void;
  showReturnButton?: boolean;
}

export default function Policy({ onClose, showReturnButton }: PolicyProps) {
  return (
    <div className="bg-[#f7f7f7] pt-[65px] flex flex-col items-center min-h-screen font-roboto">
      <h1 className="text-[#c03838] font-roboto font-bold text-3xl mb-6">
        Privacy Policy
      </h1>

      <div
        className="w-full max-w-5xl bg-[#f7f7f7] rounded-lg shadow-lg transition-shadow duration-500 ease-in-out overflow-auto px-6 py-10"
        style={{ maxHeight: "70vh" }}
      >
        <section className="mb-6 space-y-4">
          <h2 className="text-[#c03838] font-semibold text-xl">
            Information Collection
          </h2>
          <p className="font-normal">
            When you register for an account or interact with our services, we
            collect personal details such as your name, contact information,
            blood type, and health-related information crucial for the blood
            donation process. We may also collect technical data, such as your
            IP address and browser type, to enhance the functionality and user
            experience of our system.
          </p>
        </section>
        <section className="mb-6 space-y-4">
          <h2 className="text-[#c03838] font-semibold text-xl">
            Use of Information
          </h2>
          <p className="font-normal">
            The information we collect is integral to providing you with a
            personalized and efficient experience. This includes managing your
            account, facilitating the matching of blood donors with recipients,
            and providing tailored notifications and services. We may
            communicate with you directly regarding updates, alerts, or
            information related to your donations or requests.
          </p>
        </section>
        <section className="mb-6 space-y-4">
          <h2 className="text-[#c03838] font-semibold text-xl">Data Sharing</h2>
          <p className="font-normal">
            Your privacy is paramount. We do not sell your information. We may
            share your information with medical institutions, hospitals, and
            clinics, with your explicit consent, for the purpose of facilitating
            blood donations and related services. We may also share information
            to comply with legal requirements or with third-party service
            providers who assist us in operating our platform.
          </p>
        </section>
        <section className="mb-6 space-y-4">
          <h2 className="text-[#c03838] font-semibold text-xl">User Rights</h2>
          <p className="font-normal">
            You retain rights over your personal information. You may request
            access to, correction of, or deletion of your personal data. You
            also have the right to withdraw consent or opt-out of certain data
            uses as outlined in this policy.
          </p>
        </section>
        <section className="mb-6 space-y-4">
          <h2 className="text-[#c03838] font-semibold text-xl">
            Data Security
          </h2>
          <p className="font-normal">
            We recognize the sensitivity of your personal health information and
            prioritize the security of your data. We employ robust measures to
            prevent unauthorized access, disclosure, or loss of information.
          </p>
        </section>
        <section className="space-y-4">
          <h2 className="text-[#c03838] font-semibold text-xl">
            Changes to the Privacy Policy
          </h2>
          <p className="font-normal">
            This Privacy Policy may be updated to reflect changes to our
            information practices. Any changes will be posted on this page with
            an updated revision date. We encourage you to periodically review
            this page for the latest information on our privacy practices.
          </p>
        </section>
      </div>

      <div className="w-full max-w-5xl px-6 py-4">
        <section className="space-y-4">
          <p className="font-normal text-black font-roboto">
            If you have questions about this policy, please contact us through
            <a
              href="mailto:support@donorhub.com"
              className="text-[#5f7fbf] font-extrabold hover:underline"
            >
              {" "}
              email{" "}
            </a>
            or using our
            <a
              href="ContactUsPage"
              className="text-[#5f7fbf] font-extrabold hover:underline"
            >
              {" "}
              contact page
            </a>
            .
          </p>
        </section>
      </div>

      {showReturnButton && (
        <button
          onClick={onClose}
          className="block w-1/2 max-w-xs mt-5 max-md:mt-0 px-3 py-3 max-md:px-1 max-md:py-2  mx-auto font-semibold text-lg text-white rounded-lg uppercase bg-[#292828] border-2 border-[#292828] font-roboto 
        roundedtransition-all duration-700 hover:bg-black focus:outline-none shadow-md hover:shadow-xl
        disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer"
        >
          Return
        </button>
      )}
    </div>
  );
}
