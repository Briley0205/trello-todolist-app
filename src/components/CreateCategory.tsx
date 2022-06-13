import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { createCategory } from "../atoms";

interface IForm {
  category: string;
}

function CreateCategory() {
  const setCategories = useSetRecoilState(createCategory);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleCategory = ({ category }: IForm) => {
    setCategories((oldCategories) => [
      ...oldCategories,
      { text: category, value: category },
    ]);
    setValue("category", "");
  };
  return (
    <form onSubmit={handleSubmit(handleCategory)}>
      <input
        {...register("category", {
          required: "Please write a To Do",
        })}
        placeholder="write a category"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateCategory;
