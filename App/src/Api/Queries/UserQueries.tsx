import { useContext } from "react";
import UserContext from "../../Contexts/UserContext";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { queryKeys } from "../../Types&Globals/queryKeys";
import { ApplicationUser } from "../../Types&Globals/User";

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

export const useUserQuery = () => {
  return useQuery([queryKeys.userLogin], {
    enabled: false,
    initialData: null,
  });
};

export const useLoginUserMutation = () => {
  const { login } = useContext(UserContext);
  const queryClient = useQueryClient();
  return useMutation(login, {
    onError: (error: Error) => {
      console.log(error);
    },
    onSuccess: (data: ApplicationUser) => {
      queryClient.setQueryData(queryKeys.userLogin, data);
    },
  });
};
