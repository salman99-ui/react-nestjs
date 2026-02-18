import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiRequest from "../../../common/http";

function Main() {
  const [todos, setTodos] = useState([]);
  const [params, setParams] = useState({
    limit: 100,
    offset: 0,
    search: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const [openAdd, setOpenAdd] = useState(false);
  const [body, setBody] = useState({ title: "" });

  const getTodoList = async () => {
    setIsLoading(true);
    try {
      const { data } = await ApiRequest.get("/todos", {
        params,
      });
      setTodos(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addTodoList = async () => {
    setIsLoading(true);
    try {
      const { data } = await ApiRequest.post("/todos", {
        ...body,
      });
      window.alert("Success menambahkan");
      getTodoList();
    } catch (error) {
      console.error(error);
    } finally {
      setOpenAdd(false);
      setBody({ title: "" });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTodoList();
  }, [params]);

  return (
    <div>
      <div className="">
        <h3>Todo List</h3>
        <div style={{ width: 500 }}>
          <div>
            {!openAdd && (
              <div style={{ display: "flex", justifyContent: "end" }}>
                <button onClick={() => setOpenAdd(true)}>Add</button>
              </div>
            )}

            {openAdd && (
              <div>
                <div style={{ display: "flex", justifyContent: "end" }}>
                  <button onClick={() => setOpenAdd(false)}>Close</button>
                  <span>-</span>
                  <button onClick={() => addTodoList()}>Submit</button>
                </div>

                {openAdd && (
                  <div style={{ display: "flex", justifyContent: "end" }}>
                    <div>
                      <p>Title</p>
                      <input
                        value={body.title}
                        onChange={(e) => setBody({ title: e.target.value })}
                        style={{
                          border: "1px solid black",
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          <div>
            Search :{" "}
            <input
              value={params.search}
              onChange={(e) =>
                setParams((prev) => ({ ...prev, search: e.target.value }))
              }
              style={{
                border : "1px solid black"
              }}
            />
          </div>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* {isLoading && <div>Loading...</div>} */}

              {!isLoading &&
                todos?.map((item) => (
                  <tr>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.status}</td>
                    <td>
                      <a href={`/detail/${item.id}`}>Detail</a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Main;
