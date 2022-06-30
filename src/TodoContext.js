import React, {createContext, useReducer, useContext, useRef } from "react";
const initialTodos = [
    {
        id:1,
        text:'프로젝트 생성하기',
        done:false,
    },
    {
        id:2,
        text:'컴포넌트 스타일링하기',
        done:true,
    },
    {
        id:3,
        text:'context 만들기',
        done:false,
    },
    {
        id:4,
        text:'기능 구현하기',
        done:false,
    },
];
function todoReducer( state, action ){
    switch(action.type){
        // action타입이 CREATE이면 action객체에 todo를 
        // state배열에 추가하기
        case 'CREATE':
            return state.concat(action.todo);
        case 'TOGGLE':
        // action타입이 TOGGLE이면 action객체의 id를
        // 받아와서 state항목의 id와 일치하면 
        // 일치하는 항목의 done을 반전 true면 false로 false면 true로
            return state.map( todo=>
                todo.id === action.id ? {...todo, done : !todo.done } : todo
            );
        // action타입이 REMOVE이면 action객체의 id를
        // state배열 항목의 id와 비교하여
        // 일치하지 않는 항목만 새배열로 반환해줌 
        case 'REMOVE':
            return state.filter( todo=> action.id !== todo.id );
        default:
            return state;
    }
}
//컨텍스트 생성
const TodoStateContext = createContext();
const TodoDispatchContext = createContext(); 
const TodoNextContext = createContext();

export function TodoProvider({ children }){
    const [ state, dispatch ] = useReducer(todoReducer, initialTodos);
    const nextId = useRef(5);
    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                <TodoNextContext.Provider value={nextId}>
                {children};
                </TodoNextContext.Provider>
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    )
}
// 커스텀 Hook
export function useTodoState(){
    return useContext(TodoStateContext);
}
export function useTodoDispatch(){
    return useContext(TodoDispatchContext);
}
export function useTodoNextId(){
    return useContext(TodoNextContext);
}