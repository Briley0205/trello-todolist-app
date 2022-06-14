import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { createCategory } from "../atoms";

interface IForm {
  category: string;
}
export const ToDoForm = styled.form`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 8px 0px;
`;
export const ToDoInput = styled.input`
  background: transparent;
  flex: 1 1 0%;
  height: 40px;
  outline: none;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding-left: 8px;
  font-size: 1.05rem;
  caret-color: auto;
  transition: border-color 0.5s ease-in-out;
`;
export const ToDoButton = styled.button`
  background: ${(props) => props.theme.accentColor};
  color: ${(props) => props.theme.bgColor};
  flex: 0 0 auto;
  width: 60px;
  height: 40px;
  outline: none;
  border: none;
  padding: 5px 8px;
  font-size: 15px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
`;
function CreateCategory() {
  const setCategories = useSetRecoilState(createCategory);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleCategory = ({ category }: IForm) => {
    setCategories((oldCategories) => [
      ...oldCategories,
      { text: category, value: category },
    ]);
    setValue("category", "");
    localStorage.setItem("categories", JSON.stringify(categories));
  };
  const categories = useRecoilValue(createCategory);
  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);
  return (
    <ToDoForm onSubmit={handleSubmit(handleCategory)}>
      <ToDoInput
        {...register("category", {
          required: "Please write a To Do",
        })}
        placeholder="write a category"
      />
      <ToDoButton>Add</ToDoButton>
    </ToDoForm>
  );
}

export default CreateCategory;
