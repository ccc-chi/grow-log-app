import "@testing-library/jest-dom";
import App from "../App";
import { render, screen } from "@testing-library/react";

describe("title", () => {
  it("should render title", () => {
    render(<App />);
    expect(screen.getByText("タスク管理 × 記録 Webアプリ")).toBeInTheDocument();
  });
});