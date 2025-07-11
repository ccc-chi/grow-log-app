import { useState } from "react";
import { GanttArea } from "./components/organisms/layout/GanttArea";
import { LogListArea } from "./components/organisms/layout/LogListArea";
import { TaskWithLogs } from "./domain/TaskWithLogs";

function App() {
  const [tasks, setTasks] = useState<TaskWithLogs[]>([]);
  return (
    <>
      <h1>タスク管理 × 記録 Webアプリ</h1>
      <GanttArea tasks={tasks} setTasks={setTasks} />
      <LogListArea />
    </>
  );
}

export default App;
