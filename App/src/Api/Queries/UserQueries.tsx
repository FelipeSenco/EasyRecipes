import { useContext } from "react";
import UserContext from "../../Contexts/UserContext";
import { UseQueryResult, useMutation, useQuery, useQueryClient } from "react-query";
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

export const useUserQuery = (): UseQueryResult<ApplicationUser, unknown> => {
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

export const useLogoutUserMutation = () => {
  const { logout } = useContext(UserContext);
  const queryClient = useQueryClient();
  return useMutation(logout, {
    onError: (error: Error) => {
      console.log(error);
    },
    onSuccess: (data: null) => {
      queryClient.setQueryData(queryKeys.userLogin, data);
    },
  });
};
