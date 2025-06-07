import { GanttChart } from "./components/organisms/gantt/GanttChart";
import { TaskForm } from "./components/organisms/task/TaskForm";

function App() {
  return (
    <>
      <h1>タスク管理 × 記録 Webアプリ</h1>
      <GanttChart />
      <TaskForm />
    </>
  );
}

export default App;
