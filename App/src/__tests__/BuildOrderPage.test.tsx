import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import Providers from "../Contexts/Providers";
import { UserApi } from "../Api/UserApi";
import { BuildOrderPage } from "../Components/Main/BuildOrders";
import { Games } from "../Types/enums";
import { mockBuildOrdersApi } from "../__mocks__/mockApis";
import { QueryClient } from "react-query";

jest.mock("../Api/UserApi");

const mockUserApi = new UserApi();
const queryClient = new QueryClient();

const renderComponent = (selectedGame: Games) => {
  render(
    <MemoryRouter>
      <Providers userApi={mockUserApi} buildOrdersApi={mockBuildOrdersApi} queryClient={queryClient}>
        <Routes>
          <Route path="/" element={<BuildOrderPage selectedGame={selectedGame} />} />
        </Routes>
      </Providers>
    </MemoryRouter>
  );
};

describe("Build Order Page", () => {
  test("Render the correct build order component if selected game is Warcraft 3", async () => {
    renderComponent(Games.Warcraft_III);

    const warcraft = screen.getByTestId("warcraft-build-orders");

    await waitFor(() => expect(warcraft).not.toBeNull());
  });

  test("Render the correct build order component if selected game is Starcraft 2", async () => {
    renderComponent(Games.Starcraft_II);

    const starcraft = screen.getByTestId("starcraft-build-orders");

    await waitFor(() => expect(starcraft).not.toBeNull());
  });

  test("Render the correct build order component if selected game is Stormgate", async () => {
    renderComponent(Games.Stormgate);

    const stormgate = screen.getByTestId("stormgate-build-orders");

    await waitFor(() => expect(stormgate).not.toBeNull());
  });
});
