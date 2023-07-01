import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../Components/App";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Providers from "../Contexts/Providers";
import { UserApi } from "../Api/UserApi";

jest.mock("../Api/UserApi");

const mockUserApi = new UserApi();

describe("App", () => {
  test("Renders the app component", () => {
    render(
      <MemoryRouter>
        <Providers userApi={mockUserApi}>
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

    expect(app).toBeDefined();
    expect(header).toBeDefined();
    expect(main).toBeDefined();
    expect(footer).toBeDefined();
  });
});
