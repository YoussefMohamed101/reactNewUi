import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Heading = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
`;

const ProjectInfo = styled.div`
  margin-bottom: 20px;
`;

const ProjectName = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

const ProjectBudget = styled.p`
  font-size: 16px;
  margin-top: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;

  &:hover {
    background-color: #0056b3;
  }
`;

const Payment = () => {
  const client_id = localStorage.getItem('user_id');
  const [project, setProject] = useState(null);
  const [paymentId, setPaymentId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`/api/projects/${client_id}`);
        setProject(response.data);
      } catch (error) {
        console.log(error.response?.data);
      }
    };

    fetchProject();
  }, [client_id]);

  
    
  // const handlePayment = async () => {
  //   try {
  //     const response = await axios.post('http://127.0.0.1:8000/api/paypal/pay', {
  //       amount: project?.budget || 0
  //     });
  //     setPaymentId(response.data?.paymentId);
  //     window.location.href = response.data?.redirectUrl;
  //     handleSuccess(); 
  //   } catch (error) {
  //     console.log(error.response?.data);
  //     handleError();
  //     toast.error('Failed to initiate the payment.');
  //   }
  // };


  // const handlePayment = async () => {
  //   try {
      
  //     const response = await axios.post('http://127.0.0.1:8000/api/paypal/pay', {
  //       amount:  100 ,//project?.budget || 0,
  //       project_id:1,// project?.id,
  //       user_id:16,// client_id
  //     });
      
     
  //     setPaymentId(response.data?.paymentId);
  //     window.location.href = response.data?.redirectUrl;
    
  //   } catch (error) {
  //     console.log(error.response?.data);
     

  //   }
  // }
  const handlePayment = async () => {
    const data ={
      amount: 1100 ,
      project_id: 1 ,
      user_id: 16 ,
      paymentId: paymentId
    } 
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/paypal/pay', 
        JSON.stringify(data)
      );
  
      setPaymentId(response.data?.paymentId);
      window.location.href = response.data?.redirectUrl;
    } catch (error) {
      console.log(error.response?.data);
    }
  };
  
  
  const handleSuccess = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/success', {
      paymentId: paymentId
    });
      if (response.status === 200 && response.data.message === 'Payment is Successful.') {
        // Handle successful payment
        toast.success('Payment completed successfully.');
        navigate('/client/');
      } else {
        // Handle other cases if needed
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/success', {
        paymentId: paymentId
      });
        if (response.status === 200 && response.data.message === 'Payment is Successful.') {
          // Handle successful payment
          toast.success('Payment completed successfully.');
          navigate('/client/');
        } else {
          // Handle other cases if needed
          toast.error('Failed to complete the payment.');
        }
      } catch (error) {
        console.log(error.response?.data);
        // Handle error accordingly
        toast.error('Failed to complete the payment.');
      }
    }
  } catch (error) {
      console.log(error.response?.data);
      // Handle error accordingly
      toast.error('Failed to complete the payment.');
    }
  };
 

  const handleError = async () => {
    try {
    
        // Handle payment cancellation
        toast.info('Payment cancelled by the user.');
        navigate('/payment');
     
    } catch (error) {
      console.log(error.response?.data);
      // Handle error accordingly
      toast.error('Failed to cancel the payment.');
    }
  };
    
  useEffect(() => {
    if (window.location.href.includes('/success')) {
      handleSuccess();
    } else if (window.location.href.includes('/error')) {
      handleError();
    }
  }, []);

  return (
    <Container>
      <Heading>Pay with PayPal</Heading>
      {project ? (
        <ProjectInfo>
          <ProjectName>Project Name: {project.name}</ProjectName>
          <ProjectBudget>Project Budget: {project.budget}</ProjectBudget>
        </ProjectInfo>
      ) : (
        <p>No projects available.</p>
      )}
      <Input type="number" readOnly name="amount" value={project?.budget || 0} />
      <Button disabled={Number(project?.budget || 10 ) === 0} onClick={handlePayment}>Pay Now</Button>


    </Container>
  );
};

export default Payment;
/////////////////////////////////////



