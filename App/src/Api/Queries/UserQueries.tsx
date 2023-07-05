import { useContext } from "react";

import UserContext from "../../Contexts/UserContext";
import { useMutation } from "react-query";

export const useCreateUserQuery = () => {
  const { createUser } = useContext(UserContext);
  return useMutation(createUser, {
    onError: (error: Error) => {
      console.log(error);
    },
    onSuccess: (data, variables, context) => {
      console.log("User created successfully");
    },
  });
};
