import React, { useState, useEffect } from "react";
import Policy from "./Policy";
import PasswordStrengthIndicator from "./UI/PasswordStrengthIndicator";
import { MenuWithCheckbox } from "./UI/MenuWithCheckBox";
import { DefaultMenu } from "./UI/DefaultMenu";
import RadioButtonSelector from "./UI/RadioButtonSelector";
import {supabase} from "../utils/supabase"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faUser,
  faChevronLeft,
  faEye,
  faEyeSlash,
  faSquarePhoneFlip,
  faCalendarDays,
  faWeightScale,
  faIdCard,
  faEarthAmericas,
  faLocationDot,
  faRoad,
  faHashtag,
} from "@fortawesome/free-solid-svg-icons";

// import { createSupabaseBrowser } from "../utils/supabase.ts";
const bloodTypes = [
  { id: "blood-type-o", label: "+O" },
  { id: "blood-type-o", label: "-O" },
  { id: "blood-type-a", label: "+A" },
  { id: "blood-type-a", label: "-A" },
  { id: "blood-type-b", label: "+B" },
  { id: "blood-type-b", label: "-B" },
  { id: "blood-type-ab", label: "+AB" },
  { id: "blood-type-ab", label: "-AB" },
];

const userStatusOptions = [
  { id: "option1", label: "Donor" },
  { id: "option2", label: "Recepient" },
];

const diseaseItems = [
  { id: "disease1", label: "Allergies" },
  { id: "disease2", label: "Asthma" },
  { id: "disease3", label: "Bleeding Conditions" },
  { id: "disease4", label: "High Blood Pressure" },
  { id: "disease5", label: "Cancer" },
  { id: "disease6", label: "Chronic Illnesses" },
  { id: "disease7", label: "Hepatitis/Jaundice" },
  { id: "disease8", label: "HIV/AIDS" },
  { id: "disease9", label: "Malaria" },
  { id: "disease10", label: "Nothing" },
];

// const ShowIcon = () => <FontAwesomeIcon icon={faEye} />;
// const HideIcon = () => <FontAwesomeIcon icon={faEyeSlash} />;
const MAX_STEPS = 5;

const SignUp = () => {
  const [formStep, setFormStep] = useState(0);
  const [showPolicy, setShowPolicy] = useState(false);
  const [showReturnButton, setShowReturnButton] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [dateOfBirth, setDateOfBirth] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [pCode, setPCode] = useState("");
  const [weight, setWeight] = useState(0);
  const [phone, setPhone] = useState("");
  const [full_name, setName] = useState("");
  const [nationalID, setNationalID] = useState("");
  const [bloodType, setSelectedBloodType] = useState("");
  const handleBloodTypeChange = (selectedLabel: string) => {
    setSelectedBloodType(selectedLabel);
  };
  const [selectedOption, setSelectedOption] = useState<string>('');

  // Function to update the state
  const handleOptionChange = (selectedId: string) => {
    setSelectedOption(selectedId);
  };

  const [selectedDiseases, setSelectedDiseases] = useState(new Set<string>());

  const handleDiseaseSelectionChange = (newSelectedItems: Set<string>) => {
    setSelectedDiseases(newSelectedItems);
  };

  useEffect(() => {
    if (dateOfBirth) {
      const today = new Date();
      const birthDate = new Date(dateOfBirth);
      let age_now = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age_now--;
      }
      setAge(age_now);
    }
  }, [dateOfBirth]);

  const getMaxDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };
  const checkPasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (password.match(/(?=.*[0-9])/)) strength += 1;
    if (password.match(/(?=.*[!@#$%^&*])/)) strength += 1;
    if (password.match(/(?=.*[a-z])/)) strength += 1;
    if (password.match(/(?=.*[A-Z])/)) strength += 1;
    return strength;
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    setPassword(password);
    setPasswordStrength(checkPasswordStrength(password));
  };

    

  const handlePolicyClick = () => {
    setShowPolicy(true);
    setShowReturnButton(true);
  };

  const closePolicy = () => {
    setShowPolicy(false);
    setShowReturnButton(false);
  };
  const completeFormStep = () => {
    setFormStep((currentStep) => currentStep + 1);
  };

  const handleSignUp =async () => {
    try{
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        throw error
      }

      const user = data.user;
      if (user === null) throw new Error("User is null");

      const { error: profileError } = await supabase.from("profiles").upsert({
        id: user.id ?? "048cfcca-b936-45e1-b02a-b208945b48cd", 
        avatar_url: null,
        website:null,
        username: email,
        DoB:dateOfBirth,
        weight,
        phone,
        full_name,
        city,
        country,
        street,
        nationalID,
        postalCode: pCode,
        bloodType,
      });
      if (profileError) 
      {throw profileError}
      
      if(selectedOption === "option1"){
        const { error } = await supabase
        .from('Donor')
        .insert({PatientId: user.id })

        if(error){throw error}

      }
      else if(selectedOption === "option2"){
        const { error } = await supabase
        .from('Recipient')
        .insert({PatientId: user.id })

        if(error){throw error}
        
      }

      if (selectedDiseases.size > 0 || !selectedDiseases.has("Nothing") ){
        const { error } = await supabase
        .from('MedicalHistory')
        .insert({patientID: user.id })

        if(error){throw error}

        else{
          const selectedDiseasesArray = Array.from(selectedDiseases).map(disease => ({
            medicalPID: user.id,
            Disease: disease
          }));
          console.log(selectedDiseasesArray)
          
          const { error } = await supabase
            .from('Diseases')
            .insert(selectedDiseasesArray);
  
          if(error){throw error}

          
        }
      }

    }
    catch{
      console.error("Error during sign up:");
    }
  }

  const renderButton = () => {
    if (formStep > 4) {
        handleSignUp();
      return undefined;
    } else if (formStep === 4) {
      return (
        <button
          onClick={completeFormStep}
          type="button"
          className="w-full px-8 py-6 mt-6 text-white  disabled:bg-gray-400 disabled:cursor-not-allowed flex select-none items-center
           cursor-pointer justify-center rounded-lg bg-[#292828] border-2 border-[#292828] text-base font-bold align-middle transition-all
            duration-700 hover:bg-black focus:outline-none shadow-md hover:shadow-xl
            disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          Create Account
        </button>
      );
    } else {
      return (
        <button
          onClick={completeFormStep}
          type="button"
          className="w-full px-8 py-6 mt-6 text-white  disabled:bg-gray-400 disabled:cursor-not-allowed flex select-none items-center
          cursor-pointer justify-center rounded-lg bg-[#292828] border-2 border-[#292828] text-base font-bold align-middle transition-all
           duration-700 hover:bg-black focus:outline-none shadow-md hover:shadow-xl
           disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          Next Step
        </button>
      );
    }
  };

  const goToPreviousStep = () => {
    setFormStep((currentStep) => currentStep - 1);
  };
  return (
    <div className="relative flex flex-col items-start min-h-screen antialiased text-[#121212] bg-[#f7f7f7]">
      <div
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 80%, 0% 100%)",
          height: "34rem",
        }}
        className="absolute inset-x-0 top-0 bg-[#292828]"
      ></div>
      <div className="z-10 mx-auto mt-48 text-center">
        <h1 className="text-5xl font-semibold text-white">
          Welcome to <span className="font-bold ">DonorHub</span>
        </h1>
      </div>
      <div
        className={`z-10 w-full max-w-xl mx-auto mt-24 mb-24 overflow-hidden bg-[#f3f4f6] rounded-lg shadow-2xl ${
          showPolicy ? "opacity-100" : "opacity-100"
        }`}
      >
        <div className="px-16 py-10">
          <form>
            {formStep < MAX_STEPS && (
              <div className="flex items-center mb-2">
                {formStep > 0 && (
                  <button
                    onClick={goToPreviousStep}
                    type="button"
                    className="w-6 text-gray-400 transition-all duration-200 hover:text-gray-600"
                  >
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </button>
                )}
                <p className="mr-2 text-sm text-gray-700 ">
                  Step {formStep + 1} of {MAX_STEPS}
                </p>
              </div>
            )}
            {formStep === 0 && (
              <section className="flex flex-col">
                <h2 className="mb-8 text-3xl font-semibold ">
                  Personal Information
                </h2>
                <label className="px-1 mb-2 text-xs font-semibold">Name</label>
                <div className="flex mb-3">
                  <div className="z-10 flex items-center justify-center w-10 pl-1 text-center pointer-events-none">
                    <i className="text-lg text-gray-400 mdi mdi-email-outline">
                      <FontAwesomeIcon icon={faUser} />
                    </i>
                  </div>
                  <input
                    type="text"
                    className="w-full py-2 pl-10 pr-3 -ml-10 border-2 border-gray-200 rounded-lg outline-none focus:border-[#5f7fbf]"
                    placeholder="Hassan Alabdulal"
                    value={full_name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>
                <label className="px-1 mb-2 text-xs font-semibold">
                  National ID
                </label>
                <div className="flex mb-3">
                  <div className="z-10 flex items-center justify-center w-10 pl-1 text-center pointer-events-none">
                    <i className="text-lg text-gray-400 mdi mdi-email-outline">
                      <FontAwesomeIcon icon={faIdCard} />
                    </i>
                  </div>
                  <input
                    type="text"
                    className="w-full py-2 pl-10 pr-3 -ml-10 border-2 border-gray-200 rounded-lg outline-none focus:border-[#5f7fbf]"
                    placeholder="1111111111"
                    value={nationalID}
                    onChange={e => setNationalID(e.target.value)}
                  />
                </div>
                <label className="px-1 mb-2 text-xs font-semibold">
                  Phone Number
                </label>
                <div className="flex">
                  <div className="z-10 flex items-center justify-center w-10 pl-1 text-center pointer-events-none">
                    <i className="text-lg text-gray-400 mdi mdi-email-outline">
                      <FontAwesomeIcon icon={faSquarePhoneFlip} />
                    </i>
                  </div>
                  <input
                    type="text"
                    className="w-full py-2 pl-10 pr-3 -ml-10 border-2 border-gray-200 rounded-lg outline-none focus:border-[#5f7fbf]"
                    placeholder="+996555555555"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                  />
                </div>
                <label className="px-1 mt-3 mb-2 text-xs font-semibold">
                  Status
                </label>
                <div className="flex">
                  <RadioButtonSelector
                    name="Status"
                    options={userStatusOptions}
                    onChange={handleOptionChange}
                  />
                </div>
              </section>
            )}

            {formStep === 1 && (
              <section className="flex flex-col">
                <h2 className="mb-8 text-3xl font-semibold ">
                  Personal Information
                </h2>
                <label className="px-1 mb-2 text-xs font-semibold">Email</label>
                <div className="flex mb-3">
                  <div className="z-10 flex items-center justify-center w-10 pl-1 text-center pointer-events-none">
                    <i className="text-lg text-gray-400 mdi mdi-email-outline">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </i>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full py-2 pl-10 pr-3 -ml-10 border-2 border-gray-200 rounded-lg outline-none focus:border-[#5f7fbf]"
                    placeholder="donorhub@example.com"
                  />
                </div>
                <label className="px-1 mb-2 text-xs font-semibold">
                  Password
                </label>
                <div className="relative flex mb-3">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FontAwesomeIcon icon={faLock} className="text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handlePasswordChange}
                    className="w-full py-2 pl-10 pr-10 border-2 border-gray-200 rounded-lg outline-none focus:border-[#5f7fbf] placeholder-gray-500"
                    placeholder="********"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    type="button"
                  >
                    {showPassword ? (
                      <FontAwesomeIcon
                        icon={faEyeSlash}
                        className="text-gray-400"
                      />
                    ) : (
                      <FontAwesomeIcon icon={faEye} className="text-gray-400" />
                    )}
                  </button>
                </div>
                <PasswordStrengthIndicator strength={passwordStrength} />
                <p className="mb-2 text-xs text-gray-600">
                  Password strength indicator
                </p>
                <label className="px-1 mb-2 text-xs font-semibold">
                  Confirm Password
                </label>
                <div className="relative flex mb-3">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FontAwesomeIcon icon={faLock} className="text-gray-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    // Assuming you have a state to hold the confirm password value
                    // value={confirmPassword}
                    // onChange={handleConfirmPasswordChange}
                    className="w-full py-2 pl-10 pr-10 border-2 border-gray-200 rounded-lg outline-none focus:border-[#5f7fbf] placeholder-gray-500"
                    placeholder="********"
                  />
                  <button
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    type="button"
                  >
                    {showConfirmPassword ? (
                      <FontAwesomeIcon
                        icon={faEyeSlash}
                        className="text-gray-400"
                      />
                    ) : (
                      <FontAwesomeIcon icon={faEye} className="text-gray-400" />
                    )}
                  </button>
                </div>
              </section>
            )}

            {formStep === 2 && (
              <section className="flex flex-col">
                <h2 className="mb-8 text-3xl font-semibold ">
                  Health Information
                </h2>

                <div className="flex items-end gap-4 mb-4">
                  <div className="flex-1">
                    <label
                      className="block px-1 mb-2 text-xs font-semibold"
                      htmlFor="date-of-birth"
                    >
                      Date of Birth
                    </label>
                    <input
                      className="block w-full px-3 py-2 mt-1 text-gray-700 bg-white rounded-md"
                      id="date-of-birth"
                      type="date"
                      max={getMaxDate()}
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                    />
                  </div>
                  <div className="relative flex-1">
                    <label
                      className="block px-1 mb-2 text-xs font-semibold"
                      htmlFor="age"
                    >
                      Age
                    </label>
                    <div className="relative flex items-center">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <FontAwesomeIcon
                          icon={faCalendarDays}
                          className="text-gray-400"
                        />
                      </div>
                      <input
                        className="block w-full px-3 py-2 pl-10 mt-1 bg-white border rounded-md" // Padding adjusted to make space for the icon
                        id="age"
                        type="text"
                        value={age}
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <label className="px-1 mb-2 text-xs font-semibold">
                  Weight
                </label>
                <div className="flex mb-4">
                  <div className="z-10 flex items-center justify-center w-10 pl-1 text-center pointer-events-none">
                    <i className="text-lg text-gray-400 mdi mdi-email-outline">
                      <FontAwesomeIcon icon={faWeightScale} />
                    </i>
                  </div>
                  <input
                    type="number"
                    className="w-full py-2 pl-10 pr-3 -ml-10 border-2 border-gray-200 rounded-lg outline-none focus:border-[#5f7fbf]"
                    placeholder="80kg"
                    value={weight}
                    onChange={e => setWeight(e.target.valueAsNumber)}
                  />
                </div>
                <label className="px-1 mb-2 text-xs font-semibold">
                  Blood Type
                </label>
                <DefaultMenu items={bloodTypes} onItemSelect={handleBloodTypeChange} />
                
                <label className="px-1 mt-4 mb-2 text-xs font-semibold">
                  Diseases
                </label>
                <MenuWithCheckbox items={diseaseItems} onSelectedItemsChange={handleDiseaseSelectionChange}/>
                
              </section>
            )}

            {formStep === 3 && (
              <section className="flex flex-col">
                <h2 className="mb-8 text-3xl font-semibold ">Address</h2>
                <label className="px-1 mb-2 text-xs font-semibold">
                  Country
                </label>
                <div className="flex mb-4">
                  <div className="z-10 flex items-center justify-center w-10 pl-1 text-center pointer-events-none">
                    <i className="text-lg text-gray-400 mdi mdi-email-outline">
                      <FontAwesomeIcon icon={faEarthAmericas} />
                    </i>
                  </div>
                  <input
                    type="text"
                    className="w-full py-2 pl-10 pr-3 -ml-10 border-2 border-gray-200 rounded-lg outline-none focus:border-[#5f7fbf]"
                    placeholder="Saudi Arabia"
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                  />
                </div>
                <label className="px-1 mb-2 text-xs font-semibold">City</label>
                <div className="flex mb-4">
                  <div className="z-10 flex items-center justify-center w-10 pl-1 text-center pointer-events-none">
                    <i className="text-lg text-gray-400 mdi mdi-email-outline">
                      <FontAwesomeIcon icon={faLocationDot} />
                    </i>
                  </div>
                  <input
                    type="text"
                    className="w-full py-2 pl-10 pr-3 -ml-10 border-2 border-gray-200 rounded-lg outline-none focus:border-[#5f7fbf]"
                    placeholder="Dhahran"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                  />
                </div>
                <label className="px-1 mb-2 text-xs font-semibold">
                  Street
                </label>
                <div className="flex mb-4">
                  <div className="z-10 flex items-center justify-center w-10 pl-1 text-center pointer-events-none">
                    <i className="text-lg text-gray-400 mdi mdi-email-outline">
                      <FontAwesomeIcon icon={faRoad} />
                    </i>
                  </div>
                  <input
                    type="text"
                    className="w-full py-2 pl-10 pr-3 -ml-10 border-2 border-gray-200 rounded-lg outline-none focus:border-[#5f7fbf]"
                    placeholder="Abdullah Ibn Al Abbas Street"
                    value={street}
                    onChange={e => setStreet(e.target.value)}
                  />
                </div>
                <label className="px-1 mb-2 text-xs font-semibold">
                  Postal Code
                </label>
                <div className="flex mb-4">
                  <div className="z-10 flex items-center justify-center w-10 pl-1 text-center pointer-events-none">
                    <i className="text-lg text-gray-400 mdi mdi-email-outline">
                      <FontAwesomeIcon icon={faHashtag} />
                    </i>
                  </div>
                  <input
                    type="text"
                    className="w-full py-2 pl-10 pr-3 -ml-10 border-2 border-gray-200 rounded-lg outline-none focus:border-[#5f7fbf]"
                    placeholder="32227"
                    value={pCode}
                    onChange={e => setPCode(e.target.value)}
                  />
                </div>
              </section>
            )}

            {formStep === 4 && (
              <section>
                <h2 className="mb-8 text-3xl font-semibold ">
                  Legal Information
                </h2>
                <div className="flex items-center">
                  <input type="radio" />

                  <span className="ml-2">
                    I agree with{" "}
                    <span>
                      <a
                        onClick={handlePolicyClick}
                        className="text-[#809bd0] underline cursor-pointer"
                      >
                        privacy and policy
                      </a>
                    </span>{" "}
                  </span>
                </div>
              </section>
            )}

            {/* Render Policy component conditionally */}
            {showPolicy && (
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div
                  className="absolute inset-0 bg-black bg-opacity-50"
                  onClick={closePolicy}
                ></div>

                <div className="z-50 p-4 bg-white rounded-lg shadow-lg opacity-100">
                  <Policy
                    onClose={closePolicy}
                    showReturnButton={showReturnButton}
                  />
                </div>
              </div>
            )}

            {formStep === 5 && (
              <section>
                <h2 className="mb-8 text-3xl font-semibold">
                  Your account has been successfully created!
                </h2>
              </section>
            )}
            {renderButton()}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
