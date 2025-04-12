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

// * ====== Dialog Delete ====== */
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

/* ====== Dialog Edit ====== */
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";

export default function Todo({ Todo }) {
  /* ====== Context ====== */
  const { task, setTask } = useContext(todoListContext);

  /* ======== State ======== */
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [editTask, seteditTask] = React.useState({
    title: Todo.title,
    description: Todo.description
  });

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
    localStorage.setItem("task",JSON.stringify(updatedTask));
  };

  /* ======== hundle Delete Task  ======== */
  const handleClickOpen = () => {
    setOpenDeleteModal(true);
  };

  const hundleDeleteclick = () => {
    const updatedTask = task.filter((task) => task.id !== Todo.id);
    setTask(updatedTask);
    // update Data in local storage
    localStorage.setItem("task", JSON.stringify(updatedTask));
  };

  const handleAgree = () => {
    hundleDeleteclick();
    setOpenDeleteModal(false);
  };
  const handleCloseDisagree = () => {
    setOpenDeleteModal(false);
  };

  // * ======== hundle Edit Task  ======== */
  const hundleEditeTask = () => {
    const updatedTask = task.map((t) => {
      if (t.id === Todo.id) {
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
  };

  const hundleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const hundleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  return (
    <Container>
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
                  textDecoration:Todo.completed?"line-through":"none",
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
                onClick={hundleOpenEditModal}
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
                onClick={(e) => {
                  handleClickOpen();
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
