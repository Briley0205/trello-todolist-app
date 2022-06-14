import { useRecoilValue, useSetRecoilState } from "recoil";
import { createCategory, IToDo, toDoState } from "../atoms";

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
    <li>
      <span>{text}</span>
      {categories.map(function (categories) {
        return (
          category !== `${categories.value}` && (
            <button onClick={() => onClick(`${categories.value}`)}>
              {categories.text}
            </button>
          )
        );
      })}
      {/* {category !== "TO_DO" && (
        <button onClick={() => onClick("TO_DO")}>To Do</button>
      )}
      {category !== "DOING" && (
        <button onClick={() => onClick("DOING")}>Doing</button>
      )}
      {category !== "DONE" && (
        <button onClick={() => onClick("DONE")}>Done</button>
      )} */}
    </li>
  );
}

export default ToDo;
