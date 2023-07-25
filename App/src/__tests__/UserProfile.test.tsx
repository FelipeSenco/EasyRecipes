import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Providers from "../Contexts/Providers";
import Header from "../Components/Header";
import { mockBuildOrdersApi, mockUserApi } from "../__mocks__/mockApis";
import { QueryClient } from "react-query";
import { AppRoutes } from "../Types&Globals/Routes";
import { queryKeys } from "../Types&Globals/queryKeys";
import { mockUserOne } from "../__mocks__/userMocks";
import UserProfile from "../Components/Main/User/UserProfile";

const queryClient = new QueryClient();

const renderUserProfile = () => {
  render(
    <MemoryRouter initialEntries={["/mock-route"]}>
      <Providers userApi={mockUserApi} buildOrdersApi={mockBuildOrdersApi} queryClient={queryClient}>
        <Routes>
          <Route path="/mock-route" element={<UserProfile />} />
          <Route path={AppRoutes.Home} element={<div>Test Home Route</div>} />
        </Routes>
      </Providers>
    </MemoryRouter>
  );
};

describe("User Profile", () => {
  test("Render the user profile page if a user is defined", async () => {
    queryClient.setQueryData([queryKeys.userLogin], mockUserOne);
    renderUserProfile();

    const userProfile = screen.getByTestId("user-profile-page");

    expect(userProfile).not.toBeNull();
  });

  test("Redirect to home route if a user is not defined", async () => {
    queryClient.setQueryData([queryKeys.userLogin], null);
    renderUserProfile();

    const userProfile = document.querySelector(`[data-testid="user-profile-page"]`);
    const homeRoute = screen.getByText("Test Home Route");

    expect(userProfile).toBeNull();
    expect(homeRoute).not.toBeNull();
  });
});
