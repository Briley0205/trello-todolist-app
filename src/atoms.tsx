import { atom, selector } from "recoil";

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

//it changes a category of a todo
export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
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
