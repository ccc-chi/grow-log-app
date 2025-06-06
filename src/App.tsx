import { TaskForm } from "./components/organisms/task/TaskForm";
import { TaskList } from "./components/organisms/task/TaskList";

function App() {
  return (
    <>
      <h1>タスク管理 × 学習記録 Webアプリ</h1>
      <TaskForm />
      <TaskList />
    </>
  );
}

export default App;
