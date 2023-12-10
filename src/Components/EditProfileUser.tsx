import React, { useState, useEffect } from "react";

export default function EditProfileUser() {
  // Provided user profile data
  const userProfile = {
    userId: "1112223334",
    name: "Abdullah Mohammed",
    email: "Abdullah2@gmail.com",
    phoneNumber: "557592000",
    bloodType: "A+",
    dateOfBirth: "1990-01-01",
    age: "33",
    weight: "70",
    address: "123 Main Street",
    medicalHistory: "None",
    otherMedicalHistory: "",
  };

  // State variables for editable fields
  const [phoneNumber, setPhoneNumber] = useState(userProfile.phoneNumber);
  const [weight, setWeight] = useState(userProfile.weight);
  const [address, setAddress] = useState(userProfile.address);
  const [medicalHistory, setMedicalHistory] = useState(
    userProfile.medicalHistory
  );
  const [otherMedicalHistory, setOtherMedicalHistory] = useState(
    userProfile.otherMedicalHistory
  );

  const handleNumericInputChange =
    (
      setterFunction: {
        (value: React.SetStateAction<string>): void;
        (value: React.SetStateAction<string>): void;
        (arg0: any): void;
      },
      maxLength: number
    ) =>
    (event: { target: { value: any } }) => {
      const value = event.target.value;
      if (
        (value === "" || /^[0-9\b]+$/.test(value)) &&
        value.length <= maxLength
      ) {
        setterFunction(value);
      }
    };

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const diseasesPreventingDonation = [
    "None",
    "Hepatitis B or C",
    "HIV/AIDS",
    "Heart Disease",
    "Hemochromatosis",
    "Blood Cancers",
    "Other",
  ];

  return (
    <div className="bg-[#f7f7f7] pt-16 flex flex-col justify-center w-full items-center min-h-screen font-roboto">
      <div className="flex flex-col items-center w-2/3 max-w-4xl p-8 space-y-8 overflow-hidden bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-gray-900">Edit Profile</h1>
        <div className="w-full">
          <form className="space-y-4">
            {/* Fixed Fields */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="user-id"
              >
                User ID
              </label>
              <input
                className="block w-full px-3 py-2 mt-1 text-gray-700 bg-gray-200 rounded-md"
                id="user-id"
                type="text"
                value={userProfile.userId}
                disabled
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="block w-full px-3 py-2 mt-1 text-gray-700 bg-gray-200 rounded-md"
                id="name"
                type="text"
                value={userProfile.name}
                disabled
              />
            </div>

            {/* Email and Phone Number */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="block w-full px-3 py-2 mt-1 text-gray-700 bg-gray-200 rounded-md"
                  id="email"
                  type="email"
                  value={userProfile.email}
                  disabled
                />
              </div>
              <div className="flex-1">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="phone-number"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="block w-full px-3 py-2 mt-1 text-gray-700 bg-gray-200 border-2 border-black rounded-md"
                  id="phone-number"
                  value={phoneNumber}
                  onChange={handleNumericInputChange(setPhoneNumber, 10)}
                />
              </div>
            </div>

            {/* Blood Type and Weight */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="blood-type"
                >
                  Blood Type
                </label>
                <select
                  id="blood-type"
                  className="block w-full px-3 py-2 mt-1 text-gray-700 bg-gray-200 rounded-md"
                  value={userProfile.bloodType}
                  disabled
                >
                  {bloodTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="weight"
                >
                  Weight (kg)
                </label>
                <input
                  className="block w-full px-3 py-2 mt-1 text-gray-700 bg-gray-200 border-2 border-black rounded-md"
                  id="weight"
                  type="text"
                  value={weight}
                  onChange={handleNumericInputChange(setWeight, 3)}
                />
              </div>
            </div>

            {/* Date of Birth and Age */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="date-of-birth"
                >
                  Date of Birth
                </label>
                <input
                  className="block w-full px-3 py-2 mt-1 text-gray-700 bg-gray-200 rounded-md"
                  id="date-of-birth"
                  type="date"
                  value={userProfile.dateOfBirth}
                  disabled
                />
              </div>
              <div className="flex-1">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="age"
                >
                  Age
                </label>
                <input
                  className="block w-full px-3 py-2 mt-1 text-gray-700 bg-gray-200 rounded-md"
                  id="age"
                  type="text"
                  value={userProfile.age}
                  disabled
                />
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="address"
              >
                Address
              </label>
              <textarea
                className="block w-full px-3 py-2 mt-1 text-gray-700 bg-gray-200 border-2 border-black rounded-md resize-none"
                id="address"
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="medical-history"
              >
                Medical History
              </label>
              <select
                id="medical-history"
                className="block w-full px-3 py-2 mt-1 text-gray-700 bg-gray-200 border-2 border-black rounded-md"
                value={medicalHistory}
                onChange={(e) => setMedicalHistory(e.target.value)}
              >
                {diseasesPreventingDonation.map((disease) => (
                  <option key={disease} value={disease}>
                    {disease}
                  </option>
                ))}
              </select>
              {medicalHistory === "Other" && (
                <textarea
                  className="block w-full px-3 py-2 mt-4 text-gray-700 bg-gray-200 rounded-md resize-none"
                  id="other-medical-history"
                  rows={3}
                  value={otherMedicalHistory}
                  onChange={(e) => setOtherMedicalHistory(e.target.value)}
                  placeholder="Please specify your medical condition"
                />
              )}
            </div>

            {/* Button Container */}
            <div className="flex items-center justify-center gap-3">
              {" "}
              {/* Flex container with column direction */}
              {/* Change Password Button */}
              <a
                type="button"
                className=" cursor-pointer rounded-lg bg-[#292828] border-2 border-[#292828] px-3 py-2
                text-base font-bold text-white align-middle transition-all duration-700 hover:bg-black focus:outline-none shadow-md hover:shadow-xl
                  disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                href="NewPasswordPage"
              >
                Change Password
              </a>
              {/* Update Profile Button */}
              <a
                type="submit"
                className="cursor-pointer rounded-lg bg-[#292828] border-2 border-[#292828] px-7 py-2
                text-base font-bold text-white align-middle transition-all duration-700 hover:bg-black focus:outline-none shadow-md hover:shadow-xl
                  disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                href="ShowProfilePage"
              >
                Save Changes
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
