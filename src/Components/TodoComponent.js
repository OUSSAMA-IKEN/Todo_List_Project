import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useContext } from "react";
import { todoListContext } from "../Context/TodoListContext";

export default function Todo({
  Todo,
  hundleOpenEditModalProp,
  hundleOpenDeleteModalProp
}) {
  /* ====== Context ====== */
  const { task, setTask } = useContext(todoListContext);

  /* ======== hundle Check Task  ======== */
  const hundleCheckClick = () => {
    const updatedTask = task.map((task) => {
      if (task.id === Todo.id) {
        task.completed = !task.completed;
      }
      return task;
    });
    setTask(updatedTask);
    // update Data in local storage
    localStorage.setItem("task", JSON.stringify(updatedTask));
  };

  return (
    <Container>
      <Card
        sx={{ minWidth: 275, backgroundColor: "#191b1f", borderRadius: "12px" }}
        style={{ marginTop: "10px" }}
      >
        <CardContent>
          <Grid container>
            <Grid size={8} style={{}} display="flex" flexDirection={"column"}>
              <Typography
                variant="h5"
                sx={{
                  color: "white",
                  textAlign: "left",
                  fontWeight: "normal",
                  textDecoration: Todo.completed ? "line-through" : "none"
                }}
              >
                {Todo.title}
              </Typography>

              <Typography
                variant="caption"
                sx={{
                  color: "white",
                  textAlign: "left",
                  fontWeight: "noramal",
                  marginLeft: "2px"
                }}
              >
                {Todo.description}
              </Typography>
            </Grid>
            <Grid
              size={4}
              style={{ color: "white" }}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              {/*=== buttons === */}

              {/* check Button */}
              <IconButton
                className="buttons"
                aria-label="check"
                style={{
                  color: Todo.completed ? "whitesmoke" : "#66B3FF",
                  backgroundColor: Todo.completed ? "#22a488 " : "whitesmoke",
                  border: "solid 3px #66B3FF "
                }}
                onClick={() => {
                  hundleCheckClick();
                }}
              >
                <CheckIcon />
              </IconButton>

              {/* edit Button */}

              <IconButton
                className="buttons"
                aria-label="edit"
                style={{
                  color: "#66B3FF",
                  backgroundColor: "whitesmoke",
                  border: "solid 3px #66B3FF "
                }}
                onClick={() => {
                  hundleOpenEditModalProp(Todo);
                }}
              >
                <EditIcon />
              </IconButton>

              {/* delete Button */}
              <IconButton
                className="buttons"
                aria-label="delete"
                style={{
                  color: "#66B3FF",
                  backgroundColor: "whitesmoke",
                  border: "solid 3px #66B3FF "
                }}
                onClick={() => {
                  hundleOpenDeleteModalProp(Todo);
                }}
              >
                <DeleteIcon />
              </IconButton>
              {/*---=== buttons ===--- */}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
