import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../Components/App";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Providers from "../Contexts/Providers";
import { UserApi } from "../Api/UserApi";
import { BuildOrdersApi } from "../Api/BuildOrdersApi";
import { mockBuildOrdersApi } from "../__mocks__/mockApis";
import { QueryClient } from "react-query";

jest.mock("../Api/UserApi");

const mockUserApi = new UserApi();
const queryClient = new QueryClient();

describe("App", () => {
  test("Renders the app component", () => {
    render(
      <MemoryRouter>
        <Providers userApi={mockUserApi} buildOrdersApi={mockBuildOrdersApi} queryClient={queryClient}>
          <Routes>
            <Route path="/" element={<App />} />
          </Routes>
        </Providers>
      </MemoryRouter>
    );

    const app = screen.getByTestId("app-container");
    const header = screen.getByTestId("header-container");
    const main = screen.getByTestId("main-container");
    const footer = screen.getByTestId("footer");

    expect(app).not.toBeNull();
    expect(header).not.toBeNull();
    expect(main).not.toBeNull();
    expect(footer).not.toBeNull();
  });
});
