import React, { FC } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useParams } from "react-router-dom";
import Providers from "../Contexts/Providers";
import { UserApi } from "../Api/UserApi";
import { WarcraftBuildOrderList, WarcraftBuildOrders } from "../Components/Main/Warcraft/WarcraftBuildOrders";
import { act } from "react-dom/test-utils";
import { mockBuildOrdersApi } from "../__mocks__/mockApis";
import { QueryClient } from "react-query";
import { wc3BuildOrderMocks } from "../__mocks__/buildOrderMocks";
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

const renderContainer = () => {
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
  test("Render the component and call the api to fetch data", async () => {
    renderContainer();

    const warcraft = screen.getByTestId("warcraft-build-orders");

    await waitFor(() => {
      expect(warcraft).not.toBeNull();
      expect(mockBuildOrdersApi.getWarcraftBuildOrders).toHaveBeenCalledTimes(1);
    });
  });

  test("Render the build order list if data is loaded", async () => {
    await act(async () => {
      renderContainer();
    });

    const notFound = document.querySelector(locators.notFound);
    const list = document.querySelector(locators.buildOrderList);
    const skeleton = document.querySelector(locators.skeleton);

    await waitFor(() => {
      expect(notFound).toBeNull();
      expect(list).not.toBeNull();
      expect(skeleton).toBeNull();
    });
  });

  test("Render not found page if fetching errors", async () => {
    mockBuildOrdersApi.getWarcraftBuildOrders = jest.fn().mockRejectedValue({});

    await act(async () => {
      render(
        <MemoryRouter>
          <Providers userApi={mockUserApi} buildOrdersApi={mockBuildOrdersApi} queryClient={queryClient}>
            <Routes>
              <Route
                path="/"
                element={
                  <WarcraftBuildOrderList
                    buildOrders={[]}
                    isFetching={false}
                    hasNextPage={false}
                    fetchNextPage={() => {}}
                    isError={true}
                    refetch={() => []}
                  />
                }
              />
            </Routes>
          </Providers>
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      const notFound = document.querySelector(locators.notFound);
      const list = document.querySelector(locators.buildOrderList);
      const skeleton = document.querySelector(locators.skeleton);
      expect(notFound).not.toBeNull();
      expect(list).toBeNull();
      expect(skeleton).toBeNull();
    });
  });

  test("Render skeleton modal if still fetching", async () => {
    mockBuildOrdersApi.getWarcraftBuildOrders = jest.fn(() => new Promise(() => {}));
    await act(async () => {
      render(
        <MemoryRouter>
          <Providers userApi={mockUserApi} buildOrdersApi={mockBuildOrdersApi} queryClient={queryClient}>
            <Routes>
              <Route
                path="/"
                element={
                  <WarcraftBuildOrderList
                    buildOrders={[]}
                    isFetching={true}
                    hasNextPage={false}
                    fetchNextPage={() => {}}
                    isError={false}
                    refetch={() => []}
                  />
                }
              />
            </Routes>
          </Providers>
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      const notFound = document.querySelector(locators.notFound);
      const skeleton = document.querySelector(locators.skeleton);
      expect(notFound).toBeNull();
      expect(skeleton).not.toBeNull();
    });
  });

  test("Clicking a build order will redirect to '/warcraft/build-order/:id'", async () => {
    mockBuildOrdersApi.getWarcraftBuildOrders = jest.fn().mockResolvedValue(wc3BuildOrderMocks);
    const id = "1";
    await act(async () => {
      renderContainer();
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

  test("Typing in the search filter tile area trigger an api fetch", async () => {
    await act(async () => {
      renderContainer();
    });
    const testString = "test title";

    const titleFilter = document.querySelector(locators.titleFilter) as Element;

    act(() => {
      fireEvent.change(titleFilter, { target: { value: testString } });
    });

    await waitFor(() => {
      expect(mockBuildOrdersApi.getWarcraftBuildOrders).toHaveBeenLastCalledWith(
        { faction: "", gameMode: "", opponentFaction: "", title: testString, uploadedBy: "" },
        1
      );
    });
  });

  test("Typing in the uploadedBy filter tile area trigger an api fetch", async () => {
    await act(async () => {
      renderContainer();
    });
    const testString = "test user";

    const userFilter = document.querySelector(locators.uploadedByFilter) as Element;

    act(() => {
      fireEvent.change(userFilter, { target: { value: testString } });
    });

    await waitFor(() => {
      expect(mockBuildOrdersApi.getWarcraftBuildOrders).toHaveBeenLastCalledWith(
        { faction: "", gameMode: "", opponentFaction: "", title: "", uploadedBy: testString },
        1
      );
    });
  });

  test("Selecting a player faction trigger an api fetch", async () => {
    await act(async () => {
      renderContainer();
    });

    const factionFilter = document.querySelector(locators.factionFilter) as Element;

    act(() => {
      fireEvent.change(factionFilter, { target: { value: "1" } });
    });

    await waitFor(() => {
      expect(mockBuildOrdersApi.getWarcraftBuildOrders).toHaveBeenLastCalledWith(
        { faction: "1", gameMode: "", opponentFaction: "", title: "", uploadedBy: "" },
        1
      );
    });
  });

  test("Selecting an opponent faction trigger an api fetch", async () => {
    await act(async () => {
      renderContainer();
    });

    const opponentFactionFilter = document.querySelector(locators.opponentFactionFilter) as Element;

    act(() => {
      fireEvent.change(opponentFactionFilter, { target: { value: "1" } });
    });

    await waitFor(() => {
      expect(mockBuildOrdersApi.getWarcraftBuildOrders).toHaveBeenLastCalledWith(
        { faction: "", gameMode: "", opponentFaction: "1", title: "", uploadedBy: "" },
        1
      );
    });
  });

  test("Selecting a gameMode trigger an api fetch", async () => {
    await act(async () => {
      renderContainer();
    });

    const gameModeFilter = document.querySelector(locators.gameModeFilter) as Element;

    act(() => {
      fireEvent.change(gameModeFilter, { target: { value: "1" } });
    });

    await waitFor(() => {
      expect(mockBuildOrdersApi.getWarcraftBuildOrders).toHaveBeenLastCalledWith(
        { faction: "", gameMode: "1", opponentFaction: "", title: "", uploadedBy: "" },
        1
      );
    });
  });
});

const locators = {
  buildOrderList: `[data-testid="warcraft-build-order-list"]`,
  notFound: `[data-testid="not-found-page"]`,
  skeleton: `[data-testid="build-orders-skeleton"]`,
  titleFilter: `[data-testid="build-orders-title-filter"]`,
  factionFilter: `[data-testid="build-orders-faction-filter"]`,
  opponentFactionFilter: `[data-testid="build-orders-opponent-faction-filter"]`,
  uploadedByFilter: `[data-testid="build-orders-uploaded-by-filter"]`,
  gameModeFilter: `[data-testid="build-orders-game-mode-filter"]`,
};
