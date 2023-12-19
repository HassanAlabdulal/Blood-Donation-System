import { Textarea } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { Link, useNavigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";

export default function AddCollectionDrive() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser()
  })

  const getUser =async () => {
    const {data, error} = await supabase.auth.getUser()
    if(error){console.log("Signed Out")}
    
    if (data) {
      setUser(data.user)
    } 
  }


  const calculateEndDate = (months: number) => {
    const start = new Date(startDate);
    start.setMonth(start.getMonth() + months);
    return start.toISOString().split("T")[0];
  };

  const handleDurationChange = (months: number) => {
    if (startDate) {
      setEndDate(calculateEndDate(months));
    }
  };

  const handleStartDateChange = (date: React.SetStateAction<string>) => {
    setStartDate(date);
    if (endDate) {
      const durationMonths = endDate === calculateEndDate(3) ? 3 : 6;
      setEndDate(calculateEndDate(durationMonths));
    }
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const { error } = await supabase.from("DonationEvent").insert({
      startDate,
      endDate,
      location,
      title,
      description,
      adminId: user?.id,
      category,
    });

    if (error) {
      console.log(error);
    }

    navigate("/Main");
    window.location.reload();
  };

  return (
    <div className="bg-[#f7f7f7] pt-16 flex flex-col justify-center w-full items-center min-h-screen font-roboto">
      <div className="flex flex-col items-center w-2/3 max-w-4xl p-8 space-y-8 overflow-hidden bg-white rounded-lg shadow-lg">
        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-900">
          New Collection Drive
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <label htmlFor="title" className="mb-1 text-gray-700">
              Title:
            </label>
            <input
              name="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-[#292828] bg-gray-50/50"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="location" className="mb-1 text-gray-700">
              Location:
            </label>
            <input
              name="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-[#292828] bg-gray-50/50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="Category" className="mb-1 text-gray-700">
              Category:
            </label>
            <input
              name="category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-[#292828] bg-gray-50/50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="mb-1 text-gray-700">
              Description:
            </label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-[#292828] resize-none bg-gray-50/50"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="start-date" className="mb-1 text-gray-700">
              Start Date:
            </label>
            <input
              name="start-date"
              type="date"
              value={startDate}
              onChange={(e) => handleStartDateChange(e.target.value)}
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-[#292828] bg-gray-50/50"
              required
            />
          </div>

          <fieldset className="mb-4">
            <legend className="mb-1 text-gray-700">Duration:</legend>
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="duration"
                  value="3 months"
                  id="duration-3months"
                  className="w-4 h-4 form-radio focus:outline-[#292828] bg-gray-50/50"
                  onChange={() => handleDurationChange(3)}
                />
                <label htmlFor="duration-3months" className="ml-2">
                  3 months
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="radio"
                  name="duration"
                  value="6 months"
                  id="duration-6months"
                  className="w-4 h-4 form-radio"
                  onChange={() => handleDurationChange(6)}
                />
                <label htmlFor="duration-6months" className="ml-2">
                  6 months
                </label>
              </div>
            </div>
          </fieldset>

          <div className="mb-4">
            <label htmlFor="end-date" className="mb-1 text-gray-700">
              End Date:
            </label>
            <input
              name="end-date"
              type="date"
              value={endDate}
              className="w-full px-3 py-2 border rounded shadow-sm bg-gray-50/50"
              disabled
            />
          </div>

          <div className="flex items-center justify-center mt-8">
            <button
              className=" cursor-pointer rounded-lg bg-[#292828] border-2 border-[#292828] px-9 py-2.5
            text-base font-bold text-white align-middle transition-all duration-700 hover:bg-black focus:outline-none shadow-md hover:shadow-xl
              disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
