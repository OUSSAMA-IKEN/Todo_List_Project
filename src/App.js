import "./App.css";
import React from "react";
import TodoList from "./Components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { todoListContext } from "./Context/TodoListContext";
import { useState } from "react";
import { useEffect } from "react";
import Snackbars from "./Components/SnackBar";
import { SnackBarContext } from "./Context/SnackBarContext";

// theme
const theme1 = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 0 30px 2px rgba(102, 179, 255, 0.5)"
        }
      }
    }
  },
  typography: {
    fontFamily: "montserrat",
    button: {
      fontSize: "1.1rem",
      fontWeight: "500"
    },
    caption: {
      // this the caption we use in varient
      fontSize: ".9rem",
      fontWeight: "400"
    },
    h5: {
      fontSize: "1.7rem",
      fontWeight: "700"
    }
  },
  palette: {
    primary: {
      main: "#01579b"
    }
  }
});

// todo list  disabled because of localStorage
/* ----- Todos  ---- */
// const todos = [
//   {
//     id: uuidv4(),
//     title: "First Task",
//     description: "Task description",
//     completed: false
//   },
//   {
//     id: uuidv4(),
//     title: "Second Task",
//     description: "Task description",
//     completed: false
//   },
//   {
//     id: uuidv4(),
//     title: "Third Task",
//     description: "Task description",
//     completed: false
//   }
// ];

function App() {
  const [task, setTask] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  // use effect getting Data fromlocalStorage
  useEffect(() => {
    const localStorageTask = localStorage.getItem("task") ?? "[]";
    if (localStorageTask) {
      setTask(JSON.parse(localStorageTask));
    }
  }, []);

  // hundle Snack Bar
  const showSnackbar = (messageParametre) => {
    setMessage(messageParametre);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  return (
    <ThemeProvider theme={theme1}>
      <todoListContext.Provider value={{ task, setTask }}>
        <SnackBarContext.Provider value={{ showSnackbar }}>
          <div
            className="App"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              backgroundColor: "#191b1f"
            }}
          >
            <TodoList />
          </div>
        </SnackBarContext.Provider>
        <Snackbars open={open} messageProp={message} />
      </todoListContext.Provider>
    </ThemeProvider>
  );
}

export default App;
