import React from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import Providers from "../Contexts/Providers";
import { UserApi } from "../Api/UserApi";
import Header from "../Components/Header";
import { BuildOrdersApi } from "../Api/BuildOrdersApi";

jest.mock("../Api/UserApi");
jest.mock("../Api/BuildOrdersApi");

const mockUserApi = new UserApi();
const mockBuildOrdersApi = new BuildOrdersApi();

const onRegisterMock = jest.fn();
const onLoginMock = jest.fn();

const renderHeader = () => {
  render(
    <MemoryRouter initialEntries={["/mock-route"]}>
      <Providers userApi={mockUserApi} buildOrdersApi={mockBuildOrdersApi}>
        <Routes>
          <Route path="/mock-route" element={<Header onRegisterClick={onRegisterMock} onLoginClick={onLoginMock} />} />
          <Route path="/" element={<div>Test Route</div>} />
        </Routes>
      </Providers>
    </MemoryRouter>
  );
};

describe("Header", () => {
  test("Render the header component", () => {
    renderHeader();

    const header = screen.getByTestId("header");

    expect(header).toBeDefined();
  });

  test("Clicking Title and Logo trigger '/' route", () => {
    renderHeader();

    const logoElement = screen.getByTestId("home-link-logo");

    act(() => {
      fireEvent.click(logoElement);
    });

    const routeTest = screen.getByText("Test Route");

    expect(routeTest).toBeDefined();
  });

  test("Clicking Build Orders triggers '/' route", () => {
    renderHeader();

    const buildOrderLink = screen.getByTestId("home-link");

    act(() => {
      fireEvent.click(buildOrderLink);
    });

    const routeTest = screen.getByText("Test Route");

    expect(routeTest).toBeDefined();
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
});
