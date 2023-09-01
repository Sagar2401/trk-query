import "./App.css";
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
        onChange={(e) => setTodoData({ ...todoData, title: e.target.value })}
      />
      <Input
        value={todoData.description}
        type="text"
        lable={"description"}
        onChange={(e) =>
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
          : data?.map((r, i) => {
              return (
                <div key={i} className="card">
                  <p
                    style={{
                      fontSize: "16px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: " ellipsis",
                      width: "81%",
                    }}
                  >
                    {r.title}
                  </p>

                  <p
                    style={{
                      fontSize: "16px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: " ellipsis",
                      width: "81%",
                    }}
                  >
                    {r.description}
                  </p>
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
