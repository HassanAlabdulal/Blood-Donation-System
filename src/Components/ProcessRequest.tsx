import React, { useState } from "react";
import {supabase} from "../utils/supabase"

type Recipient = {
  id: string;
  name: string;
  bloodType: string;
};

export default function ProcessRequest() {
  const [events] = useState([
    { id: "event1", name: "Annual Blood Drive" },
    { id: "event2", name: "Community Blood Donation" },
  ]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [recipientIdInput, setRecipientIdInput] = useState("");
  const [recipientData, setRecipientData] = useState<Recipient>({
    id: "",
    name: "",
    bloodType: "",
  });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [cost, setCost] = useState("");

  const recipients: Recipient[] = [
    { id: "1112223334", name: "John Doe", bloodType: "A+" },
    { id: "2223334445", name: "Jane Smith", bloodType: "O-" },
    { id: "5775775588", name: "John Doe", bloodType: "A+" },
    { id: "3892974858", name: "Jane Smith", bloodType: "O-" },
    { id: "7900482028", name: "John Doe", bloodType: "A+" },
    { id: "8494004284", name: "Jane Smith", bloodType: "O-" },
    // ... more recipients
  ];

  // Filter recipients based on the input
  const filteredRecipients = recipients.filter((r) =>
    r.id.includes(recipientIdInput)
  );

  const handleEventChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
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

  const handleCostChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setCost(event.target.value);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    // Handle the form submission
    console.log({
      selectedEvent,
      recipientData,
      cost,
    });
  };

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
                value={recipientIdInput}
                onChange={handleRecipientIdChange}
                className="w-full px-3 py-2 leading-tight text-gray-700 bg-gray-200 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                placeholder="Enter ID"
              />
              {showSuggestions && (
                <ul className="absolute z-10 w-full overflow-auto bg-white shadow-md max-h-60">
                  {filteredRecipients.map((recipient) => (
                    <li
                      key={recipient.id}
                      onClick={() => handleSelectRecipient(recipient)}
                      className="p-2 cursor-pointer hover:bg-gray-100"
                    >
                      {recipient.id}
                    </li>
                  ))}
                </ul>
              )}
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
                type="text"
                value={cost}
                onChange={handleCostChange}
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
