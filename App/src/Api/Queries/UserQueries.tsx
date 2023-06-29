import { useContext } from "react";
import { ApplicationUser } from "../../Types/User";
import UserContext from "../../Contexts/UserContext";
import { UseMutationOptions, UseMutationResult, useMutation } from "react-query";

export const useCreateUserQuery = () => {
  const { createUser } = useContext(UserContext);
  return useMutation(createUser, {
    onError: (error: Error) => {
      console.error("Error creating user:", error);
    },
    onSuccess: (data, variables, context) => {
      console.log("User created successfully");
    },
  });
};
