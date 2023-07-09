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
import DeveloperEditForm from "./editForms/developerEditform";
import UserForm from "./userform";
import TaskEditForm from "./editForms/taskEditform";

export default function AdminTask() {
  // const [employees, setEmployees] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    joinedDate: "",
    endDate: "",
    profilePic: "",
    country: "",
  });
  const [customers, setCustomers] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/task")
      .then((response) => {
        console.log(response.data);
        setCustomers(response.data.data || []);
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
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        }
      )
      .then((response) => {
        console.log(formData);
        setCustomers([...customers, formData]);
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

  const handleDelete = (employeeId) => {
    axios
      .delete(`http://127.0.0.1:8000/api/tasks/${employeeId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setCustomers(
          customers.filter((employee) => employee.id !== employeeId)
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEdit = (employee) => {
    // console.log(employee);
    setSelectedEmployee(employee);
    setShowEditForm(true);
  };

  const handleUpdate = (updatedEmployee) => {
    console.log(updatedEmployee);
    axios
      .put(
        `http://127.0.0.1:8000/api/task/${updatedEmployee.id}`,
        {
          project_id: updatedEmployee.project.id,
          product_manager_id: updatedEmployee.productManager.id,
          task_title: updatedEmployee.name,
          task_description: updatedEmployee.description,
          task_start: updatedEmployee.start,
          task_end: updatedEmployee.end,
          status: updatedEmployee.status,
          assigned_to: updatedEmployee.assigned_to.hisID,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data.data);

        const updatedEmployees = customers.map((employee) => {
          if (employee.id === selectedEmployee.id) {
            employee = response.data.data;
          }
          return employee;
        });

        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        console.log(updatedEmployees);
        setCustomers(updatedEmployees);
        setShowEditForm(false);
        setSelectedEmployee(null);
        // handleClose();
      })
      .catch((error) => {
        console.log("asdadadasdassdasdadas");
        console.error(error);
      });
  };

  // const handleClose = () => {
  //   setShowEditForm(false);
  //   setSelectedEmployee(null);
  // };
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
        <h4 className="m-0">Tasks</h4>
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
            value={customers}
            paginator
            header={header}
            rows={10}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            rowsPerPageOptions={[10, 25, 50]}
            dataKey="id"
            selectionMode="checkbox"
            selection={selectedCustomers}
            onSelectionChange={(e) => setSelectedCustomers(e.value)}
            filters={filters}
            filterDisplay="menu"
            globalFilterFields={[
              "name",
              "project.name",
              "productManager.name",
              "assigned_to.name",
              "start",
              "end",
              "status",
            ]}
            emptyMessage="No customers found."
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          >
            <Column
              field="name"
              header="Task Name"
              sortable
              style={{ minWidth: "10rem" }}
            />

            <Column
              field="project.name"
              header="Project Name"
              sortable
              style={{ minWidth: "10rem" }}
            />

            <Column
              field="productManager.name"
              header="Task Creator"
              sortable
              style={{ minWidth: "9rem" }}
            />
            <Column
              field="assigned_to.name"
              header="Assigned to"
              sortable
              style={{ minWidth: "9rem" }}
            />
            <Column
              field="start"
              header="Start Date"
              sortable
              style={{ minWidth: "9rem" }}
            />
            <Column
              field="end"
              header="End Date"
              sortable
              style={{ minWidth: "9rem" }}
            />
            <Column
              field="status"
              header="Status"
              sortable
              style={{ minWidth: "9rem" }}
            />

            <Column
              headerStyle={{ width: "5rem", textAlign: "center" }}
              bodyStyle={{ textAlign: "center", overflow: "visible" }}
              header="Actions"
              body={(rowData) => {
                setSelectedEmployee(rowData);
                return (
                  <div style={{ display: "flex" }}>
                    <TaskEditForm
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
        </div>
      </div>
    </div>
  );
}
