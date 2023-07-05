import { useContext } from "react";
import { ApplicationUser } from "../../Types/User";
import UserContext from "../../Contexts/UserContext";
import { UseMutationOptions, UseMutationResult, useMutation } from "react-query";
import { onErrorLogger } from "../../utils";

export const useCreateUserQuery = () => {
  const { createUser } = useContext(UserContext);
  return useMutation(createUser, {
    onError: (error: Error) => {
      onErrorLogger(error);
    },
    onSuccess: (data, variables, context) => {
      console.log("User created successfully");
    },
  });
};
