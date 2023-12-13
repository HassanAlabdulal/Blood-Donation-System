import { useEffect, useState } from "react";
import OperationsHistory from "./UI/OperationsHistory";
import { supabase } from "../utils/supabase";
import { User } from "@supabase/supabase-js";

// const sampleDataFromBackend = [
//   { type: "Donate", toFrom: "Ali Alabdulal", date: "22/11/2023" },
//   { type: "Donate", toFrom: "Hassan Alabdulal", date: "02/09/2021" },
//   { type: "Recipient", toFrom: "Abdullah Al Matawah", date: "17/12/2020" },
// ];

type userProfile = {
  userId: string,
  name: string,
  email: string,
  phoneNumber: string,
  bloodType: string,
  dateOfBirth: string,
  age: number,
  weight: number,
  address: string,
  medicalHistory: string,
};

export default function ShowProfile() {
  const [user, setUser] = useState<User | null>(null)
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
    getUser()
  })

  const getUser =async () => {
    const {data, error} = await supabase.auth.getUser()
    if(error){console.log("Signed Out")}
    
    if (data) {
      setUser(data.user)
      await getMedicalHistory()
      await getProfile()

    }
    
  }

  const getProfile = async () => {
    const { data, error } = await supabase
    .from('profiles')
    .select()
    .eq('id', user?.id)


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
    .eq('patientID', user?.id)

    if(data) {getDiseases()}
    else {setDiseases("Nothing")}
  }
  const getDiseases =async () => {
    const { data, error } = await supabase
    .from('Diseases')
    .select()
    .eq('medicalPID', user?.id)

    if(data) {
      setDiseases(data.map(d => d.Disease).toString())
    }
    else {setDiseases("Nothing")}
  }

  
 

 

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
                {userProfile.userId}
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <div className="block w-full px-3 py-2 mt-1 text-gray-700 bg-gray-100 rounded-md">
                {userProfile.name}
              </div>
            </div>

            {/* Email and Phone Number */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="block w-full px-3 py-2 mt-1 text-gray-700 bg-gray-100 rounded-md">
                  {userProfile.email}
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
                    {userProfile.phoneNumber}
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
                  {userProfile.bloodType}
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Weight (kg)
                </label>
                <div className="block w-full px-3 py-2 mt-1 text-gray-700 bg-gray-100 rounded-md">
                  {userProfile.weight}
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
                  {userProfile.dateOfBirth}
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Age
                </label>
                <div className="block w-full px-3 py-2 mt-1 text-gray-700 bg-gray-100 rounded-md">
                  {userProfile.age}
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <div className="block w-full px-3 py-2 mt-1 text-gray-700 bg-gray-100 rounded-md">
                {userProfile.address}
              </div>
            </div>

            {/* Medical History */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Medical History
              </label>
              <div className="block w-full px-3 py-2 mt-1 text-gray-700 bg-gray-100 rounded-md">
                {userProfile.medicalHistory}
              </div>
              {userProfile.medicalHistory === "Other" && (
                <div className="block w-full px-3 py-2 mt-4 text-gray-700 bg-gray-100 rounded-md">
                  {}
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
