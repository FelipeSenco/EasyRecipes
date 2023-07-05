import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "../Components/App";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Providers from "../Contexts/Providers";
import { UserApi } from "../Api/UserApi";
import { act } from "react-dom/test-utils";
import Home from "../Components/Main/Home";
import { mockBuildOrdersApi } from "../__mocks__/mockApis";
import { QueryClient } from "react-query";
import { StarcraftBuildOrders, StormgateBuildOrders, WarcraftBuildOrders } from "../Components/Main/BuildOrders";

jest.mock("../Api/UserApi");

const mockUserApi = new UserApi();
const queryClient = new QueryClient();

const renderApp = () => {
  render(
    <MemoryRouter>
      <Providers userApi={mockUserApi} buildOrdersApi={mockBuildOrdersApi} queryClient={queryClient}>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <App />
                <Home />
              </div>
            }
          />
          <Route path="/warcraft" element={<WarcraftBuildOrders />} />
          <Route path="/starcraft" element={<StarcraftBuildOrders />} />
          <Route path="/stormgate" element={<StormgateBuildOrders />} />
        </Routes>
      </Providers>
    </MemoryRouter>
  );
};

describe("GameSelection", () => {
  test("Renders the game selection", async () => {
    renderApp();
    const gameSelection = screen.getByTestId("game-selection");

    await waitFor(() => expect(gameSelection).not.toBeNull());
  });

  test("Clicking Starcraft change the game selection", async () => {
    renderApp();

    const button = screen.getByTestId("starcraft-button");

    act(() => {
      fireEvent.click(button);
    });

    const starcraft = screen.getByTestId("starcraft-build-orders");

    await waitFor(() => expect(starcraft).not.toBeNull());
  });

  test("Clicking Stormgate change the game selection", async () => {
    renderApp();

    const button = screen.getByTestId("stormgate-button");

    act(() => {
      fireEvent.click(button);
    });

    const stormgate = screen.getByTestId("stormgate-build-orders");

    await waitFor(() => expect(stormgate).not.toBeNull());
  });

  test("Clicking Warcraft change the game selection", async () => {
    renderApp();

    const button = screen.getByTestId("warcraft-button");

    act(() => {
      fireEvent.click(button);
    });

    const warcraft = screen.getByTestId("warcraft-build-orders");
    await waitFor(() => expect(warcraft).not.toBeNull());
  });
});
