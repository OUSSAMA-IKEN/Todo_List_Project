import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { useState } from "react";
import "../App.css";
import { v4 as uuidv4 } from "uuid";
import { todoListContext } from "../Context/TodoListContext";
import { useContext } from "react";

/* ----- import Components---- */
import Todo from "./TodoComponent";

export default function TodoList() {
  /* ====== Context ====== */
  const { task, setTask } = useContext(todoListContext);

  /* ======== State ======== */
  const [taskInput, setTaskInput] = useState("");

  /* ======== hundle Add Task  ======== */
  const hundleAddTaskClick = () => {
    const newTask = {
      id: uuidv4(),
      title: taskInput,
      description: prompt("Task description"),
      completed: false
    };
    setTask([...task, newTask]);
    setTaskInput("");
    localStorage.setItem("task", JSON.stringify([...task, newTask]));
  };

  /* ======= Tasks Filtering ======== */
  const completedTasks = task.filter((task) => task.completed === true);
  const pendingTasks = task.filter((task) => task.completed === false);
  const [displayTodosType, setdisplayTodosType] = useState("all");

  const handleChangeDisplay = (event) => {
    if (event.target.value === "completed") {
      setdisplayTodosType("completed");
    } else if (event.target.value === "pending") {
      setdisplayTodosType("pending");
    } else {
      setdisplayTodosType("all");
    }
  };
  let filteredTasks = task;
  if (displayTodosType === "completed") {
    filteredTasks = completedTasks;
  } else if (displayTodosType === "pending") {
    filteredTasks = pendingTasks;
  } else {
    filteredTasks = task;
  }

  /* ========  todos maping  ======== */
  const todosMap = filteredTasks.map((todo) => {
    return <Todo key={todo.id} Todo={todo} />;
  });
  let length = task.length;

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Card sx={{ minWidth: 275 }} style={{ borderRadius: "12px" }}>
          <CardContent>
            <Typography variant="h4" gutterBottom style={{ fontWeight: "600" }}>
              My Tasks
            </Typography>
            <Divider />
            {/* Filter Buttons  */}
            <ToggleButtonGroup
              color="primary"
              value={displayTodosType}
              exclusive
              style={{ marginTop: ".7rem" }}
              aria-label="text alignement"
              onChange={(e) => {
                handleChangeDisplay(e);
              }}
            >
              <ToggleButton value="all">All</ToggleButton>
              <ToggleButton value="completed">Completed</ToggleButton>
              <ToggleButton value="pending">Pending</ToggleButton>
            </ToggleButtonGroup>

            {/* === Todos === */}
            <div
              className="todosSection"
              style={{
                height: "330px",
                overflowY: length > 3 ? "scroll" : "hidden",
                marginBlock: "10px"
              }}
            >
              {todosMap}
            </div>
          </CardContent>

          <CardContent>
            <Container>
              <Grid
                container
                spacing={2}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Grid
                  size={7}
                  style={{}}
                  display="flex"
                  flexDirection={"column"}
                  justifyContent="center"
                  color={"white"}
                >
                  <TextField
                    id="outlined-basic"
                    label="Your Task"
                    variant="outlined"
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                  />
                </Grid>
                <Grid
                  size={4}
                  display={"flex"}
                  justifyContent={"left"}
                  alignItems={"center"}
                >
                  <Button
                    variant="contained"
                    className="buttons"
                    style={{
                      backgroundColor: taskInput === "" ? "gray" : "#191b1f",
                      color: "whitesmoke",
                      padding: ".7rem",
                      width: "100%"
                    }}
                    onClick={() => {
                      hundleAddTaskClick();
                    }}
                    disabled={taskInput === "" ? true : false}
                  >
                    Add Task
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
