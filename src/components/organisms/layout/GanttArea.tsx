import { FC, memo, useEffect, useState } from "react";
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
  TaskWithLogs,
  TaskFormInput,
} from "../../../domain/TaskWithLogs";

type Props = {
  tasks: TaskWithLogs[];
  setTasks: React.Dispatch<React.SetStateAction<TaskWithLogs[]>>;
};

export const GanttArea: FC<Props> = memo((props) => {
  const { tasks, setTasks } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    if (tasks.length === 0) {
      // localStorageにデータがあれば設定する
      const stored = localStorage.getItem("tasks");
      const parse = JSON.parse(stored || "[]");
      const deserialized = parse.map(deserializeTask);
      setTasks(deserialized);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks.length]);

  const onSubmit = (data: TaskFormInput) => {
    const task: TaskWithLogs = {
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
    setTasks((tasks) => [...tasks, task]);
    localStorage.setItem("tasks", JSON.stringify([...tasks, task]));
    onClose();
  };
  return (
    <>
      <GanttChart tasks={tasks} setTasks={setTasks} />
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
