import * as React from "react";
import { toast } from "react-toastify";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/joy/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import { Select, MenuItem } from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import axios from "axios";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import Divider from "@mui/joy/Divider";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import Add from "@mui/icons-material/Add";
import jwtDecode from "jwt-decode";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import { CometChat } from "@cometchat-pro/chat";

import MDButton from "components/MDButton";
// import { CometChatUI } from "./cometchat-pro-react-ui-kit/CometChatWorkspace/src";
function Row(props) {
  const token = "5|mfYgbX7HbdrG2lFSkipBbD6k98OSVIJghUI5rXOP";
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [developers, setDevelopers] = React.useState([]);
  const [selectedDeveloperId, setSelectedDeveloperId] = React.useState();
  const [openDialogDelete, setOpenDialogDelete] = React.useState(false);
  const [status, setStatus] = React.useState(row.status);
  const [title, setTitle] = React.useState(row.name);
  const [description, setDescription] = React.useState(row.description);
  const [startDate, setStartDate] = React.useState(row.start);
  const [endDate, setEndDate] = React.useState(row.start);

  const getClassByStatus = (status) => {
    if (status == "completed") {
      return "green"; // Apply green color for 'completed' status
    } else if (status == "in_progress") {
      return "warning"; // Apply warning color for 'in_progress' status
    } else {
      return "red"; // Apply red color for other statuses
    }
  };
  React.useEffect(() => {
    const startdate = row.start.split(" ")[0]; // Extract the date part from row.start
    setStartDate(startdate);
    const enddate = row.end.split(" ")[0];
    setEndDate(enddate);
    const fetchDevelopers = async () => {
      try {
        var response;
        if (row.project.type == "mileStone") {
          response = await fetch(`http://127.0.0.1:8000/api/freeFreelancers`, {
            headers: {
              Accept: "application/json",
            },
          });
        } else if (row.project.type == "byProject") {
          response = await fetch(`http://127.0.0.1:8000/api/freeEmployees`, {
            headers: {
              Accept: "application/json",
            },
          });
        }

        if (response.ok) {
          const data = await response.json();
          if (data) {
            setDevelopers(data.data);
          }
        } else {
          toast.error("Failed to fetch Project data");
        }
      } catch (error) {
        toast.error(error);
      }
    };
    fetchDevelopers();
  }, [row.start, row.end]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };
  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };
  const handleTaskChange = (event) => {
    setSelectedDeveloperId(event.target.value);
  };
  const handleSave = async (event) => {
    event.preventDefault();
    await axios
      .put(
        `http://127.0.0.1:8000/api/task/${row.id}`,
        {
          project_id: row.project.id,
          product_manager_id: row.productManager.id,
          task_title: title,
          task_description: description,
          task_start: startDate,
          task_end: endDate,
          task_status: status,
          assigned_to: selectedDeveloperId,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        // Update the task data in the local state
        // setTasks((prevTasks) => {
        //   const updatedTasks = prevTasks.map((task) => {
        //     if (task.id === row.id) {
        //       // Update the task properties with the new values
        //       return {
        //         ...task,
        //         task_title: title,
        //         task_description: description,
        //         task_start: startDate,
        //         task_end: endDate,
        //         status: status,
        //       };
        //     }
        //     return task;
        //   });
        //   return updatedTasks;
        // });
        toast.success("Task Updated");
      })
      .catch((error) => toast.error("Error updating Task:" + error.message));
    setOpenDialog(false);
  };
  const handleDelete = async (event) => {
    event.preventDefault();
    await axios
      .delete(`http://127.0.0.1:8000/api/task/${row.id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success("Task Deleted");
      })
      .catch((error) => toast.error("Error Deleted Task:", error));
    setOpenDialogDelete(false);
  };
  return (
    <React.Fragment>
      <style>
        {`
          .green {
            color: green;
          }
          
          .warning {
            color: yellow;
          }
          
          .red {
            color: red;
          }
          `}
      </style>

      <StyledTableRow
        component={Paper}
        sx={{ "& > *": { borderBottom: "unset" } }}
      >
        <StyledTableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          {row.name}
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          {row.project.name}
        </StyledTableCell>
        <StyledTableCell align="right" className={getClassByStatus(row.status)}>
          {row.status}
        </StyledTableCell>
        <StyledTableCell align="right">{row.start}</StyledTableCell>
        <StyledTableCell align="right">{row.end}</StyledTableCell>
        <StyledTableCell align="right">
          {row.productManager.name}
        </StyledTableCell>
        <StyledTableCell align="center">
          <Button
            variant="outlined"
            color="neutral"
            onClick={() => setOpenDialog(true)}
          >
            <EditIcon variant="contained" className="ms-2" color="warning" />
          </Button>

          <Modal open={openDialog} onClose={() => setOpenDialog(false)}>
            <ModalDialog
              aria-labelledby="basic-modal-dialog-title"
              aria-describedby="basic-modal-dialog-description"
              sx={{ maxWidth: 700 }}
            >
              <Typography id="basic-modal-dialog-title" component="h2">
                Update Information Task
              </Typography>

              <form onSubmit={handleSave}>
                <Stack spacing={2}>
                  <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input
                      value={title}
                      onChange={handleTitleChange}
                      autoFocus
                      required
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Status</FormLabel>
                    <Select
                      value={status}
                      onChange={handleStatusChange}
                      autoFocus
                      required
                    >
                      <MenuItem value="notStarted">Not Started</MenuItem>
                      <MenuItem value="inProgress">In Progress</MenuItem>
                      <MenuItem value="completed">Completed</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Start</FormLabel>
                    <Input
                      value={startDate}
                      onChange={handleStartDateChange}
                      autoFocus
                      required
                      type="date"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>End</FormLabel>
                    <Input
                      value={endDate}
                      onChange={handleEndDateChange}
                      autoFocus
                      required
                      type="date"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Assigned to</FormLabel>
                    <Select
                      value={selectedDeveloperId}
                      onChange={handleTaskChange}
                      autoFocus
                    >
                      {developers.map((developer) => (
                        <MenuItem key={developer.id} value={developer.id}>
                          {developer.user.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Description</FormLabel>
                    <TextareaAutosize
                      minRows={3}
                      value={description}
                      onChange={handleDescriptionChange}
                      autoFocus
                      required
                    />
                  </FormControl>
                  <Button type="submit">Submit</Button>
                </Stack>
              </form>
            </ModalDialog>
          </Modal>

          {/* /////////////// */}
          <Button
            variant="outlined"
            color="danger"
            className="ms-2"
            onClick={() => setOpenDialogDelete(true)}
          >
            <DeleteForeverIcon
              variant="contained"
              className="ms-1"
              color="error"
            />
          </Button>
          <Modal
            open={openDialogDelete}
            onClose={() => setOpenDialogDelete(false)}
          >
            <ModalDialog
              variant="outlined"
              role="alertdialog"
              aria-labelledby="alert-dialog-modal-title"
              aria-describedby="alert-dialog-modal-description"
            >
              <Typography
                id="alert-dialog-modal-title"
                component="h2"
                startDecorator={<WarningRoundedIcon />}
              >
                Confirmation
              </Typography>
              <Divider />
              <Typography
                id="alert-dialog-modal-description"
                textColor="text.tertiary"
              >
                Are you sure you want to delete this task?
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  justifyContent: "flex-end",
                  pt: 2,
                }}
              >
                <Button
                  variant="plain"
                  color="neutral"
                  onClick={() => setOpenDialogDelete(false)}
                >
                  Cancel
                </Button>
                <Button variant="solid" color="danger" onClick={handleDelete}>
                  Delete Task
                </Button>
              </Box>
            </ModalDialog>
          </Modal>
        </StyledTableCell>
      </StyledTableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Description
              </Typography>
              <Box>{row.description}</Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Tasks = () => {
  const token = "5|mfYgbX7HbdrG2lFSkipBbD6k98OSVIJghUI5rXOP";
  // const decodedToken = jwtDecode(token);
  // const id = decodedToken.user_id;
  const id = 2;

  const [tasks, setTasks] = React.useState([]);
  const [projects, setProjects] = React.useState([]);
  const [developers, setDevelopers] = React.useState([]);
  const [selectedProjectId, setSelectedProjectId] = React.useState();
  const [selectedDeveloperId, setSelectedDeveloperId] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [searchSkill, setSearchSkill] = React.useState("");
  const [users, setUsers] = React.useState("");
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    // Fetch questions from backend API
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/task/searchTaskByUsers`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (data) {
            setTasks(data.data);
          }
        } else {
          toast.error("Failed to fetch Task data");
        }
      } catch (error) {
        toast.error(error);
      }
    };

    fetchTasks();
  }, [tasks]);
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleProjectChange = (event) => {
    setSelectedProjectId(event.target.value);
    const fetchDevelopers = async () => {
      try {
        var response;
        const selectedProject = projects.find(
          (project) => project.id == event.target.value
        );
        const selectedProjectType = selectedProject
          ? selectedProject.project_type
          : null;
        console.log(selectedProjectType);
        if (selectedProjectType == "mileStone") {
          response = await fetch(`http://127.0.0.1:8000/api/freeFreelancers`, {
            headers: {
              Accept: "application/json",
            },
          });
        } else if (selectedProjectType == "byProject") {
          response = await fetch(`http://127.0.0.1:8000/api/freeEmployees`, {
            headers: {
              Accept: "application/json",
            },
          });
        }

        if (response.ok) {
          const data = await response.json();
          if (data) {
            console.log(data);
            setDevelopers(data.data);
          }
        } else {
          toast.error("Failed to fetch Project data");
        }
      } catch (error) {
        toast.error(error);
      }
    };
    fetchDevelopers();
  };

  const handleTaskChange = (event) => {
    setSelectedDeveloperId(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };
  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };
  const handleSearch = () => {
    // Make the API request to fetch users based on the entered skill
    fetchUsersBySkill(searchSkill);
  };
  const fetchUsersBySkill = async (skill) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/search/Skill/${skill}/mileStone`
      );
      if (response.ok) {
        const data = await response.json();
        // Process the data and update the user list state variable
        console.log(data);
        setUsers(data.data);
      } else {
        toast.error("Failed to fetch users");
      }
    } catch (error) {
      toast.error("Error fetching users: " + error.message);
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();
    // console.log(id);
    await axios
      .post(
        `http://127.0.0.1:8000/api/task`,
        {
          project_id: selectedProjectId,
          product_manager_id: id,
          task_title: title,
          task_description: description,
          task_start: startDate,
          task_end: endDate,
          task_status: status,
          assigned_to: selectedDeveloperId,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        toast.success("Task Created");
      })
      .catch((error) => {
        toast.error("Error Creating Task: " + error.message);
      });
    setOpen(false);
  };

  const openHandleSave = async (event) => {
    event.preventDefault();
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/projects/searchProjectByUsers`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (data) {
            setProjects(data);
          }
        } else {
          toast.error("Failed to fetch Project data");
        }
      } catch (error) {
        toast.error(error);
      }
    };

    fetchProjects();
    setOpen(true);
  };

  const handleSend = () => {
    const appID = "240169ef153c40df";
    const region = "US";
    const authKey = "581f246117c147b5f041cf28049c89388b3fc5cd";
    const appSetting = new CometChat.AppSettingsBuilder()
      .subscribePresenceForAllUsers()
      .setRegion(region)
      .build();

    CometChat.init(appID, appSetting).then(
      () => {
        console.log("Initialization completed successfully");
        // You can now proceed with rendering your app or calling the login function.
        const messageText = message;
        const receiverID = "user2";
        const receiverType = CometChat.RECEIVER_TYPE.USER;

        const textMessage = new CometChat.TextMessage(
          receiverID,
          messageText,
          receiverType
        );

        CometChat.sendMessage(textMessage).then(
          (message) => {
            console.log("Message sent successfully:", message);
          },
          (error) => {
            console.log("Message sending failed with error:", error);
          }
        );
      },
      (error) => {
        console.log("Initialization failed with error:", error);
        // Check the reason for error and take appropriate action.
      }
    );
  };
  return (
    <Box sx={{ margin: "50px", overflowX: "auto" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <TextField
          id="input-with-icon-textfield"
          color="success"
          placeholder="Search for users with skills"
          size="lg"
          variant="outlined"
          sx={{ width: "40%", marginBottom: "10px", marginRight: "15px" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" onClick={handleSearch}>
                <SearchIcon onClick={handleSearch} />
              </InputAdornment>
            ),
          }}
          value={searchSkill}
          onChange={(event) => setSearchSkill(event.target.value)}
        />
        <TextField
          id="input-with-icon-textfield"
          color="success"
          placeholder="Send message for this user"
          size="lg"
          variant="outlined"
          sx={{ width: "40%", marginBottom: "10px", marginRight: "15px" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" onClick={handleSend}>
                <SendIcon onClick={handleSend} />
              </InputAdornment>
            ),
          }}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />

        {/* <Button
          variant="outlined"
          color="neutral"
          startDecorator={<Add />}
          sx={{ width: "15%" }}
          onClick={openHandleSave}
          fontSize="10"
        >
          ADD Task
        </Button> */}

        <MDButton
          startDecorator={<Add />}
          onClick={openHandleSave}
          variant="gradient"
          color="info"
          sx={{ width: "15%" }}
        >
          + ADD Task
        </MDButton>

        <Modal
          sx={{ overflow: "auto" }}
          open={open}
          onClose={() => setOpen(false)}
        >
          <ModalDialog
            aria-labelledby="basic-modal-dialog-title"
            aria-describedby="basic-modal-dialog-description"
            sx={{ maxWidth: 500, overflow: "auto" }}
          >
            <Typography id="basic-modal-dialog-title" component="h2">
              Create new Task
            </Typography>
            <Typography
              id="basic-modal-dialog-description"
              textColor="text.tertiary"
            >
              Fill in the information of the Task.
            </Typography>
            <form onSubmit={handleSave}>
              <Stack spacing={2}>
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input
                    value={title}
                    onChange={handleTitleChange}
                    autoFocus
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Project Name</FormLabel>
                  <Select
                    value={selectedProjectId}
                    onChange={handleProjectChange}
                    autoFocus
                    required
                  >
                    {projects.map((project) => (
                      <MenuItem key={project.id} value={project.id}>
                        {project.project_title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Status</FormLabel>
                  <Select
                    value={status}
                    onChange={handleStatusChange}
                    autoFocus
                    required
                  >
                    <MenuItem value="notStarted">Not Started</MenuItem>
                    <MenuItem value="inProgress">In Progress</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Start</FormLabel>
                  <Input
                    value={startDate}
                    onChange={handleStartDateChange}
                    autoFocus
                    required
                    type="date"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>End</FormLabel>
                  <Input
                    value={endDate}
                    onChange={handleEndDateChange}
                    autoFocus
                    required
                    type="date"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Assigned to</FormLabel>
                  <Select
                    value={selectedDeveloperId}
                    onChange={handleTaskChange}
                    autoFocus
                    required
                  >
                    {developers.map((developer) => (
                      <MenuItem key={developer.id} value={developer.id}>
                        {developer.user.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <TextareaAutosize
                    minRows={3}
                    value={description}
                    onChange={handleDescriptionChange}
                    autoFocus
                    required
                  />
                </FormControl>
                <Button type="submit">Submit</Button>
              </Stack>
            </form>
          </ModalDialog>
        </Modal>
      </Box>
      <Box>
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id}>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              {/* Add other user information you want to display */}
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <StyledTableCell />
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell>Project Name</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="center">Start</StyledTableCell>
              <StyledTableCell align="center">End</StyledTableCell>
              <StyledTableCell align="right">assigned To</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <Row key={task.id} row={task} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Tasks;
