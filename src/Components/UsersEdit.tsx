import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faEdit,
  faHistory,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { supabase } from "../utils/supabase";


type initialUsers = {
  id: string;
  name: string;
}

export default function UsersEdit() {

  const [adminsIds, setAdminsIds] = useState<string[]>([])
  const [initialUsers, setUserProfile] = useState<initialUsers[]>([
    {
      id: "LOADING...",
      name: "LOADING...",
    }
  ])

  useEffect(() => {
     getAdminsIds()
     getUserProfile()
  },[])

  const getAdminsIds =async () => {
    const {data, error }= await supabase
    .from('Admin')
    .select('adminId')

    if (data){
      setAdminsIds(data.map(e => (e.adminId)))
    }
  }

  const getUserProfile =async () => {
    const { data, error } = await supabase
    .from('profiles')
    .select()
    
    if(data){
      setUserProfile(data.map(e => (
        {
          id: e.id,
          name: e.full_name,
        }
      )))
    }
  }
  
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchTerm(event.target.value);
  };

  const handleRemoveUser = async (userId: string) => {
    // setUserProfile(initialUsers.filter((user) => user.id !== userId));
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', userId)
  };

  const filteredUsers = initialUsers.filter(
    (user) =>
      user.id.includes(searchTerm) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#f7f7f7] pt-16 flex flex-col justify-center mt-16 py-10 items-center w-full min-h-screen font-roboto">
      <div className="flex flex-col items-center w-full max-w-4xl p-8 overflow-hidden bg-white rounded-lg shadow-lg">
        {/* Title */}
        <h1 className="w-full mb-4 text-2xl font-semibold text-center text-gray-900">
          Users
        </h1>

        {/* Search Bar */}
        <div className="flex justify-center w-full mb-4">
          <div className="relative">
            <input
              type="text"
              name="name"
              id="name"
              className="shadow-sm focus:ring-[#292828] focus:outline-[#292828] block w-60 sm:w-80 md:w-96 h-12 text-base border-gray-300 pl-4 pr-10 rounded-lg"
              placeholder="Search by ID or Name"
              style={{ backgroundColor: "#ececec" }} // Here we change the background color
              onChange={handleSearchChange}
            />
            <button
              className="absolute top-0 right-0 mt-3 mr-3"
              onClick={() => {
                /* Function to handle search */
              }}
            >
              <FontAwesomeIcon
                icon={faSearch}
                size="lg"
                className="text-gray-600"
              />
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="w-full">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 text-center border-b-2 border-gray-300">
                  ID
                </th>
                <th className="px-5 py-3 text-center border-b-2 border-gray-300">
                  Name
                </th>
                <th className="px-5 py-3 text-center border-b-2 border-gray-300">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={index}>
                  <td className="px-5 py-3 text-center border-b border-gray-300">
                    {user.id}
                  </td>
                  <td className="px-5 py-3 text-center border-b border-gray-300">
                    {user.name}
                  </td>
                  <td className="px-5 py-3 border-b border-gray-300">
                    {adminsIds.includes(user.id) && (<td className="flex justify-center text-center ">
                      ADMIN
                      </td>)}
                    {!adminsIds.includes(user.id)&&(<div className="flex justify-center space-x-2">
                      {/* History Anchor */}
                      <Link
                        to= {"/OperationsHistoryAdmin/" + user.id}
                        className="inline-flex items-center px-4 py-2 font-bold text-white bg-[#292828] rounded hover:bg-black transition-all duration-700"
                      >
                        <FontAwesomeIcon icon={faHistory} className="mr-2" />
                        History
                      </Link>

                      {/* Edit Anchor */}
                      <Link
                        to={"/EditProfileAdmin/" + user.id}
                        className="inline-flex items-center px-4 py-2 font-bold text-white transition-all duration-700 bg-[#5f7fbf] rounded hover:bg-[#3e60a3]"
                      >
                        <FontAwesomeIcon icon={faEdit} className="mr-2" />
                        Edit
                      </Link>

                      {/* Remove Button */}
                      <button
                        className="px-5 py-2 font-bold text-white transition-all duration-700 bg-red-700 rounded hover:bg-red-800"
                        onClick={() => handleRemoveUser(user.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Create New User Button */}
        <div className="mt-8 ">
          <Link
            to="/SignUp"
            className="select-none  cursor-pointer rounded-lg bg-[#292828] border-2 border-[#292828] px-3 py-2.5
             text-base font-bold text-white align-middle transition-all duration-700 hover:bg-black focus:outline-none shadow-md hover:shadow-xl
               disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            Create New Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
