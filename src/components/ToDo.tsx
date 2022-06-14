import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { createCategory, IToDo, toDoState } from "../atoms";
import { ToDoButton } from "./CreateCategory";

const ToDoList = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  list-style: none;
`;
const ListButton = styled(ToDoButton)`
  font-size: 13px;
  margin-left: 5px;
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const categories = useRecoilValue(createCategory);
  const onClick = (newCategory: IToDo["category"]) => {
    setToDos((oldToDos) => {
      const toDoTargetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: newCategory as any };

      localStorage.setItem(
        "prevToDos",
        JSON.stringify([
          ...oldToDos.slice(0, toDoTargetIndex),
          newToDo,
          ...oldToDos.slice(toDoTargetIndex + 1),
        ])
      );
      return [
        ...oldToDos.slice(0, toDoTargetIndex),
        newToDo,
        ...oldToDos.slice(toDoTargetIndex + 1),
      ];
    });
  };
  return (
    <ToDoList>
      <span>{text}</span>
      <div>
        {categories.map(function (categories) {
          return (
            category !== `${categories.value}` && (
              <ListButton onClick={() => onClick(`${categories.value}`)}>
                {categories.text}
              </ListButton>
            )
          );
        })}
      </div>
      {/* {category !== "TO_DO" && (
        <button onClick={() => onClick("TO_DO")}>To Do</button>
      )}
      {category !== "DOING" && (
        <button onClick={() => onClick("DOING")}>Doing</button>
      )}
      {category !== "DONE" && (
        <button onClick={() => onClick("DONE")}>Done</button>
      )} */}
    </ToDoList>
  );
}

export default ToDo;
