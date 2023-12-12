import React, { useState, useEffect } from "react";
import {supabase} from "../utils/supabase"

type Recipient = {
  id: string;
  name: string;
  bloodType: string;
};

type EventList = {
  id: string;
  name: string;
}


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
export default function ProcessRequest() {


  const [error, setError] = useState<string | null>(null);


  const [events, setEvents] = useState<EventList[]>([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [recipientID, setRecipientIdInput] = useState("");
  const [recipientData, setRecipientData] = useState<Recipient>({
    id: "",
    name: "",
    bloodType: "",
  });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [deliveryCost, setCost] = useState(0);

  

  // Filter recipients based on the input


  const handleEventChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    console.log(event.target.value)
    setSelectedEvent(event.target.value);
  };

  const handleRecipientIdChange = async (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setRecipientIdInput(event.target.value);
    setShowSuggestions(true);

    const { data, error } = await supabase
    .from('profiles')
    .select()
    .eq('id', event.target.value)

    // console.log(data.)

    if (data){
      setRecipientData({
        bloodType: data[0].bloodType,
        name: data[0].full_name,
        id: data[0].id
      })
    }
  };

  const handleSelectRecipient = (recipient: Recipient) => {
    setRecipientIdInput(recipient.id);
    setRecipientData(recipient);
    setShowSuggestions(false);
  };

 

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    // Handle the form submission
    const {error} = await supabase
    .from('Donation')
    .insert({
      deliveryCost,
      adminId: "70d7059d-3581-451a-811a-002236cb91bf", // TO BE Done
      recipientID,
      eventId: selectedEvent,
    })

    if (error) {console.log(error)}
  };

  const fetchEvents = async () => {
    const { data, error } = await supabase.from("DonationEvent").select();
  
    if (error) {
      console.error(error);
      setError('Failed to fetch events'); // Set error message
      return [];
    }
    
    if (data) {
      // Directly assign the data to DonationEvents as it's already in the correct format
      const Events: EventList[] = data.map(e => ({id: e.eventId, name: e.title}));
      return Events;
    }
  
    return [];
  };
  
  useEffect(() => {
    fetchEvents().then(events => {
      setEvents(events.map(e => ({id:e.id, name: e.name})));
    }).catch(err => {
      console.error('Error while fetching events:', err);
      setError('An error occurred while fetching events');
    });
  }, []);
  


  return (
    <div className="bg-[#f7f7f7] pt-16 flex flex-col items-center justify-center min-h-screen font-roboto">
      <div className="flex flex-col items-center w-full max-w-4xl p-8 space-y-8 overflow-hidden bg-white rounded-lg shadow-lg">
        <h1 className="mb-8 text-2xl font-semibold text-center text-gray-900">
          Process For Blood Request
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Event
            </label>
            <select
              className="w-full px-3 py-2 leading-tight text-gray-700 bg-gray-200 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              value={selectedEvent}
              onChange={handleEventChange}
              required
            >
              <option value="">Select Event</option>
              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-4">
            <div className="relative mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Recipient ID
              </label>
              <input
                type="text"
                value={recipientID}
                onChange={handleRecipientIdChange}
                className="w-full px-3 py-2 leading-tight text-gray-700 bg-gray-200 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                placeholder="Enter ID"
              />
              
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={recipientData.name}
                className="w-full px-3 py-2 leading-tight text-gray-700 bg-gray-200 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                disabled
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Blood Type
              </label>
              <input
                type="text"
                value={recipientData.bloodType}
                className="w-full px-3 py-2 leading-tight text-gray-700 bg-gray-200 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                disabled
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Cost
              </label>
              <input
                type="number"
                value={deliveryCost}
                onChange={e => setCost(e.target.valueAsNumber)}
                className="w-full px-3 py-2 leading-tight text-gray-700 bg-gray-200 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                placeholder="Enter cost"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
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
