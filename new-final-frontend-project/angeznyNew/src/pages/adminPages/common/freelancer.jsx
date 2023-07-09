import React, { useState, useEffect } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { ProgressBar } from "primereact/progressbar";
import { Calendar } from "primereact/calendar";
import { MultiSelect } from "primereact/multiselect";
import { Slider } from "primereact/slider";
import { Tag } from "primereact/tag";
import axios from "axios";
import FreelancerEditform from "./editForms/freelancerEditform";
import UserForm from "./userform";
import { toast } from "react-toastify";

export default function Freelancer() {
  // const [freelancers, setfreelancers] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedfreelancer, setSelectedfreelancer] = useState(null);

  const [formData, setFormData] = useState({
    user: {
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      joinedDate: "",
      endDate: "",
      profilePic: "",
      country: "",
    },
  });
  const [freelancers, setfreelancers] = useState([]);
  const [selectedfreelancers, setSelectedfreelancers] = useState([]);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/freelancer")
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          setfreelancers(response.data.data || []);
          toast.success("freelancers fectched successfully");
        } else {
          toast.error("failed to load the data");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      user: {
        ...formData.user,
        [event.target.name]: event.target.value,
      },
    });
  };

  const handleSubmit = async (event) => {
    // event.preventDefault();
    console.log(formData);
    await axios
      .post(
        "http://127.0.0.1:8000/api/register/manager",
        {
          name: formData.user.name,
          email: formData.user.email,
          password: formData.user.password,
          phone: formData.user.phone,
          nationalID: formData.user.nationalID,
          address: formData.user.address,
          joinedDate: formData.user.joinedDate,
          endDate: formData.user.endDate,
          country: formData.user.country,
          role: formData.user.role,
          userName: formData.user.userName,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(formData);
        setfreelancers([...freelancers, formData]);
        setFormData({
          user: {
            name: "",
            email: "",
            password: "",
            phone: "",
            nationalID: "",
            address: "",
            joinedDate: "",
            endDate: "",
            profilePic: "",
            country: "",
          },
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  
  const handleDelete = (ownerId) => {
    axios
      .delete(`http://127.0.0.1:8000/api/manager/${ownerId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setfreelancers(freelancers.filter((owner) => owner.id !== ownerId));
        toast.success("User deleted successfully");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to delete user");
      });
  };
  

  const handleEdit = (freelancer) => {
    // console.log(freelancer);
    setSelectedfreelancer(freelancer);
    setShowEditForm(true);
  };

  const handleUpdate = (updatedfreelancer) => {
    console.log(updatedfreelancer);
    axios
      .put(
        `http://127.0.0.1:8000/api/user/${updatedfreelancer.user.id}`,
        updatedfreelancer.user,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        const updatedfreelancers = freelancers.map((freelancer) => {
          if (freelancer.id === updatedfreelancer.id) {
            freelancer.user = response.data.data;
          }
          return freelancer;
        });

        console.log(updatedfreelancers);
        setfreelancers(updatedfreelancers);
        setShowEditForm(false);
        setSelectedfreelancer(null);
      })
      .catch((error) => {

        console.error(error);
      });
  };

  const handleClose = () => {
    setShowEditForm(false);
    setSelectedfreelancer(null);
  };
  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex flex-wrap gap-2 justify-content-between align-items-center">
        <h4 className="m-0">Freelancers</h4>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </span>
      </div>
    );
  };

  const header = renderHeader();

  return (
    <div className="w-100 overflow-hidden">
      <div className="row">
        <div className="col-2"></div>
        <div className="d-flex flex-column justify-content-center col-10 p-4 h-100">
          <DataTable
            className="col-12"
            value={freelancers}
            paginator
            header={header}
            rows={10}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            rowsPerPageOptions={[10, 25, 50]}
            dataKey="id"
            selectionMode="checkbox"
            selection={selectedfreelancers}
            onSelectionChange={(e) => setSelectedfreelancers(e.value)}
            filters={filters}
            filterDisplay="menu"
            globalFilterFields={[
              "user.name",
              "user.email",
              "user.nationalID",
              "user.country",
              "user.profilePic",
              "status",
              "balance",
            ]}
            emptyMessage="No freelancers found."
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          >
            {/* <Column
              selectionMode="multiple"
              headerStyle={{ width: "3rem" }}
            ></Column> */}
            <Column
              field="user.name"
              header="Name"
              sortable
              // filter
              style={{ minWidth: "8rem" }}
            />
            <Column
              field="user.email"
              header="Email"
              sortable
              // filter
              style={{ minWidth: "10rem" }}
            />
            <Column
              field="user.nationalID"
              header="National id"
              sortable
              // filter
              style={{ minWidth: "8rem" }}
            />
              <Column
              field="user.profilePic"
              header="Profile Picture"
              body={(rowData) => (
                <img
                  src={`http://localhost:8000/images/users/${rowData.user.profilePic}`}
                  alt="Profile Picture"
                  style={{ width: "100px" }}
                />
              )}
            />
            <Column
              field="user.country"
              header="Country"
              sortable
              // filter
              style={{ minWidth: "6rem" }}
            />

            <Column
              field="status"
              header="Status"
              sortable
              // filter
              style={{ minWidth: "10rem" }}
              body={(rowData) =>
                rowData.status === 1 ? "Available" : "Not available"
              }
            />
            <Column
              field="balance"
              header="Balance"
              sortable
              // filte
              style={{ minWidth: "6rem" }}
            />

            <Column
              headerStyle={{ width: "5rem", textAlign: "center" }}
              bodyStyle={{ textAlign: "center", overflow: "visible" }}
              header="Actions"
              body={(rowData) => {
                setSelectedfreelancer(rowData);
                return (
                  <div style={{ display: "flex" }}>
                    {/* <button
                      className="btn btn-info me-2"
                      onClick={() => handleEdit(rowData)}
                    >
                      Edit
                    </button> */}

                    <FreelancerEditform
                      employee={rowData}
                      handleUpdate={handleUpdate}
                    />
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(rowData.id)}
                    >
                      Delete
                    </button>
                  </div>
                );
              }}
            />
          </DataTable>
          {/* {showEditForm && (
            <Editform
              freelancer={selectedfreelancer}
              handleUpdate={handleUpdate}
              handleClose={handleClose}
            />
          )} */}
        </div>
      </div>
    </div>
  );
}
