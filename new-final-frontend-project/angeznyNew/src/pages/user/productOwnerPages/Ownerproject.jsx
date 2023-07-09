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
import Divider from "@mui/joy/Divider";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
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
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Container from "@mui/material/Container";
import Slide from "@mui/material/Slide";

// import { CometChatUI } from "./cometchat-pro-react-ui-kit/CometChatWorkspace/src";
function Row(props) {
  const token = localStorage.getItem("token");
  const { row, onDelete } = props;
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [managers, setManagers] = React.useState([]);
  const [selectedManagerId, setSelectedManagerId] = React.useState(
    row.ProductManager.id
  );
  const [owners, setOwners] = React.useState([]);
  const [selectedOwnerId, setSelectedOwnerId] = React.useState(
    row.productOnwer.id
  );
  const [status, setStatus] = React.useState(row.status);
  const [type, setType] = React.useState(row.type);
  const [title, setTitle] = React.useState(row.name);
  const [description, setDescription] = React.useState(row.description);
  const [startDate, setStartDate] = React.useState(row.start);
  const [endDate, setEndDate] = React.useState(row.start);
  const [price, setPrice] = React.useState(row.budget);
  const [openDialogDelete, setOpenDialogDelete] = React.useState(false);

  const getClassByStatus = (status) => {
    if (status === "completed") {
      return "green"; // Apply green color for 'completed' status
    } else if (status === "in_progress") {
      return "warning"; // Apply warning color for 'in_progress' status
    } else {
      return "red"; // Apply red color for other statuses
    }
  };
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };
  React.useEffect(() => {
    const startdate = row.start.split(" ")[0]; // Extract the date part from row.start
    setStartDate(startdate);
    const enddate = row.end.split(" ")[0];
    setEndDate(enddate);
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
  const handleTypeChange = (event) => {
    setType(event.target.value);
  };
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };
  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };
  // const handleDelete = async (event) => {
  //   event.preventDefault();
  //   try {
  //     await axios.delete(`http://127.0.0.1:8000/api/projects/${row.id}`, {
  //       headers: {
  //         Accept: "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     toast.success("project Deleted");
  //   } catch (error) {
  //     toast.error("Error Deleting project: " + error.message);
  //   }
  //   setOpenDialogDelete(false);
  // };
  const handleSave = async (event) => {
    event.preventDefault();
    if (price < 0) {
      toast.error("budget must be greater than 0");
      return;
    }
    await axios
      .put(
        `http://127.0.0.1:8000/api/projects/${row.id}`,
        {
          project_title: title,
          project_type: type,
          project_description: description,
          project_start: startDate,
          project_end: endDate,
          ProductOwner_id: row.productOnwer.id,
          ProductManager_id: row.ProductManager.id,
          client_id: row.client.id,
          project_status: status,
          budget: price,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        toast.success("Task Updated");
        row.name = title;
        row.type = type;
        row.description = description;
        row.start = startDate;
        row.end = endDate;
        row.status = status;
        row.budget = price;
      })
      .catch((error) => toast.error("Error updating Task:" + error.message));
    setOpenDialog(false);
  };

  const handleOpenDialog = (event) => {
    setOpenDialog(true);
  };
  const handleDelete = async (event) => {
    event.preventDefault();
    onDelete(row.id);
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
          {row.type}
        </StyledTableCell>
        <StyledTableCell align="right" className={getClassByStatus(row.status)}>
          {row.status}
        </StyledTableCell>
        <StyledTableCell align="right">{row.start}</StyledTableCell>
        <StyledTableCell align="right">{row.end}</StyledTableCell>
        <StyledTableCell align="right">{row.budget}</StyledTableCell>
        <StyledTableCell align="right">{row.client.name}</StyledTableCell>
        <StyledTableCell align="center">
          <Button variant="outlined" color="neutral" onClick={handleOpenDialog}>
            <EditIcon variant="contained" className="ms-2" color="warning" />
          </Button>

          <Modal open={openDialog} onClose={() => setOpenDialog(false)}>
            <ModalDialog
              aria-labelledby="basic-modal-dialog-title"
              aria-describedby="basic-modal-dialog-description"
              sx={{ maxWidth: 800 }}
            >
              <Typography id="basic-modal-dialog-title" component="h2">
                Update Information Project
              </Typography>
              <div style={{ maxWidth: 800, overflow: "auto" }}>
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
                      <FormLabel>Budget</FormLabel>
                      <Input
                        value={price}
                        onChange={handlePriceChange}
                        autoFocus
                        type="number"
                        inputProps={{ min: 0 }}
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
                      <FormLabel>Type</FormLabel>
                      <Select
                        value={type}
                        onChange={handleTypeChange}
                        autoFocus
                        required
                      >
                        <MenuItem value="mileStone">Milestone</MenuItem>
                        <MenuItem value="byProject">By Project</MenuItem>
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
              </div>
            </ModalDialog>
          </Modal>
          {/* ///////////// */}

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
                Are you sure you want to delete this Project?
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
                  Delete Project
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

const Ownerproject = ({ status }) => {
  const token = localStorage.getItem("token");
  // const decodedToken = jwtDecode(token);
  // const id = decodedToken.user_id;
  const id = 2;

  const [projects, setProjects] = React.useState([]);

  React.useEffect(() => {
    // Fetch questions from backend API
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
            setProjects(data.data);
          }
        } else {
          setProjects([]);
        }
      } catch (error) {
        toast.error(error);
      }
    };
    const fetchProjectsByStatus = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/projects/search/${status}`,
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
            setProjects(data.data);
            console.log(data);
          }
        } else {
          setProjects([]);
        }
      } catch (error) {
        toast.error(error);
      }
    };
    if (status == "all") {
      fetchProjects();
    } else {
      fetchProjectsByStatus();
    }
  }, [status]);
  const handleDelete = async (projectId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/projects/${projectId}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== projectId)
      );

      toast.success("Project deleted");
    } catch (error) {
      toast.error("Error deleting project: " + error.message);
    }
  };
  return (
    <Box sx={{ marginTop: "30px", overflowX: "auto" }}>
      {projects.length > 0 ? (
        <Container>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <StyledTableCell />
                  <StyledTableCell>Title</StyledTableCell>
                  <StyledTableCell>Project Type</StyledTableCell>
                  <StyledTableCell align="right">Status</StyledTableCell>
                  <StyledTableCell align="center">Start</StyledTableCell>
                  <StyledTableCell align="center">End</StyledTableCell>
                  <StyledTableCell align="right">budget</StyledTableCell>
                  <StyledTableCell align="right">Client</StyledTableCell>

                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {projects.map((project) => (
                  <Row
                    key={project.id}
                    row={project}
                    onDelete={() => handleDelete(project.id)}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      ) : (
        <Typography component="div" align="center" color="danger">
          No projects found.
        </Typography>
      )}
    </Box>
  );
};

export default Ownerproject;
