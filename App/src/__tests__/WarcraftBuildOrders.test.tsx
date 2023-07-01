import React, { FC } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes, createMemoryRouter, useNavigate, useParams } from "react-router-dom";
import Providers from "../Contexts/Providers";
import { UserApi } from "../Api/UserApi";
import { WarcraftBuildOrderList, WarcraftBuildOrders } from "../Components/Main/BuildOrders";
import { BuildOrdersApi } from "../Api/BuildOrdersApi";
import { wc3BuildOrderMocks } from "../__mocks__/buildOrderMocks";
import WarcraftBuildOrderDetail from "../Components/Main/WarcraftBuildOrder";
import { act } from "react-dom/test-utils";

jest.mock("../Api/UserApi");
jest.mock("../Api/BuildOrdersApi");

const mockUserApi = new UserApi();
const mockBuildOrdersApi = new BuildOrdersApi();

const queryDataMock = {
  data: wc3BuildOrderMocks,
  isFetching: false,
  isError: false,
  refetch: jest.fn(),
} as any;

const RouterTester: FC = () => {
  const { id } = useParams();

  return <div>Test Route {id}</div>;
};

const renderList = (queryDataMock: any) => {
  render(
    <MemoryRouter>
      <Providers userApi={mockUserApi} buildOrdersApi={mockBuildOrdersApi}>
        <Routes>
          <Route path="/" element={<WarcraftBuildOrderList buildOrdersQuery={queryDataMock} />} />
          <Route path="/warcraft/build-order/:id" element={<RouterTester />} />
        </Routes>
      </Providers>
    </MemoryRouter>
  );
};

describe("Warcraft Build Orders", () => {
  test("Render the component and call the api to fetch data", async () => {
    render(
      <MemoryRouter>
        <Providers userApi={mockUserApi} buildOrdersApi={mockBuildOrdersApi}>
          <Routes>
            <Route path="/" element={<WarcraftBuildOrders />} />
          </Routes>
        </Providers>
      </MemoryRouter>
    );

    const warcraft = screen.getByTestId("warcraft-build-orders");

    await waitFor(() => {
      expect(warcraft).toBeDefined();
      expect(mockBuildOrdersApi.getWarcraftBuildOrders).toHaveBeenCalledTimes(1);
    });
  });

  test("Render the build order list if data is loaded", async () => {
    renderList(queryDataMock);

    const notFound = document.querySelector(locators.notFound);
    const list = document.querySelector(locators.buildOrderList);
    const loading = document.querySelector(locators.loading);

    await waitFor(() => {
      expect(notFound).toBeNull();
      expect(list).toBeDefined();
      expect(loading).toBeNull();
    });
  });

  test("Render not found page if fetching errors", async () => {
    renderList({ ...queryDataMock, isError: true });

    const notFound = document.querySelector(locators.notFound);
    const list = document.querySelector(locators.buildOrderList);
    const loading = document.querySelector(locators.loading);

    await waitFor(() => {
      expect(notFound).toBeDefined();
      expect(list).toBeNull();
      expect(loading).toBeNull();
    });
  });

  test("Render loading modal if still fetching", async () => {
    renderList({ ...queryDataMock, isFetching: true });

    const notFound = document.querySelector(locators.notFound);
    const list = document.querySelector(locators.buildOrderList);
    const loading = document.querySelector(locators.loading);

    await waitFor(() => {
      expect(notFound).toBeNull();
      //list will be in the background
      expect(list).toBeDefined();
      expect(loading).toBeDefined();
    });
  });

  test("Clicking a build order will redirect to '/warcraft/build-order/:id'", async () => {
    const id = "1";
    renderList(queryDataMock);

    const buildOrderItem = screen.getByTestId("warcraft-build-order-item-" + id);

    act(() => {
      fireEvent.click(buildOrderItem);
    });

    const routTest = screen.getByText("Test Route " + id);

    await waitFor(() => {
      expect(routTest).toBeDefined();
    });
  });
});

const locators = {
  buildOrderList: `[data-testid="warcraft-build-order-list"]`,
  notFound: `[data-testid="not-found-page"]`,
  loading: `[data-testid="loading-modal"]`,
};
