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
import { toast } from "react-toastify";
import { CometChat } from "@cometchat-pro/chat";

export default function Developer() {
  // const [employees, setEmployees] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [formData, setFormData] = useState({
    staff_level: {},

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
      gender: "male",
      staff: 1,
    },
  });
  const [customers, setCustomers] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/employee")
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          setCustomers(response.data.data || []);
          toast.success("employees fectched successfully");
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

  const handleUserChat = (data) => {
    const appID = "240169ef153c40df";
    const region = "US";
    const authKey = "581f246117c107b5f041cf28049c89388b3fc5cd";
    const appSetting = new CometChat.AppSettingsBuilder()
      .subscribePresenceForAllUsers()
      .setRegion(region)
      .build();
    CometChat.init(appID, appSetting).then(
      () => {
        console.log("Initialization completed successfully");
        // You can now proceed with rendering your app or calling the login function.
        var uid = data.id.toString();
        var name = data.userName;
        var user = new CometChat.User(uid);
        user.setName(name);
        CometChat.createUser(user, authKey).then(
          (user) => {
            console.log("user created", user);
          },
          (error) => {
            console.log("error", error);
          }
        );
        // CometChat.login(uid, authKey).then(
        //   (user) => {
        //     console.log("Login Successful:", { user });
        //   },
        //   (error) => {
        //     console.log("Login failed with exception:", { error });
        //   }
        // );
      },
      (error) => {
        console.log("Initialization failed with error:", error);
        // Check the reason for error and take appropriate action.
      }
    );
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
          gender: formData.user.gender,
          staff_level_id: formData.user.staff,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(formData);
        handleUserChat(response.data.employee.user);
        axios
          .get("http://127.0.0.1:8000/api/staff", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            // console.log(response.data);
            if (response.status === 200) {
              // setStaffLevels(response.data.data || []);
              response.data.data.map((level) => {
                if (level.id == formData.user.staff) {
                  formData.staff_level = level;
                  console.log(formData);
                  setCustomers([...customers, formData]);

                  // setowners([...owners, formData]);
                }
              });
              // toast.success("product owners fectched successfully");
            } else {
              toast.error("failed to load the data");
            }
          })
          .catch((error) => {
            console.error(error);
            toast.error("failed to load the data");

            // toast.error(error);
          });
        setFormData({
          staff_level: {},

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
            gender: "male",
            staff: 1,
          },
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (employeeId) => {
    axios
      .delete(`http://127.0.0.1:8000/api/employee/${employeeId}`, {
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
        `http://127.0.0.1:8000/api/user/${updatedEmployee.user.id}`,
        updatedEmployee.user,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        // console.log(response.data);
        axios
          .put(
            `http://127.0.0.1:8000/api/employee/${updatedEmployee.id}`,
            {
              staff_level_id: updatedEmployee.user.staff,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((staffResponse) => {
            console.log(staffResponse.data);
            const updatedEmployees = customers.map((emp) => {
              if (emp.id === updatedEmployee.id) {
                emp.user = response.data.data;
                emp.staff_level = staffResponse.data.data.staff_level;
              }
              return emp;
            });

            console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
            // console.log(updatedowners);
            setCustomers(updatedEmployees);

            setShowEditForm(false);
            setSelectedCustomers(null);
          })
          .catch((error) => {
            console.error(error);
          });
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
        <h4 className="m-0">Employees</h4>
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
          <UserForm
            formData={formData.user}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
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
              "user.name",
              "user.email",
              "user.phone",
              "user.country",
              "user.country",
              "user.profilePic",
              "staff_level.name",
            ]}
            emptyMessage="No Employees found."
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
              style={{ minWidth: "10rem" }}
            />
            <Column
              field="user.email"
              header="Email"
              sortable
              // filter
              style={{ minWidth: "10rem" }}
            />
            <Column
              field="user.phone"
              header="Phone"
              sortable
              // filter
              style={{ minWidth: "10rem" }}
              // body={(rowData) =>
              //   rowData.user.skills.map((skill) => skill.name).join(", ")
              // }
            />
            <Column
              field="user.gender"
              header="Gender"
              sortable
              // filter
              style={{ minWidth: "10rem" }}
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
              style={{ minWidth: "10rem" }}
            />
            <Column
              field="staff_level.name"
              header="Staff Level"
              sortable
              // filter
              style={{ minWidth: "10rem" }}
            />

            <Column
              headerStyle={{ width: "5rem", textAlign: "center" }}
              bodyStyle={{ textAlign: "center", overflow: "visible" }}
              header="Actions"
              body={(rowData) => {
                setSelectedEmployee(rowData);
                return (
                  <div style={{ display: "flex" }}>
                    {/* <button
                      className="btn btn-info me-2"
                      onClick={() => handleEdit(rowData)}
                    >
                      Edit
                    </button> */}

                    <DeveloperEditForm
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
            <DeveloperEditForm
              employee={selectedEmployee}
              handleUpdate={handleUpdate}
              // handleClose={handleClose}
            />
          )} */}
        </div>
      </div>
    </div>
  );
}

