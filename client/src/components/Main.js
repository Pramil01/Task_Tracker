import { useState, useEffect, useLayoutEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import NavBar from "./Navbar";
import Header from "./Header";
import Tasks from "./Tasks";
import AddTask from "./AddTask";

function Main() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskReceived, setTaskReceived] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useLayoutEffect(() => {
    if (sessionStorage.getItem("UserName") === null) {
      setRedirect("true");
    }
  }, []);
  useEffect(() => {
    const id = sessionStorage.getItem("UserId");
    axios
      .get("http://localhost:5000/tasks/", {
        headers: {
          UserId: id,
        },
      })
      .then((res) => {
        setTasks(res.data);
        console.log(res.data);
        setTaskReceived(true);
      })
      .catch((err) => console.log(err.response));
  }, []);

  //Add Task
  const addTask = (task) => {
    const id = sessionStorage.getItem("UserId");
    task.UserId = id;
    axios
      .post("http://localhost:5000/tasks/", task)
      .then((res) => {
        const { id } = res.data;
        const newTask = { id, ...task };
        setTasks([...tasks, newTask]);
      })
      .catch((err) => console.log(err));
  };

  //Delete tasks
  const deleteTask = (id) => {
    axios
      .delete(`http://localhost:5000/tasks/${id}`)
      .catch((err) => console.log(err));
    setTasks(tasks.filter((task) => task.id !== id));
  };

  //Toggle Reminder
  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };
  const LogOut = () => {
    sessionStorage.clear();
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/" />;
  }
  if (taskReceived) {
    return (
      <div className="outerContainer">
        <NavBar LogOut={LogOut} />
        <div className="container">
          <Header
            onAdd={() => setShowAddTask(!showAddTask)}
            showAdd={showAddTask}
          />
          {showAddTask && <AddTask onAdd={addTask} />}
          {tasks.length > 0 ? (
            <Tasks
              tasks={tasks}
              onDelete={deleteTask}
              onToggle={toggleReminder}
            />
          ) : (
            "No Tasks remaining"
          )}
        </div>
      </div>
    );
  } else {
    return <div>Loading ...</div>;
  }
}

export default Main;
