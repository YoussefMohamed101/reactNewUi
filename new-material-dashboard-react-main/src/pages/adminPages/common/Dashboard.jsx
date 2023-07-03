import React from "react";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [record, setRecord] = useState([]);

  const getData = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((resposne) => resposne.json())
      .then((res) => setRecord(res));
  };
  useEffect(() => {
    getData();
  });

  return (
    <div className="col main pt-5 mt-3">
      <p className="lead d-none d-sm-block">Add Employee Details and Records</p>

      <div
        className="alert alert-warning fade collapse"
        role="alert"
        id="myAlert"
      >
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">×</span>
          <span className="sr-only">Close</span>
        </button>
        <strong>Data and Records</strong> Learn more about employee
      </div>

      <hr />

      <div className="row ">
        <div className="col-lg-7 col-md-6 col-sm-12">
          <h5 className="mt-3 mb-3 text-secondary">
            Check More Records of Employees
          </h5>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead className="thead-light">
                <tr>
                  <th>No</th>
                  <th>Label</th>
                  <th>Header</th>
                  <th>Column</th>
                  <th>Record Data</th>
                </tr>
              </thead>
              <tbody>
                {record.slice(0, 5).map((output) => (
                  <tr>
                    <td>{output.id}</td>
                    <td>{output.name}</td>
                    <td>{output.email}</td>
                    <td>{output.username}</td>
                    <td>{output.website}</td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <a id="more"></a>
      <hr />
      <h2 className="sub-header mt-5">
        Use card decks for equal height rows of cards
      </h2>
      <div className="mb-3">
        <div className="card-deck">
          <div className="card card-inverse card-success text-center">
            <div className="card-body">
              <blockquote className="card-blockquote">
                <p>
                  It's really good news that the new Bootstrap 4 now has support
                  for CSS 3 flexbox.
                </p>
                <footer>
                  Makes flexible layouts{" "}
                  <cite title="Source Title">Faster</cite>
                </footer>
              </blockquote>
            </div>
          </div>
          <div className="card card-inverse card-danger text-center">
            <div className="card-body">
              <blockquote className="card-blockquote">
                <p>
                  The Bootstrap 3.x element that was called "Panel" before, is
                  now called a "Card".
                </p>
                <footer>
                  All of this makes more <cite title="Source Title">Sense</cite>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>

      <a id="flexbox"></a>
      <hr />
      <h2 className="mt-5">Masonry-style grid columns</h2>
      <h6>with Bootstrap 4 flexbox</h6>

      <div className="card-columns mb-3">
        <div className="card">
          <img
            className="card-img-top img-fluid"
            src="//placehold.it/600x200/444/fff?text=..."
            alt="Card image cap"
          />
          <div className="card-body">
            <h4 className="card-title">New XL Grid Tier</h4>
            <p className="card-text">
              With screens getting smaller, Bootstrap 4 introduces a new grid
              breakpoint with the col-xl-* classes. This extra tier extends the
              media query range all the way down to 576 px. Eventhough the new
              XL tier would make one think it’s been added to support extra
              large screens, it’s actually the opposite.
            </p>
          </div>
        </div>
      </div>

      <a id="layouts"></a>
    </div>
  );
};

export default Dashboard;
