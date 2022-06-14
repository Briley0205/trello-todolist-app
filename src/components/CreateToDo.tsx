import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);

  /**const {for input, for form, for the input value} = useForm<Interface>() */
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => {
      /**saving toDos on the localstorage */
      localStorage.setItem(
        "prevToDos",
        JSON.stringify([{ text: toDo, id: Date.now(), category }, ...oldToDos])
      );
      return [{ text: toDo, id: Date.now(), category }, ...oldToDos];
    });
    /**It takes the input value and remove it */
    /**setValue("form item(name of input register)", "value") */
    setValue("toDo", "");
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", {
          required: "Please write a To Do",
        })}
        placeholder="Write a to do"
      />
      <button>Add</button>
    </form>
  );
}
//+삭제 기능 +localStorage를 이용한 저장 기능

export default CreateToDo;
