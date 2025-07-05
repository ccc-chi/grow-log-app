import { FC, memo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Flex,
} from "@chakra-ui/react";

import { GanttChart } from "../gantt/GanttChart";
import { TaskForm } from "../task/TaskForm";
import {
  deserializeTask,
  GanttTask,
  TaskFormInput,
} from "../../../domain/ganttTask";

export const GanttArea: FC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ganttTasks, setGanttTasks] = useState<GanttTask[]>(() => {
    // localStorageにデータがあれば設定する
    const stored = localStorage.getItem("ganttTasks");
    const perse = JSON.parse(stored || "[]");
    return perse.map(deserializeTask);
  });

  const onSubmit = (data: TaskFormInput) => {
    const task: GanttTask = {
      start: data.start || new Date(),
      end: data.end || new Date(),
      name: data.title,
      id: uuidv4(),
      type: "task",
      progress: 0,
      isDisabled: true,
      styles: {
        progressColor: "#ffbb54",
        progressSelectedColor: "#ff9e0d",
      },
      content: data.content,
      // targetTime: Number(data.targetTime),
      // state: "未対応",
      // totalDuration: 0,
      // taskRecords: [],
    };
    setGanttTasks((tasks) => [...tasks, task]);
    localStorage.setItem("ganttTasks", JSON.stringify([...ganttTasks, task]));
    onClose();
  };
  return (
    <>
      <GanttChart ganttTasks={ganttTasks} setGanttTasks={setGanttTasks} />
      <Flex gap={5}>
        <Button onClick={onOpen}>タスクを登録</Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>タスク登録</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TaskForm onSubmit={onSubmit} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
});
