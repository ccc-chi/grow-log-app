import { GanttArea } from "./components/organisms/layout/GanttArea";
import { LogListArea } from "./components/organisms/layout/LogListArea";

function App() {
  return (
    <>
      <h1>タスク管理 × 記録 Webアプリ</h1>
      <GanttArea />
      <LogListArea />
    </>
  );
}

export default App;
