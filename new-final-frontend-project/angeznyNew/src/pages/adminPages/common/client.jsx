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
import ClientEditForm from "./editForms/clientEditform";
import UserForm from "./userform";
import { toast } from "react-toastify";

export default function Developer() {
  // const [clients, setclients] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedclient, setSelectedclient] = useState(null);

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
  const [clients, setclients] = useState([]);
  const [selectedclients, setSelectedclients] = useState([]);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/client")
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          setclients(response.data.data || []);
          toast.success("clients fectched successfully");
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
        setclients([...clients, formData]);
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

  const handleDelete = (clientId) => {
    axios
      .delete(`http://127.0.0.1:8000/api/client/${clientId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setclients(clients.filter((client) => client.id !== clientId));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEdit = (client) => {
    // console.log(client);
    setSelectedclient(client);
    setShowEditForm(true);
  };

  const handleUpdate = (updatedclient) => {
    const data = new FormData();

    data.append("profilePic", updatedclient.profilePic);
    data.append("name", updatedclient.user.name);
    data.append("email", updatedclient.user.email);
    data.append("password", updatedclient.user.password);
    data.append("phone", updatedclient.user.phone);
    data.append("nationalID", updatedclient.user.nationalID);
    data.append("address", updatedclient.user.address);
    data.append("joinedDate", updatedclient.user.joinedDate);
    data.append("endDate", updatedclient.user.endDate);
    data.append("country", updatedclient.user.country);
    data.append("role", updatedclient.user.role);
    data.append("userName", updatedclient.user.userName);
    data.append("gender", updatedclient.user.gender);
    data.append("staff_level_id", updatedclient.user.staff);

    console.log(updatedclient);
    axios
      .post(
        `http://127.0.0.1:8000/api/user/${updatedclient.user.id}?_method=PUT`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        const updatedclients = clients.map((client) => {
          if (client.id === updatedclient.id) {
            client.user = response.data.data;
          }
          return client;
        });

        console.log(updatedclients);
        setclients(updatedclients);
        setShowEditForm(false);
        setSelectedclient(null);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleClose = () => {
    setShowEditForm(false);
    setSelectedclient(null);
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
        <h4 className="m-0">Clients</h4>
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
            value={clients}
            paginator
            header={header}
            rows={10}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            rowsPerPageOptions={[10, 25, 50]}
            dataKey="id"
            selectionMode="checkbox"
            selection={selectedclients}
            onSelectionChange={(e) => setSelectedclients(e.value)}
            filters={filters}
            filterDisplay="menu"
            globalFilterFields={[
              "user.name",
              "user.email",
              "user.nationalID",
              "user.profilePic",
              "user.country",
              // "balance",
            ]}
            emptyMessage="No clients found."
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          >
            <Column
              field="user.name"
              header="Name"
              sortable
              // filter
              style={{ minWidth: "14rem" }}
            />
            <Column
              field="user.email"
              header="Email"
              sortable
              // filter
              style={{ minWidth: "14rem" }}
            />
            <Column
              field="user.nationalID"
              header="National id"
              sortable
              // filter
              style={{ minWidth: "14rem" }}
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
              style={{ minWidth: "14rem" }}
            />

            <Column
              headerStyle={{ width: "5rem", textAlign: "center" }}
              bodyStyle={{ textAlign: "center", overflow: "visible" }}
              header="Actions"
              body={(rowData) => {
                setSelectedclient(rowData);
                return (
                  <div style={{ display: "flex" }}>
                    <ClientEditForm
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
              client={selectedclient}
              handleUpdate={handleUpdate}
              handleClose={handleClose}
            />
          )} */}
        </div>
      </div>
    </div>
  );
}
