import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import { Link , useParams  } from "react-router-dom";

type userProfile = {
  userId: string;
  name: string;
  email: string;
  phoneNumber: string;
  bloodType: string;
  dateOfBirth: string;
  age: number;
  weight: number;
  address: string;
  medicalHistory: string;
};

export default function EditProfileUser() {
  // Provided user profile data
  const params = useParams();
  const [ diseases , setDiseases] = useState("")
  const [userProfile, setUserProfile] = useState<userProfile >(
    {
      userId: "LOADING...",
      name: "LOADING...",
      email: "LOADING...",
      phoneNumber: "LOADING...",
      bloodType: "LOADING...",
      dateOfBirth: "LOADING...",
      age: 0,
      weight: 0,
      address: "LOADING...",
      medicalHistory: "LOADING...",
    }
  )

  // Example user profile data
  useEffect(() => {
    getMedicalHistory();
    getProfile();
  });

  

  const getProfile = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("id", params);

      if (data){
        setUserProfile({
          userId: data[0].id,
          name: data[0].full_name,
          email: data[0].username,
          phoneNumber: data[0].phone,
          bloodType: data[0].bloodType,
          dateOfBirth: data[0].DoB,
          age: 33,
          weight: data[0].weight,
          address: data[0].country +" - "+ data[0].city +" - "+ data[0].street +" - "+ data[0].postalCode,
          medicalHistory:diseases,
        })
      }
    }

    const getMedicalHistory = async () => {
      const { data, error } = await supabase
      .from('MedicalHistory')
      .select()
      .eq('patientID', params)
  
      if(data) {getDiseases()}
      else {setDiseases("Nothing")}
    }
    const getDiseases =async () => {
      const { data, error } = await supabase
      .from('Diseases')
      .select()
      .eq('medicalPID', params)
  
      if(data) {
        setDiseases(data.map(d => d.Disease).toString())
      }
      else {setDiseases("Nothing")}
    }
  // State variables for editable fields
  const [phoneNumber, setPhoneNumber] = useState("");
  const [weight, setWeight] = useState(0);
  const [address, setAddress] = useState("");
  const [medicalHistory, setMedicalHistory] = useState(
    userProfile.medicalHistory
  );

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
                  type="text"
                  className="block w-full px-3 py-2 mt-1 text-gray-700 bg-gray-200 border-2 border-black rounded-md"
                  id="phone-number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
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
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.valueAsNumber)}
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
            </div>

            {/* Button Container */}
            <div className="flex items-center justify-center gap-3">
              {" "}
              {/* Flex container with column direction */}
              {/* Change Password Button */}
              <Link
                to="/NewPassword"
                className=" cursor-pointer rounded-lg bg-[#292828] border-2 border-[#292828] px-3 py-2
                text-base font-bold text-white align-middle transition-all duration-700 hover:bg-black focus:outline-none shadow-md hover:shadow-xl
                  disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                Change Password
              </Link>
              {/* Update Profile Button */}
              <button
                className="cursor-pointer rounded-lg bg-[#292828] border-2 border-[#292828] px-7 py-2
                text-base font-bold text-white align-middle transition-all duration-700 hover:bg-black focus:outline-none shadow-md hover:shadow-xl
                  disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
