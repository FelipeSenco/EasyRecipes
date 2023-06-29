import React, { FC, useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import UserContext from "../../Contexts/UserContext";
import { ApplicationUser } from "../../Types/User";
import { emailRegex } from "../../utils";
import { CountryDropdown } from "react-country-region-selector";
import { useCreateUserQuery } from "../../Api/Queries/UserQueries";
import LoadingModal from "./LoadingModal";

const RegisterModal: FC = () => {
  const userContext = useContext(UserContext);
  const { registerModalOpen, setRegisterModalOpen } = userContext;
  const createUser = useCreateUserQuery();

  //input states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date("01/01/2000"));

  //validation states
  const [firstNameValid, setFirstNameValid] = useState(false);
  const [lastNameValid, setLastNameValid] = useState(false);
  const [countryValid, setCountryValid] = useState(false);
  const [userNameValid, setUserNameValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [dateOfBirthValid, setDateOfBirthValid] = useState(false);
  const [showValidationMessages, setShowValidationMessages] = useState(false);
  const [allInputsValid, setAllInputsValid] = useState(false);

  useEffect(() => {
    setAllInputsValid(validateInputs());
  }, [userName, password, confirmPassword, email, dateOfBirth, firstName, lastName, country]);

  const handleRegister = async () => {
    const userData: ApplicationUser = {
      userName,
      password,
      email,
      dateOfBirth,
    };
    if (allInputsValid) {
      createUser.mutate(userData);
    } else {
      setShowValidationMessages(true);
    }
  };

  const validateInputs = () => {
    const firstNameValid = firstName.length > 0 && firstName.length <= 20;
    const lastNameValid = lastName.length > 0 && lastName.length <= 20;
    const countryValid = country.length > 0 && country.length <= 30;
    const userNameValid = userName.length >= 3 && userName.length <= 30;
    const passwordValid = password.length >= 8 && password.length <= 16;
    const confirmPasswordValid = confirmPassword.length >= 8 && confirmPassword.length <= 16 && confirmPassword === password;
    const emailValid = email.length >= 8 && email.length <= 50 && emailRegex.test(email);
    const dateValid = !isNaN(dateOfBirth.getTime()) && dateOfBirth.getTime() < new Date().getTime();

    setFirstNameValid(firstNameValid);
    setLastNameValid(lastNameValid);
    setCountryValid(countryValid);
    setUserNameValid(userNameValid);
    setPasswordValid(passwordValid);
    setConfirmPasswordValid(confirmPasswordValid);
    setEmailValid(emailValid);
    setDateOfBirthValid(dateValid);

    return userNameValid && passwordValid && confirmPasswordValid && emailValid && dateValid && firstNameValid && lastNameValid && countryValid;
  };

  Modal.setAppElement("#root");

  if (!registerModalOpen) {
    return null;
  }

  if (createUser.isLoading) {
    return <LoadingModal open={registerModalOpen} />;
  }

  if (createUser.isSuccess) {
    return <RegistrationSuccessFulModal open={registerModalOpen} />;
  }

  return (
    <Modal
      shouldCloseOnOverlayClick={false}
      isOpen={registerModalOpen}
      onRequestClose={() => setRegisterModalOpen(false)}
      contentLabel="Register Modal"
      style={{
        content: {
          maxWidth: "500px",
          maxHeight: "700px",
          width: "500px",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
        },
      }}
    >
      <h2 className="font-bold text-2xl mb-4">Register</h2>
      <div className="mb-4">
        <input
          maxLength={30}
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {showValidationMessages && !firstNameValid && <p className="text-red-500 text-xs italic">Please enter a valid first name.</p>}
      </div>
      <div className="mb-4">
        <input
          maxLength={30}
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {showValidationMessages && !lastNameValid && <p className="text-red-500 text-xs italic">Please enter a valid last name.</p>}
      </div>
      <div className="mb-4">
        <CountryDropdown
          value={country}
          onChange={(value) => setCountry(value)}
          classes="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {showValidationMessages && !countryValid && <p className="text-red-500 text-xs italic">Please enter a valid country.</p>}
      </div>
      <div className="mb-4">
        <input
          maxLength={30}
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {showValidationMessages && !userNameValid && <p className="text-red-500 text-xs italic">Please enter a valid username.</p>}
      </div>
      <div className="mb-4">
        <input
          maxLength={50}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {showValidationMessages && !emailValid && <p className="text-red-500 text-xs italic">Please enter a valid email.</p>}
      </div>
      <div className="mb-4">
        <input
          type="date"
          placeholder="Date Of Birth"
          value={dateOfBirth.toISOString()?.split("T")[0]}
          onChange={(e) => {
            if (!isNaN(Date.parse(e.target.value))) {
              setDateOfBirth(new Date(e.target.value));
            }
          }}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {showValidationMessages && !dateOfBirthValid && <p className="text-red-500 text-xs italic">Please enter your date of birth.</p>}
      </div>
      <div className="mb-4">
        <input
          maxLength={16}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {showValidationMessages && !passwordValid && <p className="text-red-500 text-xs italic">Please enter a valid password. (min. 8 characters)</p>}
      </div>
      <div className="mb-4">
        <input
          maxLength={16}
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {showValidationMessages && !confirmPasswordValid && <p className="text-red-500 text-xs italic">Please confirm your password.</p>}
      </div>
      {createUser.isError && <p className="text-red-500 text-m italic bold mb-4">An error occurred while registering. Please try again.</p>}
      <div className="flex justify-between">
        <button onClick={handleRegister} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
        <button onClick={() => setRegisterModalOpen(false)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default RegisterModal;

const RegistrationSuccessFulModal: FC<{ open: boolean }> = ({ open = false }) => {
  const userContext = useContext(UserContext);
  const { setRegisterModalOpen } = userContext;
  Modal.setAppElement("#root");

  if (!open) {
    return null;
  }

  return (
    <Modal
      isOpen={open}
      onRequestClose={() => setRegisterModalOpen(false)}
      contentLabel="Registration Successful Modal"
      style={{
        content: {
          maxWidth: "500px",
          maxHeight: "300px",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
        },
      }}
    >
      <h2 className="font-bold text-2xl mb-4">Registration Successful</h2>
      <p className="mb-4">Your registration was successful.</p>
      <button onClick={() => setRegisterModalOpen(false)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Ok
      </button>
    </Modal>
  );
};
