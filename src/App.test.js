import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import * as apiService from "./services/apiService";
import { WEATHER_DATA } from "./mockWeatherData";

describe("app main page", () => {
  it("renders the main feed", () => {
    const useWeatherData = jest.spyOn(apiService, "useWeatherData");
    useWeatherData.mockImplementation(() => {
      return { loading: false, value: WEATHER_DATA };
    });
    const { getByText } = render(<App />);
    const blogTitle = getByText("Atlanta, GA");
    expect(blogTitle).toBeInTheDocument();
    useWeatherData.mockRestore();
  });

  it("renders a loading state", () => {
    const useWeatherData = jest.spyOn(apiService, "useWeatherData");
    useWeatherData.mockImplementation(() => {
      return { loading: true, value: undefined };
    });
    const { getByText } = render(<App />);
    const loading = getByText(/loading/);
    expect(loading).toBeInTheDocument();
    useWeatherData.mockRestore();
  });

  it("renders an error state", () => {
    const useWeatherData = jest.spyOn(apiService, "useWeatherData");
    useWeatherData.mockImplementation(() => {
      return { loading: false, value: { error: true, message: "Error" } };
    });
    const { getByText } = render(<App />);
    const errorText = getByText("Error");
    expect(errorText).toBeInTheDocument();
    useWeatherData.mockRestore();
  });
});
