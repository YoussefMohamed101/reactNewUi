import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from 'react-bootstrap/Card';

const Dashboard = () => {
  const [record, setRecord] = useState([]);

  const [totalCountries, setTotalCountries] = useState(0);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/user/countCountry")
      .then((response) => {
        console.log(response.data["countryCount"]);
        setTotalCountries(response.data["countryCount"] || 0);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // totalprojects

  const [totalProjects, setTotalProjects] = useState(0);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/projects/count")
      .then((response) => {
        console.log(response.data);
        setTotalProjects(response.data["countProject"] || 0);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  //totalusers
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/user/count")
      .then((response) => {
        console.log(response.data);
        setTotalUsers(response.data["countUser"] || 0);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <div className="row my-5 d-flex flex-column justify-conetent-center align-items-center">
        <div className="col-4">
        <Card style={{ width: '20rem' , backgroundColor:"yellow !important"}} className="shadow p-3 mb-5 bg-body rounded">
          <Card.Body>
            <Card.Title>Total Users</Card.Title>
            <Card.Text>
                 
            </Card.Text>
          </Card.Body>
        </Card> 
        </div>
        <div className="col-4">
        <Card style={{ width: '20rem', backgroundColor: "#4f93ce" }} className="shadow p-3 mb-5 bg-body rounded">
            <Card.Body>
              <Card.Title>Total Project</Card.Title>
              <Card.Text>

              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-4">
        <Card style={{ width: '20rem' ,backgroundColor: "#63a0d4"}} className="shadow p-3 mb-5 bg-body rounded">
          <Card.Body style={{backgroundColor:"#63a0d4"}}>
            <Card.Title>Total countries</Card.Title>
            <Card.Text>

            </Card.Text>
          </Card.Body>
        </Card>
        </div>    
      </div>
    </div>
  );
};

export default Dashboard;
