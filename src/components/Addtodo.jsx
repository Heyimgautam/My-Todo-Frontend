import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { Context, Server } from "../main";
import TodoItem from "./TodoItem";

const Addtodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const { isAuthenticated } = useContext(Context);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `http://localhost:4000/api/v1/task/newtask`,
        {
          title,
          description,
        },
        {
          header: {
            "content-type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setTitle("");
      setDescription("");
      setRefresh((prev) => !prev);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/task/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/v1/task/${id}`,
        {
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:4000/api/v1/task/getTask`, {
        withCredentials: true,
      })
      .then((res) => {
        setTask(res.data.task);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setLoading(false);
      });
  }, [refresh]);

  if (!isAuthenticated) return <Navigate to={"/login"} />;
  return (
    <>
      <div className="container">
        <div className="login">
          <section>
            <form onSubmit={submitHandler}>
              <input
                type="text"
                placeholder="Title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="Description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button type="submit">ADD</button>
            </form>
          </section>
          <section className="todosContainer">
            {task.map((i) => (
              <TodoItem
                key={i._id}
                title={i.title}
                description={i.description}
                isCompleted={i.isCompleted}
                updateHandler={updateHandler}
                deleteHandler={deleteHandler}
                id={i._id}
              />
              // <div key={i._id}>
              //   <h1>{i.title}</h1>
              //   <h1>{i.description}</h1>
              // </div>
            ))}
          </section>
        </div>
      </div>
    </>
  );
};

export default Addtodo;
