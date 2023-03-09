import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "../src/App";

test("renders the app component", () => {
  render(<App />);

  const app = screen.getByTestId("app-component");
  expect(app).toBeDefined();
});
