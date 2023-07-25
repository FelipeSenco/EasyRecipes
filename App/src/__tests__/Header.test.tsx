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

const queryClient = new QueryClient();

const onRegisterMock = jest.fn();
const onLoginMock = jest.fn();

const renderHeader = () => {
  render(
    <MemoryRouter initialEntries={["/mock-route"]}>
      <Providers userApi={mockUserApi} buildOrdersApi={mockBuildOrdersApi} queryClient={queryClient}>
        <Routes>
          <Route path="/mock-route" element={<Header onRegisterClick={onRegisterMock} onLoginClick={onLoginMock} />} />
          <Route path="/" element={<div>Test Route</div>} />
          <Route path={AppRoutes.Create} element={<div>Test Create Route</div>} />
          <Route path={AppRoutes.WarcraftBuildOrders} element={<div>Selected Game Route</div>} />
          <Route path={AppRoutes.UserProfile} element={<div>Test User Route</div>} />
        </Routes>
      </Providers>
    </MemoryRouter>
  );
};

describe("Header", () => {
  beforeEach(() => {
    queryClient.setQueryData([queryKeys.userLogin], null);
  });

  test("Render the header component", () => {
    renderHeader();

    const header = screen.getByTestId("header");

    expect(header).not.toBeNull();
  });

  test("Clicking Title and Logo trigger '/' route", () => {
    renderHeader();

    const logoElement = screen.getByTestId("home-link-logo");

    act(() => {
      fireEvent.click(logoElement);
    });

    const routeTest = screen.getByText("Test Route");

    expect(routeTest).not.toBeNull();
  });

  test("Clicking Build Orders triggers '/{selectedGame}' route", () => {
    renderHeader();

    const buildOrderLink = screen.getByTestId("home-link");

    act(() => {
      fireEvent.click(buildOrderLink);
    });

    const routeTest = screen.getByText("Selected Game Route");

    expect(routeTest).not.toBeNull();
  });

  test("Clicking Create triggers '/create' route", () => {
    renderHeader();

    const button = screen.getByTestId("create-link");

    act(() => {
      fireEvent.click(button);
    });

    const routeTest = screen.getByText("Test Create Route");

    expect(routeTest).not.toBeNull();
  });

  test("Clicking Login calls onLoginClick", () => {
    renderHeader();

    const login = screen.getByTestId("login-button");

    act(() => {
      fireEvent.click(login);
    });

    expect(onLoginMock).toHaveBeenCalled();
  });

  test("Clicking Register calls onRegisterClick", () => {
    renderHeader();

    const register = screen.getByTestId("register-button");

    act(() => {
      fireEvent.click(register);
    });

    expect(onRegisterMock).toHaveBeenCalled();
  });

  test("If a user is logged in, UserProfileButton is available and Profile option will redirect to user-profile route", () => {
    queryClient.setQueryData([queryKeys.userLogin], mockUserOne);
    renderHeader();

    const userButton = screen.getByTestId("user-profile-button");

    act(() => {
      fireEvent.click(userButton);
    });
    const profileDropdownButton = screen.getByTestId("user-profile-dropdown-button");

    act(() => {
      fireEvent.click(profileDropdownButton);
    });

    const routeTest = screen.getByText("Test User Route");

    expect(routeTest).not.toBeNull();
  });
});
