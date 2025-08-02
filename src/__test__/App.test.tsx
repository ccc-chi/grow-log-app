import "@testing-library/jest-dom";
import App from "../App";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("title", () => {
  it("タイトルがあること", () => {
    render(<App />);
    expect(screen.getByText("タスク管理 × 記録 Webアプリ")).toBeInTheDocument();
  });
});
describe("タスクを登録できる", () => {
  test("登録ボタンがある", async () => {
    render(<App />);
    const button = await waitFor(() => screen.getByTestId("buttonAddTask"));
    expect(button).toBeInTheDocument();
  });

  // test("登録できること", async () => {
  //   render(<App />);

  //   const user = userEvent.setup();
  //   const addButton = await screen.findByTestId("buttonAddTask");
  //   await user.click(addButton);

  //   const title = await screen.findByTestId("taskTitleInput");
  //   const content = await screen.findByTestId("taskContentInput");
  //   const button = await screen.findByTestId("taskFormButton");

  //   // 入力して登録
  //   await user.type(title, "登録テスト");
  //   await user.type(content, "テスト内容");
  //   await user.click(button);

  //   //// 登録されたことを確認
  //   // const target = await screen.findByText("登録テスト");
  //   // expect(target).toBeInTheDocument();
  // });

  test("未入力のエラー", async () => {
    render(<App />);

    const user = userEvent.setup();
    const addButton = await screen.findByTestId("buttonAddTask");
    await user.click(addButton);

    const button = await screen.findByTestId("taskFormButton");

    await user.click(button);
    const titleError = await screen.findByTestId("titleError");
    const contentError = await screen.findByTestId("contentError");
    expect(titleError).toBeInTheDocument();
    expect(contentError).toBeInTheDocument();
  });
});

describe("学習記録を登録できる", () => {
  test("登録ボタンがある", async () => {
    render(<App />);
    const button = await waitFor(() => screen.getByTestId("recordLogButton"));
    expect(button).toBeInTheDocument();
  });
});