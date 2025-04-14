import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { useState } from "react";
import "../App.css";
import { v4 as uuidv4 } from "uuid";
import { todoListContext } from "../Context/TodoListContext";
import { useContext } from "react";
import { useMemo } from "react";

/* ====== Dialog Edit & Delete ====== */
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { SnackBarContext } from "../Context/SnackBarContext";

/* ----- import Components---- */
import Todo from "./TodoComponent";

export default function TodoList() {
  /* ====== Context ====== */
  const { task, setTask } = useContext(todoListContext);
  const { showSnackbar } = useContext(SnackBarContext);

  /* ======== Hooks ======== */
  const [taskInput, setTaskInput] = useState("");

  // Edit Modal States
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [selectedTodo, setSelectedTodo] = useState({});
  const [editTask, seteditTask] = React.useState({
    title: "",
    description: ""
  });

  // Edit Modal States
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);

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
    showSnackbar("Task has been added seccessfuly !");
  };

  /* ======= Tasks Filtering ======== */
  const completedTasks = useMemo(() => {
    return task.filter((task) => task.completed === true);
  }, [task]);

  const pendingTasks = useMemo(() => {
    return task.filter((task) => task.completed === false);
  }, [task]);

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

  // * ======== hundle Edit Task  ======== */
  const hundleEditeTask = () => {
    const updatedTask = task.map((t) => {
      if (t.id === selectedTodo.id) {
        return {
          ...t,
          title: editTask.title,
          description: editTask.description
        };
      }
      return t;
    });
    setTask(updatedTask);
    // update Data in local storage
    localStorage.setItem("task", JSON.stringify(updatedTask));
    setOpenEditModal(false);
    showSnackbar("Task has been edited seccessfuly !");
  };

  const hundleOpenEditModal = (todoClicked) => {
    setOpenEditModal(true);
    setSelectedTodo(todoClicked);
    seteditTask({
      title: todoClicked.title,
      description: todoClicked.description
    });
  };

  const hundleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  /* ======== hundle Delete Task  ======== */
  const handleClickOpen = (todoClicked) => {
    setOpenDeleteModal(true);
    setSelectedTodo(todoClicked);
  };

  const hundleDeleteclick = () => {
    const updatedTask = task.filter((task) => task.id !== selectedTodo.id);
    setTask(updatedTask);
    // update Data in local storage
    localStorage.setItem("task", JSON.stringify(updatedTask));
    showSnackbar("Task has been removed seccessfuly !");
  };

  const handleAgree = () => {
    hundleDeleteclick();
    setOpenDeleteModal(false);
  };
  const handleCloseDisagree = () => {
    setOpenDeleteModal(false);
  };

  /* ========  todos maping  ======== */
  const todosMap = filteredTasks.map((todo) => {
    return (
      <Todo
        key={todo.id}
        Todo={todo}
        hundleOpenEditModalProp={hundleOpenEditModal}
        hundleOpenDeleteModalProp={handleClickOpen}
      />
    );
  });
  let length = task.length;

  return (
    <>
      {/* ========= Start Edit Modal ========= */}
      <Dialog
        open={openEditModal}
        onClose={hundleCloseEditModal} // when the user click outside the modal
        style={{
          width: "90%",
          margin: "auto"
        }}
      >
        <DialogTitle> Edit Information</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Update the details below and click Save to apply the changes. Make
            sure all fields are correct before submitting.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Task Name"
            type="text"
            fullWidth
            variant="standard"
            value={editTask.title}
            onChange={(e) => {
              seteditTask({ ...editTask, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Task Description"
            type="text"
            fullWidth
            variant="standard"
            value={editTask.description}
            onChange={(e) => {
              seteditTask({ ...editTask, description: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={hundleCloseEditModal}>Cancel</Button>
          <Button onClick={hundleEditeTask}>Apply</Button>
        </DialogActions>
      </Dialog>
      {/* ========= End Edit Modal ========= */}

      {/*  ======== Start Delete Modal ========  */}
      <Dialog
        open={openDeleteModal}
        onClose={handleCloseDisagree} // when the user click outside the modal
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are You Sure?"}</DialogTitle>

        <DialogActions>
          <Button onClick={handleCloseDisagree}>Disagree</Button>
          <Button onClick={handleAgree} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      {/*  ======== End Delete Modal ========  */}

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
