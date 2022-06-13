import { atom, selector } from "recoil";

// export enum Categories {
//   "TO_DO" = "TO_DO",
//   "DOING" = "DOING",
//   "DONE" = "DONE",
// }

export interface IToDo {
  text: string;
  id: number;
  category: any;
}
export interface ICategory {
  text: string;
  value: string;
}

//it changes a category of a todo
export const categoryState = atom({
  key: "category",
  default: "TO_DO",
});

//it sets a state and put some todos
export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

//it takes a state and transform it
export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});

export const createCategory = atom<ICategory[]>({
  key: "newCategories",
  default: [
    { text: "To Do", value: "TO_DO" },
    { text: "Doing", value: "DOING" },
    { text: "Done", value: "DONE" },
  ],
});
