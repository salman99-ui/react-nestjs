import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiRequest from "../../../common/http";

const options = ["created", "completed", "on_going", "problem"];

function Detail() {
  const { id } = useParams();
  const [todos, setTodos] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [body, setBody] = useState({
    status: "",
    problem_desc: "",
  });

  const getTodo = async () => {
    setIsLoading(true);
    try {
      const { data } = await ApiRequest.get(`/todos/${id}`);
      setTodos(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateTodo = async () => {
    setIsLoading(true);
    try {
      const { data } = await ApiRequest.put(`/todos/${id}`, { ...body });
      window.alert("Success");
      getTodo()
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setOpen(false)
      setBody({ status: "", problem_desc: "" });
    }
  };

  useEffect(() => {
    getTodo();
  }, []);

  return (
    <div>
      <h4>detail</h4>
      {isLoading && <div>Loading...</div>}

      {!isLoading && todos && !open && (
        <div>
          <p>Title : {todos.title}</p>
          <p>Status : {todos.status}</p>
          {todos.problem_desc && <p>Problem : {todos.problem_desc}</p>}
        </div>
      )}

      {/* Ubah Status */}
      {!isLoading && todos && open && (
        <div>
          <p>Title : {todos.title}</p>
          <p>
            Status :{" "}
            <select
              onChange={(e) =>
                setBody((prev) => ({ ...prev, status: e.target.value }))
              }
            >
              {options?.map((item) => (
                <option value={item}>{item}</option>
              ))}
            </select>
          </p>

          {body.status === "problem" && (
            <div>
              <p>Problem Desc</p>
              <input
                value={body.problem_desc}
                onChange={(e) =>
                  setBody((prev) => ({ ...prev, problem_desc: e.target.value }))
                }
                style={{
                  border: "1px solid black",
                }}
              />
            </div>
          )}
          {todos.problem_desc && <p>Problem : {todos.problem_desc}</p>}
        </div>
      )}

      <div>
        {!open ? (
          <button onClick={() => setOpen(true)}>Ubah Status</button>
        ) : (
          <>
            <button
              onClick={() => {
                setBody({ status: "", problem_desc: "" });
                setOpen(false);
              }}
            >
              Batalkan
            </button>
            <span>-</span>
            <button
              onClick={() => {
                updateTodo();
              }}
            >
              Ubah data
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Detail;
