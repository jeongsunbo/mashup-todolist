import React from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';
import { useTodoState } from '../TodoContext';
const TodoListBlock = styled.div`
    padding: 20px 32px;
    over-flow-y: auto; 
    // flex: 1; 100%로 채움
    flex: 1;
`;
const TodoList = () => {
    const todos = useTodoState();
    return (
        <TodoListBlock>
            {todos.map(todo=>(
                <TodoItem 
                key={todo.id}
                id={todo.id}
                text={todo.text}
                done={todo.done}
                />
            )
        )}
        </TodoListBlock>
    );
};

export default TodoList;