import React from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import Providers from "../Contexts/Providers";
import { UserApi } from "../Api/UserApi";
import { BuildOrderPage } from "../Components/Main/BuildOrders";
import { Games } from "../Types/enums";
import { BuildOrdersApi } from "../Api/BuildOrdersApi";

jest.mock("../Api/UserApi");
jest.mock("../Api/BuildOrdersApi");

const mockUserApi = new UserApi();
const mockBuildOrdersApi = new BuildOrdersApi();

const renderComponent = (selectedGame: Games) => {
  render(
    <MemoryRouter>
      <Providers userApi={mockUserApi} buildOrdersApi={mockBuildOrdersApi}>
        <Routes>
          <Route path="/" element={<BuildOrderPage selectedGame={selectedGame} />} />
        </Routes>
      </Providers>
    </MemoryRouter>
  );
};

describe("Build Order Page", () => {
  test("Render the correct build order component if selected game is Warcraft 3", async () => {
    renderComponent(Games.WARCRAFT_3);

    const warcraft = screen.getByTestId("warcraft-build-orders");

    await waitFor(() => expect(warcraft).toBeDefined());
  });

  test("Render the correct build order component if selected game is Starcraft 2", async () => {
    renderComponent(Games.STARCRAFT_2);

    const starcraft = screen.getByTestId("starcraft-build-orders");

    await waitFor(() => expect(starcraft).toBeDefined());
  });

  test("Render the correct build order component if selected game is Stormgate", async () => {
    renderComponent(Games.STORMGATE);

    const stormgate = screen.getByTestId("stormgate-build-orders");

    await waitFor(() => expect(stormgate).toBeDefined());
  });
});
