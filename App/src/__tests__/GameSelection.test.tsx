import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "../Components/App";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Providers from "../Contexts/Providers";
import { act } from "react-dom/test-utils";
import Home from "../Components/Main/Home";
import { mockBuildOrdersApi, mockUserApi } from "../__mocks__/mockApis";
import { QueryClient } from "react-query";
import { WarcraftBuildOrders } from "../Components/Main/Warcraft/WarcraftBuildOrders";
import { StarcraftBuildOrders } from "../Components/Main/Starcraft/StarcraftBuildOrders";
import { StormgateBuildOrders } from "../Components/Main/Stormgate/StormgateBuildOrders";
import Header from "../Components/Header";
import { queryKeys } from "../Types&Globals/queryKeys";
import { mockUserOne } from "../__mocks__/userMocks";

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

const renderCreate = () => {
  render(
    <MemoryRouter initialEntries={["/test/create"]}>
      <Providers userApi={mockUserApi} buildOrdersApi={mockBuildOrdersApi} queryClient={queryClient}>
        <Routes>
          <Route
            path="/test/create"
            element={
              <div>
                <App />
                <Home />
              </div>
            }
          />
          <Route path="/warcraft/create" element={<div>Test warcraft create route</div>} />
          <Route path="/starcraft/create" element={<div>Test starcraft create route</div>} />
          <Route path="/stormgate/create" element={<div>Test stormgate create route</div>} />
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

  test("Clicking Starcraft triggers stracraft route", async () => {
    renderApp();

    const button = screen.getByTestId("starcraft-button");

    act(() => {
      fireEvent.click(button);
    });

    const starcraft = screen.getByTestId("starcraft-build-orders");

    await waitFor(() => expect(starcraft).not.toBeNull());
  });

  test("Clicking Stormgate  triggers stormgate route", async () => {
    renderApp();

    const button = screen.getByTestId("stormgate-button");

    act(() => {
      fireEvent.click(button);
    });

    const stormgate = screen.getByTestId("stormgate-build-orders");

    await waitFor(() => expect(stormgate).not.toBeNull());
  });

  test("Clicking Warcraft triggers warcraft route", async () => {
    renderApp();

    const button = screen.getByTestId("warcraft-button");

    act(() => {
      fireEvent.click(button);
    });

    const warcraft = screen.getByTestId("warcraft-build-orders");
    await waitFor(() => expect(warcraft).not.toBeNull());
  });

  test("Clicking Warcraft triggers `/warcraft/create` route, if the initial route was `{game}/create`", async () => {
    queryClient.setQueryData([queryKeys.userLogin], mockUserOne);
    renderCreate();

    const button = screen.getByTestId("warcraft-button");

    act(() => {
      fireEvent.click(button);
    });

    const warcraft = screen.getByText("Test warcraft create route");
    await waitFor(() => expect(warcraft).not.toBeNull());
  });

  test("Clicking Starcraft triggers `/starcraft/create` route, if the initial route was `{game}/create`", async () => {
    queryClient.setQueryData([queryKeys.userLogin], mockUserOne);
    renderCreate();

    const button = screen.getByTestId("starcraft-button");

    act(() => {
      fireEvent.click(button);
    });

    const starcraft = screen.getByText("Test starcraft create route");
    await waitFor(() => expect(starcraft).not.toBeNull());
  });

  test("Clicking Stormgate triggers `/stormgate/create` route, if the initial route was `{game}/create`", async () => {
    queryClient.setQueryData([queryKeys.userLogin], mockUserOne);
    renderCreate();

    const button = screen.getByTestId("stormgate-button");

    act(() => {
      fireEvent.click(button);
    });

    const stormgate = screen.getByText("Test stormgate create route");
    await waitFor(() => expect(stormgate).not.toBeNull());
  });
});
