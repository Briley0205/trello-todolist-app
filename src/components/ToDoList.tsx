import { type } from "os";
import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  categoryState,
  createCategory,
  toDoSelector,
  toDoState,
} from "../atoms";
import CreateCategory from "./CreateCategory";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 550px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const Title = styled.h1`
  font-size: 40px;
  color: ${(props) => props.theme.accentColor};
  font-weight: 600;
`;
const ToDoBox = styled.div`
  width: 100%;
  background-color: #fff;
  border-radius: 0.75rem;
  height: 85vh;
`;
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  padding: 20px;
  border-bottom: 1px solid ${(props) => props.theme.accentColor};
`;
const CategorySelect = styled.select`
  flex: 1 1 0%;
  height: 48px;
  outline: none;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding: 10px 8px;
  font-size: 1.05rem;
  margin: 8px 0px;
`;
const ListContainer = styled.div`
  padding: 20px;
  overflow-y: auto;
  flex: 1 1 0%;
`;
function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  const categories = useRecoilValue(createCategory);
  return (
    <Container>
      <Header>
        <Title>To Dos</Title>
      </Header>
      <ToDoBox>
        <FormContainer>
          <CreateCategory />
          <CategorySelect value={category} onInput={onInput}>
            {categories?.map((categories) => (
              <option value={categories.value} key={categories.value}>
                {categories.text}
              </option>
            ))}
          </CategorySelect>
          <CreateToDo />
        </FormContainer>
        <ListContainer>
          {toDos?.map((aToDo) => (
            <ToDo key={aToDo.id} {...aToDo} />
          ))}
        </ListContainer>
      </ToDoBox>
    </Container>
  );
}

export default ToDoList;
