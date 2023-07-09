// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import styled from "styled-components";

// const Container = styled.div`
//   max-width: 400px;
//   margin: 0 auto;
//   padding: 20px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
// `;

// const Heading = styled.h2`
//   font-size: 24px;
//   margin-bottom: 20px;
//   text-align: center;
// `;

// const ProjectInfo = styled.div`
//   margin-bottom: 20px;
// `;

// const ProjectName = styled.p`
//   font-size: 18px;
//   font-weight: bold;
// `;

// const ProjectBudget = styled.p`
//   font-size: 16px;
//   margin-top: 5px;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 10px;
//   margin-bottom: 20px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
// `;

// const Button = styled.button`
//   background-color: #007bff;
//   color: #fff;
//   border: none;
//   padding: 10px 20px;
//   border-radius: 4px;
//   cursor: pointer;
//   font-size: 16px;
//   width: 100%;

//   &:hover {
//     background-color: #0056b3;
//   }
// `;

// const Payment = () => {
//   const client_id = localStorage.getItem("user_id");
//   const [project, setProject] = useState(null);
//   const [paymentId, setPaymentId] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProject = async () => {
//       try {
//         const response = await axios.get(`/api/projects/${client_id}`);
//         setProject(response.data);
//       } catch (error) {
//         console.log(error.response?.data);
//       }
//     };

//     fetchProject();
//   }, [client_id]);

//   // const handlePayment = async () => {
//   //   try {
//   //     const response = await axios.post('http://127.0.0.1:8000/api/paypal/pay', {
//   //       amount: project?.budget || 0
//   //     });
//   //     setPaymentId(response.data?.paymentId);
//   //     window.location.href = response.data?.redirectUrl;
//   //     handleSuccess();
//   //   } catch (error) {
//   //     console.log(error.response?.data);
//   //     handleError();
//   //     toast.error('Failed to initiate the payment.');
//   //   }
//   // };

//   const handlePayment = async () => {
//     try {
//       const data = {
//         amount: 1100,
//         project_id: 2,
//         user_id: 1,
//       };
//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/paypal/pay",
//         data
//       );

//       setPaymentId(response.data?.paymentId);
//       window.location.href = response.data?.redirectUrl;
//     } catch (error) {
//       console.log(error.response?.data);
//       // Handle error accordingly
//       toast.error("Failed to initiate the payment.");
//     }
//   };

//   const handleSuccess = async () => {
//     try {
//       const response = await axios.post("http://127.0.0.1:8000/api/success", {
//         paymentId: paymentId,
//       });
//       if (
//         response.status === 200 &&
//         response.data.message === "Payment is Successful."
//       ) {
//         // Handle successful payment
//         toast.success("Payment completed successfully.");
//         navigate("/client/");
//       } else {
//         toast.error("Failed to complete the payment.");
//       }
//     } catch (error) {
//       console.log(error.response?.data);

//       toast.error("Failed to complete the payment.");
//     }
//   };

//   const handleError = async () => {
//     try {
//       toast.info("Payment cancelled by the user.");
//       navigate("/payment");
//     } catch (error) {
//       console.log(error.response?.data);

//       toast.error("Failed to cancel the payment.");
//     }
//   };

//   useEffect(() => {
//     if (window.location.href.includes("/success")) {
//       handleSuccess();
//     } else if (window.location.href.includes("/error")) {
//       handleError();
//     }
//   }, []);

//   return (
//     <Container>
//       <Heading>Pay with PayPal</Heading>
//       {project ? (
//         <ProjectInfo>
//           <ProjectName>Project Name: {project.name}</ProjectName>
//           <ProjectBudget>Project Budget: {project.budget}</ProjectBudget>
//         </ProjectInfo>
//       ) : (
//         <p>No projects available.</p>
//       )}
//       <Input
//         type="number"
//         readOnly
//         name="amount"
//         value={project?.budget || 0}
//       />
//       <Button
//         disabled={Number(project?.budget || 10) === 0}
//         onClick={handlePayment}
//       >
//         Pay Now
//       </Button>
//     </Container>
//   );
// };

// export default Payment;

import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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

export default function CustomizedTables() {
  const client_id = localStorage.getItem("user_id");

  const [paymentId, setPaymentId] = useState(null);
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    try {
      const response = axios
        .get(`http://127.0.0.1:8000/api/projects/search/unpaid`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          const data = response.data;
          // console.log("adadasdasasdasd");
          console.log(data);
          setProjects(data.data);
        })
        .catch((error) => {
          toast.error("Error updating project: " + error.message);
        });
    } catch (error) {
      toast.error(error.message);
    }
  }, []);

  const handlePayment = async (row) => {
    try {
      const data = {
        amount: row.budget || 0,
        project_id: row.id || 0,
        user_id: client_id,
      };
      // console.log(data);
      const response = await axios.post(
        "http://127.0.0.1:8000/api/paypal/pay",
        data,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setPaymentId(response.data?.paymentId);
      window.location.href = response.data?.redirectUrl;
    } catch (error) {
      console.log(error.response?.data);

      toast.error("Failed to initiate the payment.");
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">is_Payed</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
            {/* <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.budget}</StyledTableCell>
              <StyledTableCell align="right">
                {row.is_payed === 0 ? "Not Payed" : "Payed"}
              </StyledTableCell>
              <StyledTableCell align="right">
                <Button
                  onClick={() => handlePayment(row)}
                  variant="contained"
                  color="primary"
                  size="small"
                >
                  PAY
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
