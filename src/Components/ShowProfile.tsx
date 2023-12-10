import { useState } from "react";
import OperationsHistory from "./UI/OperationsHistory";

// const sampleDataFromBackend = [
//   { type: "Donate", toFrom: "Ali Alabdulal", date: "22/11/2023" },
//   { type: "Donate", toFrom: "Hassan Alabdulal", date: "02/09/2021" },
//   { type: "Recipient", toFrom: "Abdullah Al Matawah", date: "17/12/2020" },
// ];

export default function ShowProfile() {
  // Example user profile data
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

  // Initialize state with the example user profile data
  const [userId] = useState(userProfile.userId);
  const [name] = useState(userProfile.name);
  const [email] = useState(userProfile.email);
  const [phoneNumber] = useState(userProfile.phoneNumber);
  const [bloodType] = useState(userProfile.bloodType);
  const [dateOfBirth] = useState(userProfile.dateOfBirth);
  const [age] = useState(userProfile.age);
  const [weight] = useState(userProfile.weight);
  const [address] = useState(userProfile.address);
  const [medicalHistory] = useState(userProfile.medicalHistory);
  const [otherMedicalHistory] = useState(userProfile.otherMedicalHistory);

  return (
    <div className="bg-[#f7f7f7] pt-16 flex flex-col items-center min-h-screen font-roboto">
      <div className="flex flex-col items-center w-full max-w-4xl p-8 space-y-8 overflow-hidden bg-white rounded-lg shadow-lg">
        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>

        {/* Display of User Details */}
        <div className="w-full">
          <div className="space-y-4">
            {/* User ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                User ID
              </label>
              <div className="block w-full px-3 py-2 mt-1 text-gray-700 bg-gray-100 rounded-md">
                {userId}
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <div className="block w-full px-3 py-2 mt-1 text-gray-700 bg-gray-100 rounded-md">
                {name}
              </div>
            </div>

            {/* Email and Phone Number */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="block w-full px-3 py-2 mt-1 text-gray-700 bg-gray-100 rounded-md">
                  {email}
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <div className="flex mt-1 rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 text-sm text-gray-500 border border-r-0 border-gray-300 rounded-l-md bg-gray-50">
                    +966
                  </span>
                  <div className="flex-1 block w-full px-3 py-2 text-gray-700 bg-gray-100 rounded-none rounded-r-md">
                    {phoneNumber}
                  </div>
                </div>
              </div>
            </div>

            {/* Blood Type and Weight */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Blood Type
                </label>
                <div className="block w-full px-3 py-2 mt-1 text-gray-700 bg-gray-100 rounded-md">
                  {bloodType}
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Weight (kg)
                </label>
                <div className="block w-full px-3 py-2 mt-1 text-gray-700 bg-gray-100 rounded-md">
                  {weight}
                </div>
              </div>
            </div>

            {/* Date of Birth and Age */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <div className="block w-full px-3 py-2 mt-1 text-gray-700 bg-gray-100 rounded-md">
                  {dateOfBirth}
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Age
                </label>
                <div className="block w-full px-3 py-2 mt-1 text-gray-700 bg-gray-100 rounded-md">
                  {age}
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <div className="block w-full px-3 py-2 mt-1 text-gray-700 bg-gray-100 rounded-md">
                {address}
              </div>
            </div>

            {/* Medical History */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Medical History
              </label>
              <div className="block w-full px-3 py-2 mt-1 text-gray-700 bg-gray-100 rounded-md">
                {medicalHistory}
              </div>
              {medicalHistory === "Other" && (
                <div className="block w-full px-3 py-2 mt-4 text-gray-700 bg-gray-100 rounded-md">
                  {otherMedicalHistory}
                </div>
              )}
            </div>

            <div className="flex flex-col items-center mt-3">
              <a
                className=" cursor-pointer rounded-lg bg-[#292828] border-2 border-[#292828] px-9 py-2.5
                text-base font-bold text-white align-middle transition-all duration-700 hover:bg-black focus:outline-none shadow-md hover:shadow-xl
                  disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                href="EditProfileUserPage"
              >
                Edit Profile
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center w-full my-24">
        <OperationsHistory />
      </div>
    </div>
  );
}
