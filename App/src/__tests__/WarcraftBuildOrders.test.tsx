import React, { FC } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes, createMemoryRouter, useNavigate, useParams } from "react-router-dom";
import Providers from "../Contexts/Providers";
import { UserApi } from "../Api/UserApi";
import { WarcraftBuildOrders } from "../Components/Main/BuildOrders";
import { act } from "react-dom/test-utils";
import { mockBuildOrdersApi } from "../__mocks__/mockApis";
import { QueryClient } from "react-query";
import { wc3BuildOrderMocks } from "../__mocks__/buildOrderMocks";
import { queryKeys } from "../Types&Globals/queryKeys";
import { AppRoutes } from "../Types&Globals/Routes";

jest.mock("../Api/UserApi");

const mockUserApi = new UserApi();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const RouterTester: FC = () => {
  const { id } = useParams();

  return <div>Test Route {id}</div>;
};

const renderList = () => {
  render(
    <MemoryRouter>
      <Providers userApi={mockUserApi} buildOrdersApi={mockBuildOrdersApi} queryClient={queryClient}>
        <Routes>
          <Route path="/" element={<WarcraftBuildOrders />} />
          <Route path={AppRoutes.WarcraftBuildOrder} element={<RouterTester />} />
        </Routes>
      </Providers>
    </MemoryRouter>
  );
};

describe("Warcraft Build Orders", () => {
  beforeEach(() => {
    queryClient.setQueryData([queryKeys.warcraftBuildOrders], []);
  });

  test("Render the component and call the api to fetch data", async () => {
    renderList();

    const warcraft = screen.getByTestId("warcraft-build-orders");

    await waitFor(() => {
      expect(warcraft).not.toBeNull();
      expect(mockBuildOrdersApi.getWarcraftBuildOrders).toHaveBeenCalledTimes(1);
    });
  });

  test("Render the build order list if data is loaded", async () => {
    renderList();

    const notFound = document.querySelector(locators.notFound);
    const list = document.querySelector(locators.buildOrderList);
    const loading = document.querySelector(locators.loading);

    await waitFor(() => {
      expect(notFound).toBeNull();
      expect(list).not.toBeNull();
      expect(loading).toBeNull();
    });
  });

  test("Render not found page if fetching errors", async () => {
    mockBuildOrdersApi.getWarcraftBuildOrders = jest.fn().mockRejectedValue({});

    await act(async () => {
      renderList();
    });

    await waitFor(() => {
      const notFound = document.querySelector(locators.notFound);
      const list = document.querySelector(locators.buildOrderList);
      const loading = document.querySelector(locators.loading);
      expect(notFound).not.toBeNull();
      expect(list).toBeNull();
      expect(loading).toBeNull();
    });
  });

  test("Render loading modal if still fetching", async () => {
    mockBuildOrdersApi.getWarcraftBuildOrders = jest.fn(() => new Promise(() => {}));
    await act(async () => {
      renderList();
    });

    await waitFor(() => {
      const notFound = document.querySelector(locators.notFound);
      const loading = document.querySelector(locators.loading);
      expect(notFound).toBeNull();
      expect(loading).not.toBeNull();
    });
  });

  test("Clicking a build order will redirect to '/warcraft/build-order/:id'", async () => {
    mockBuildOrdersApi.getWarcraftBuildOrders = jest.fn().mockResolvedValue(wc3BuildOrderMocks);
    const id = "1";
    await act(async () => {
      renderList();
    });

    const buildOrderItem = screen.getByTestId("warcraft-build-order-item-" + id);

    act(() => {
      fireEvent.click(buildOrderItem);
    });

    const routTest = screen.getByText("Test Route " + id);

    await waitFor(() => {
      expect(routTest).not.toBeNull();
    });
  });
});

const locators = {
  buildOrderList: `[data-testid="warcraft-build-order-list"]`,
  notFound: `[data-testid="not-found-page"]`,
  loading: `[data-testid="loading-modal"]`,
};
