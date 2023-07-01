import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { MemoryRouter, Route, Routes } from "react-router-dom";
import Providers from "../Contexts/Providers";
import { UserApi } from "../Api/UserApi";
import { BuildOrdersApi } from "../Api/BuildOrdersApi";
import { wc3BuildOrderMocks } from "../__mocks__/buildOrderMocks";
import WarcraftBuildOrderDetail, { WarcraftBuildOrderPage } from "../Components/Main/WarcraftBuildOrder";
import { act } from "react-dom/test-utils";

jest.mock("../Api/UserApi");
jest.mock("../Api/BuildOrdersApi");

const id = "1";
const mockUserApi = new UserApi();
const mockBuildOrdersApi = new BuildOrdersApi();

const queryDataMock = {
  data: wc3BuildOrderMocks[0],
  isFetching: false,
  isError: false,
  refetch: jest.fn(),
} as any;

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
  useParams: () => ({
    id: id, // this is the mock id value
  }),
}));

const renderComponent = (queryDataMock: any) => {
  render(
    <MemoryRouter initialEntries={["/", `/warcraft/build-order/${id}`]}>
      <Providers userApi={mockUserApi} buildOrdersApi={mockBuildOrdersApi}>
        <Routes>
          <Route path={`/warcraft/build-order/${id}`} element={<WarcraftBuildOrderDetail warcraftBuildOrderQuery={queryDataMock} />} />
          <Route path="/" element={<div data-testid="test-route">Test Route</div>} />
        </Routes>
      </Providers>
    </MemoryRouter>
  );
};

describe("Warcraft Build Order", () => {
  test("Render the component and call the api to fetch data", async () => {
    render(
      <MemoryRouter initialEntries={[`/warcraft/build-order/${id}`]}>
        <Providers userApi={mockUserApi} buildOrdersApi={mockBuildOrdersApi}>
          <Routes>
            <Route path={`/warcraft/build-order/${id}`} element={<WarcraftBuildOrderPage />} />
          </Routes>
        </Providers>
      </MemoryRouter>
    );

    const warcraft = screen.getByTestId("warcraft-build-order-page");

    await waitFor(() => {
      expect(warcraft).toBeDefined();
      expect(mockBuildOrdersApi.getWarcraftBuildOrderById).toHaveBeenCalledWith(id);
    });
  });

  test("Render the build order if data is loaded", async () => {
    renderComponent(queryDataMock);

    const notFound = document.querySelector(locators.notFound);
    const buildOrder = document.querySelector(locators.buildOrderList);
    const loading = document.querySelector(locators.loading);

    await waitFor(() => {
      expect(notFound).toBeNull();
      expect(buildOrder).toBeDefined();
      expect(loading).toBeNull();
    });
  });

  test("Render not found page if fetching errors", async () => {
    renderComponent({ ...queryDataMock, isError: true });

    const notFound = document.querySelector(locators.notFound);
    const buildOrder = document.querySelector(locators.buildOrderList);
    const loading = document.querySelector(locators.loading);

    await waitFor(() => {
      expect(notFound).toBeDefined();
      expect(buildOrder).toBeNull();
      expect(loading).toBeNull();
    });
  });

  test("Render loading modal if still fetching", async () => {
    renderComponent({ ...queryDataMock, isFetching: true });

    const notFound = document.querySelector(locators.notFound);
    const buildOrder = document.querySelector(locators.buildOrderList);
    const loading = document.querySelector(locators.loading);

    await waitFor(() => {
      expect(notFound).toBeNull();
      //list will be in the background
      expect(buildOrder).toBeDefined();
      expect(loading).toBeDefined();
    });
  });

  test("Clicking a Go Back button will redirect to '/", async () => {
    renderComponent(queryDataMock);

    const goBack = screen.getByTestId("go-back-button");

    act(() => {
      fireEvent.click(goBack);
    });

    const routTest = screen.getByTestId("test-route");

    await waitFor(() => {
      expect(routTest).toBeDefined();
    });
  });
});

const locators = {
  buildOrderList: `[data-testid="warcraft-build-order-${id}"]`,
  notFound: `[data-testid="not-found-page"]`,
  loading: `[data-testid="loading-modal"]`,
};
