/* eslint-disable jsx-a11y/no-redundant-roles */

// import { useState } from "react";
import { useEffect, useState } from "react";
import {User} from '@supabase/supabase-js';
import image from "../Assets/Blood donation-.png";
import { supabase } from "../utils/supabase";
import { Console } from "console";
import { data } from "autoprefixer";
// type DonationEvent = {
//   id: number;
//   title: string;
//   startDate: string;
//   endDate: string;
//   location: string;
//   description: string;
//   imageUrl: string;
//   category: string;
// };
type DonationEvent = {
  eventId: number;
  title: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  imageUrl: string;
  category: string;
};

export default function Main() {
  
  

  const [donationEvents, setDonationEvents] = useState<DonationEvent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [uesr, setUser] = useState<User | null>(null)

  const fetchEvents = async () => {
    const { data, error } = await supabase.from("DonationEvent").select();
  
    if (error) {
      console.error(error);
      setError('Failed to fetch events'); // Set error message
      return [];
    }
    
    if (data) {
      // Directly assign the data to DonationEvents as it's already in the correct format
      const DonationEvents: DonationEvent[] = data;
      return DonationEvents;
    }
  
    return [];
  };
  
  useEffect(() => {
    getUser()
    fetchEvents().then(events => {
      setDonationEvents(events);
    }).catch(err => {
      console.error('Error while fetching events:', err);
      setError('An error occurred while fetching events');
    });
  }, []);
  

  
  const getUser =async () => {
    const {data, error} = await supabase.auth.getUser()
    if(error){console.log("Signed Out")}
    setUser(data.user)
  }
  
  

  

  

  const DonationEvents: DonationEvent[] = donationEvents;


  function hand(): void {
    console.log(uesr)
  }

  return (
    <div className="bg-[#f7f7f7] pt-20 flex flex-col items-center min-h-screen font-roboto gap-12">
      <div className="flex flex-col items-center w-full gap-6">
        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl text-[#c03838] py-10">
          Donation Events
        </h1>

        {/* Events Section */}
        <ul
          role="list"
          className="grid grid-cols-1 gap-8 mx-8 sm:gap-12 sm:mx-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {DonationEvents.map((DonationEvent) => {
            return (
              <li
                onClick={hand}
                // key={DonationEvent.id}
                key={DonationEvent.eventId}
                // onClick={() => navigateToDonationEventDetails(DonationEvent.id)}
                className="flex flex-col col-span-1 text-center transition duration-500 transform bg-white divide-y divide-gray-200 rounded-lg shadow cursor-pointer hover:scale-105 hover:shadow-lg"
              >
                <div className="flex flex-col flex-1 p-8">
                  <img
                    className="w-3/4 h-auto mx-auto rounded-lg"
                    src={`${image}`}
                    alt={DonationEvent.title} />
                  <h3 className=" text-[#bfa260] text-base font-nunito font-bold">
                    {DonationEvent.title}
                  </h3>
                  <dl className="flex flex-col justify-between flex-grow gap-3 mt-1">
                    <dt className="sr-only">location</dt>
                    <dd className="text-sm text-gray-500">
                      by{" "}
                      <em className="text-gray-600">{DonationEvent.location}</em>
                    </dd>
                    <dd className="text-xs text-gray-500">
                      from{" "}
                      <em className="p-1 text-gray-600 border border-gray-300 rounded">
                        {DonationEvent.startDate}
                      </em>
                      {"  "}
                      to
                      {"  "}
                      <em className="p-1 text-gray-600 border border-gray-300 rounded">
                        {DonationEvent.endDate}
                      </em>
                    </dd>
                    <dt className="sr-only">Description</dt>
                    <dd className="text-[#121212] text-sm line-clamp-2">
                      {DonationEvent.description}
                    </dd>
                    <dt className="sr-only">Category</dt>
                    <dd className="mt-1">
                      <span className="px-2 py-1 text-[#3e60a3] text-xs font-medium bg-blue-100 rounded-full">
                        {DonationEvent.category}
                      </span>
                    </dd>
                  </dl>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
