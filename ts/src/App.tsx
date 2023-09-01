import React from "react";
import "./App.css";
import { Todo } from "./todo";
import { Input } from "./components/Input";
import { useApp } from "./hooks/useApp";
function App() {
  const {
    todoData,
    data,
    isLoading,
    setTodoData,
    DeleteTodoHandler,
    handleAdd,
  } = useApp();

  return (
    <>
      <Input
        type="text"
        lable={"Title"}
        value={todoData.title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTodoData({ ...todoData, title: e.target.value })
        }
      />
      <Input
        value={todoData.description}
        type="text"
        lable={"description"}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTodoData({ ...todoData, description: e.target.value })
        }
      />
      <input
        type="submit"
        value={todoData._id ? "update" : "add"}
        onClick={handleAdd}
      ></input>
      <div className="App">
        {isLoading
          ? "Loading"
          : data?.map((r: Todo, i: number) => {
              return (
                <div key={i} className="card">
                  <h4>{r.title}</h4>

                  <p>{r.description}</p>
                  <button onClick={() => DeleteTodoHandler(r._id)}>
                    Delete
                  </button>
                  <button onClick={() => setTodoData(r)}>update</button>
                </div>
              );
            })}
      </div>
    </>
  );
}

export default App;
