/* eslint-disable jsx-a11y/no-redundant-roles */

// import { useState } from "react";
import { useEffect, useState } from "react";
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
    fetchEvents().then(events => {
      setDonationEvents(events);
    }).catch(err => {
      console.error('Error while fetching events:', err);
      setError('An error occurred while fetching events');
    });
  }, []);
  

  
  

  const DonationEvents: DonationEvent[] = donationEvents;


  // const DonationEvents: DonationEvent[] = [
    
    // {
    //   id: 1,
    //   title: "City Hall Blood Drive",
    //   startDate: "2023-04-20",
    //   endDate: "2023-05-20",
    //   location: "City Hall Auditorium",
    //   description:
    //     "Support our city's healthcare system by participating in the annual City Hall Blood Drive. Your donation matters!",
    //   imageUrl: `${image}`,
    //   category: "Community",
    // },
    // {
    //   id: 2,
    //   title: "Healthcare Heroes Donation Campaign",
    //   startDate: "2023-05-20",
    //   endDate: "2023-06-12",
    //   location: "Local Hospital Conference Room",
    //   description:
    //     "Give back to those who care for us. Donate blood and support the healthcare heroes who save lives every day.",
    //   imageUrl: `${image}`,
    //   category: "Health",
    // },
    // {
    //   id: 3,
    //   title: "Summer College Blood Drive",
    //   startDate: "2023-06-20",
    //   endDate: "2023-07-15",
    //   location: "University Commons Area",
    //   description:
    //     "Students and staff, show your college spirit and help save lives by donating blood this summer.",
    //   imageUrl: `${image}`,
    //   category: "Education",
    // },
    // {
    //   id: 4,
    //   title: "Neighborhood Heroes Blood Drive",
    //   startDate: "2023-07-20",
    //   endDate: "2023-08-22",
    //   location: "Neighborhood Rec Center",
    //   description:
    //     "Join your neighbors in being a local hero! Your blood donation can save up to three lives.",
    //   imageUrl: `${image}`,
    //   category: "Community",
    // },
    // {
    //   id: 5,
    //   title: "Corporate Giving Blood Drive",
    //   startDate: "2023-08-20",
    //   endDate: "2023-09-30",
    //   location: "Corporate HQ Courtyard",
    //   description:
    //     "Our company is hosting a blood drive to support local blood banks. Employees and the public are welcome!",
    //   imageUrl: `${image}`,
    //   category: "Corporate",
    // },
    // {
    //   id: 6,
    //   title: "Athletes for Life Blood Drive",
    //   startDate: "2023-09-20",
    //   endDate: "2023-10-20",
    //   location: "City Sports Arena",
    //   description:
    //     "Athletes and fans, team up to save lives! Your donation is more than just blood; it's a lifeline.",
    //   imageUrl: `${image}`,
    //   category: "Sports",
    // },
    // {
    //   id: 7,
    //   title: "Hometown Heroes Blood Drive",
    //   startDate: "2023-10-20",
    //   endDate: "2023-11-11",
    //   location: "Central Fire Station",
    //   description:
    //     "Join our first responders in a blood drive to help our community's hospitals. Every pint counts!",
    //   imageUrl: `${image}`,
    //   category: "First Responders",
    // },
    // {
    //   id: 8,
    //   title: "Holiday Season Blood Drive",
    //   startDate: "2023-11-20",
    //   endDate: "2023-12-15",
    //   location: "Downtown Convention Center",
    //   description:
    //     "The gift of blood is the gift of life. During this season of giving, please consider donating blood to help those in need.",
    //   imageUrl: `${image}`,
    //   category: "Seasonal",
    // },
  // ];

  // const navigateToDonationEventDetails = (DonationEventId: number) => {
  //   // console.log(`Navigate to details of project with id: ${projectId}`);
  //   window.location.href = "/ShowEventPage";
  // };

  // const [open, setOpen] = useState(false);

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
          {DonationEvents.map((DonationEvent) => (
            <li
              // key={DonationEvent.id}
              key={DonationEvent.eventId}
              // onClick={() => navigateToDonationEventDetails(DonationEvent.id)}
              className="flex flex-col col-span-1 text-center transition duration-500 transform bg-white divide-y divide-gray-200 rounded-lg shadow cursor-pointer hover:scale-105 hover:shadow-lg"
            >
              <div className="flex flex-col flex-1 p-8">
                <img
                  className="w-3/4 h-auto mx-auto rounded-lg"
                  src={`${image}`}
                  alt={DonationEvent.title}
                />
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
          ))}
        </ul>
      </div>
    </div>
  );
}
