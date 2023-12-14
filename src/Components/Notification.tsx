import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import notificationImage from "../Assets/notification.gif";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabase";
import { User } from "@supabase/supabase-js";

interface NotificationType {
  id: string;
  type: string;
  from: string;
  isCompleted: boolean;
  recipientBT: string;
}

interface NotificationItemProps {
  notification: NotificationType;
  onAccept: (notification: NotificationType) => void;
  onPay: (notification: NotificationType) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onAccept,
  onPay,
}) => {
  // Use a base class for buttons to standardize their size
  const buttonBaseClass =
    "inline-flex items-center justify-center font-bold rounded text-white transition-colors duration-500";
  const buttonFixedSizeClass = "w-28 h-10"; // Adjust the width (w-28) and height (h-10) as needed to fit your design
  const acceptButtonClass = `${buttonBaseClass} ${buttonFixedSizeClass} bg-[#5f7fbf] hover:bg-[#3e60a3]`;
  const payButtonClass = `${buttonBaseClass} ${buttonFixedSizeClass} bg-[#292828] hover:bg-black`;
  return (
    <tr className="border-b">
      <td className="px-5 py-3 text-center">{notification.type}</td>
      <td className="px-5 py-3 text-center">{notification.from}</td>
      <td className="px-5 py-3">
        <div className="flex items-center justify-center">
          {notification.isCompleted ? (
            <FontAwesomeIcon icon={faCheck} className="text-green-500" />
          ) : notification.type === "Payment" ? (
            <button
              className={payButtonClass}
              onClick={() => onPay(notification)}
              // to="/Payment"
            >
              <FontAwesomeIcon icon={faDollarSign} className="mr-2" />
              Pay
            </button>
          ) : (
            <button
              className={acceptButtonClass}
              onClick={() =>  onAccept(notification)}
            >
              <FontAwesomeIcon icon={faCheck} className="mr-2" />
              Accept
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

const bloodTypeCompatibility: Record<string, string[]> = {
  'A+': ['A+', '+A', 'A-', '-A', 'O+', '+O', 'O-', '-O'],
  '+A': ['A+', '+A', 'A-', '-A', 'O+', '+O', 'O-', '-O'],
  'A-': ['A-', '-A', 'O-', '-O'],
  '-A': ['A-', '-A', 'O-', '-O'],

  'B+': ['B+', '+B', 'B-', '-B', 'O+', '+O', 'O-', '-O'],
  '+B': ['B+', '+B', 'B-', '-B', 'O+', '+O', 'O-', '-O'],
  'B-': ['B-', '-B', 'O-', '-O'],
  '-B': ['B-', '-B', 'O-', '-O'],

  'AB+': ['AB+', '+AB', 'AB-', '-AB', 'A+', '+A', 'A-', '-A', 'B+', '+B', 'B-', '-B', 'O+', '+O', 'O-', '-O'],
  '+AB': ['AB+', '+AB', 'AB-', '-AB', 'A+', '+A', 'A-', '-A', 'B+', '+B', 'B-', '-B', 'O+', '+O', 'O-', '-O'],
  'AB-': ['AB-', '-AB', 'A-', '-A', 'B-', '-B', 'O-', '-O'],
  '-AB': ['AB-', '-AB', 'A-', '-A', 'B-', '-B', 'O-', '-O'],

  'O+': ['O+', '+O', 'O-', '-O'],
  '+O': ['O+', '+O', 'O-', '-O'],
  'O-': ['O-', '-O'],
  '-O': ['O-', '-O']
};
export default function Notification() {

  const [isRecipient, setIsRecipient] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [recipientBT, setRecipientBT] = useState("");
  const [donationDates, setDonationDates] = useState<Date[]>([]);
  const navigate = useNavigate();


  
  
  const [notifications, setNotifications] = useState<NotificationType[]>([
    {
      id: "1",
      type: "Payment",
      from: "Hassan Alabdulal",
      isCompleted: false,
      recipientBT: ""
    },
    {
      id: "2",
      type: "Donating",
      from: "Abdullah Al Matawah",
      isCompleted: false,
      recipientBT: "O+"
    },
  ]);

  useEffect(() => {
    getUser()
    getIsRecipient()
    getNotifications()
 })


  const getIsRecipient =async () => {
    const {data, error }= await supabase
    .from('Recipient')
    .select()


    if (data){
      setIsRecipient(data.map(e => (e.PatientId)).includes(user?.id))
    }
  }

  const getNotifications = async () => {
      if (isRecipient){
        const { data, error } = await supabase
        .from('donationnotification_r')
        .select()
        // .eq('recipientID', user?.id)

        
        if (data){
          setNotifications(
            data.map(e => ({
              id: e.donationId,
              type: "Payment",
              from: e.full_name,
              isCompleted: false,
              recipientBT: ""
            }))
          )
        }
      }
      else{
        const { data, error } = await supabase
        .from('donationnotification_d')
        .select()

        if (data){
          setNotifications(
            data.map(e => ({
              id: e.donationId,
              type: "Donating",
              from: e.full_name,
              isCompleted: false,
              recipientBT: e.bloodType
            }))
          )
          
        }
      }
  }


  const getUser =async () => {
    const {data, error} = await supabase.auth.getUser()
    if(error){console.log("Signed Out")}
    setUser(data.user)
  }

 


  const handleAccept = async (notification: { id: string }) => {
    // setNotifications((currentNotifications) =>
    //   currentNotifications.map((notif) =>
    //     notif.id === notification.id ? { ...notif, isCompleted: true } : notif
    //   )
    // );
    const RBT = notifications.find(notif => notif.id === notification.id)?.recipientBT!;
    const {data , error} = await supabase
    .from('profiles')
    .select()
    .eq('id', user?.id)

    if (data){
      console.log(data[0])
      const DoB = new Date(data[0].DoB);
      const weight = data[0].weight;
      const DBT = data[0].bloodType;
      await getDonationDates()

      if (hasSixMonthsPassed(donationDates) 
      && isSeventeenOrOlder(DoB)
      && weight >= 51.71
      && isBTDonater(RBT, DBT))
      {
        const {  error } = await supabase
        .from('Donation')
        .update({ 
          donationDate: new Date().toLocaleDateString(),
          donorID: user?.id
         })
        .eq('donationId', notification.id)

    // console.log(params.id)    
    // console.log(data)    
    navigate("/Main");
    window.location.reload(); 
      }
      else{alert("You can not donate ether because of\n- Your Age\n- Your weight\n- Your Blood Type\n- Your Last donation is not far")}

      
    }



    // navigate("/Main");
    // window.location.reload();
  };

  const handlePay = (notification: { id: string }) => {

    navigate("/Payment/"+ notification.id );

  };

  function isSeventeenOrOlder(dob: Date): boolean {
    const today = new Date();
    const currentYear = today.getFullYear();
    const dobYear = dob.getFullYear();
    let age = currentYear - dobYear;
    const currentMonth = today.getMonth();
    const dobMonth = dob.getMonth();
    if (currentMonth < dobMonth || (currentMonth === dobMonth && today.getDate() < dob.getDate())) {
      age--;
    }
    return age >= 17;
  }

  function isBTDonater(RBT: string, DBT: string): boolean {
    return bloodTypeCompatibility[RBT].includes(DBT);
  }

  function hasSixMonthsPassed(dates: Date[]): boolean {
    if (dates.length === 0) {return true;}
    const today = new Date();
    const sortedDates = dates.sort((a, b) => Math.abs(today.getTime() - a.getTime()) - Math.abs(today.getTime() - b.getTime()));
    const nearestDate = sortedDates[0];
    const monthDiff = (today.getFullYear() - nearestDate.getFullYear()) * 12 + today.getMonth() - nearestDate.getMonth();
    return monthDiff >= 6 || (monthDiff === 5 && today.getDate() >= nearestDate.getDate());
  }

  const getDonationDates =async () => {
    const {data , error} = await supabase
    .from('donateddonations')
    .select('donationDate')
    .eq('donorID', user?.id)

    if(data){ 

    setDonationDates(data.filter(e => e.donationDate != null).map(e => new Date(e.donationDate)))


    }







  }
  

  return (
    <div className="bg-[#f7f7f7] pt-16 flex flex-col items-center justify-center min-h-screen font-roboto">
      <div className="flex flex-col items-center w-full max-w-4xl p-8 space-y-8 overflow-hidden bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-gray-900">
          Notification Center
        </h1>

        {/* Image */}
        <div className="flex justify-center w-full">
          <img
            src={notificationImage}
            alt="Notification Center"
            className="w-1/2 h-1/2 max-xl:w-80 max-xl:h-80 max-lg:mt-24"
          />
        </div>

        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="px-5 py-3 text-center">Type</th>
              {isRecipient && (<th className="px-5 py-3 text-center">From</th>)}
              {!isRecipient && (<th className="px-5 py-3 text-center">For</th>)}
              <th className="px-5 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onAccept={handleAccept}
                onPay={handlePay}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
