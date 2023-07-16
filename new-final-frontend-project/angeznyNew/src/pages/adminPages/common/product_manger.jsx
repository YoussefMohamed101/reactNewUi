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
import { toast } from "react-toastify";
import { CometChat } from "@cometchat-pro/chat";

// import Editform from "./editform";
import UserForm from "./userform";
import ProductManagerEditForm from "./editForms/productManagerEditform";

export default function ProductManager() {
  // const [mangers, setmangers] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedmanger, setSelectedmanger] = useState(null);

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
  const [mangers, setmangers] = useState([]);
  const [selectedmangers, setSelectedmangers] = useState([]);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/managers/ProductManager")
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          setmangers(response.data.data || []);
          toast.success("product mangers fectched successfully");
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
    const appID = "242435259ac8a12c";
    const region = "US";
    const authKey = "310e279501ee4e4f574e4d6c4093132a60a1570b";
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
    // console.log(formData);

    const data = new FormData();
    data.append("profilePic", formData.user.profilePic);
    data.append("name", formData.user.name);
    data.append("email", formData.user.email);
    data.append("password", formData.user.password);
    data.append("phone", formData.user.phone);
    data.append("nationalID", formData.user.nationalID);
    data.append("address", formData.user.address);
    data.append("joinedDate", formData.user.joinedDate);
    data.append("endDate", formData.user.endDate);
    data.append("country", formData.user.country);
    data.append("role", formData.user.role);
    data.append("userName", formData.user.userName);
    data.append("gender", formData.user.gender);
    data.append("staff_level_id", formData.user.staff);

    await axios
      .post("http://127.0.0.1:8000/api/register/manager", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(formData);
        handleUserChat(response.data.manager.user);

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

                  setmangers([...mangers, formData]);
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
            country: "male",
            staff: 1,
          },
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (mangerId) => {
    axios
      .delete(`http://127.0.0.1:8000/api/manager/${mangerId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        setmangers(mangers.filter((manger) => manger.id !== mangerId));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEdit = (manger) => {
    // console.log(manger);
    setSelectedmanger(manger);
    setShowEditForm(true);
  };

  const handleUpdate = (updatedmanger) => {
    console.log(updatedmanger);
    const data = new FormData();
    data.append("profilePic", updatedmanger.profilePic);
    data.append("name", updatedmanger.user.name);
    data.append("email", updatedmanger.user.email);
    data.append("password", updatedmanger.user.password);
    data.append("phone", updatedmanger.user.phone);
    data.append("nationalID", updatedmanger.user.nationalID);
    data.append("address", updatedmanger.user.address);
    data.append("joinedDate", updatedmanger.user.joinedDate);
    data.append("endDate", updatedmanger.user.endDate);
    data.append("country", updatedmanger.user.country);
    data.append("role", updatedmanger.user.role);
    data.append("userName", updatedmanger.user.userName);
    data.append("gender", updatedmanger.user.gender);
    data.append("staff_level_id", updatedmanger.user.staff);
    axios
      .post(
        `http://127.0.0.1:8000/api/user/${updatedmanger.user.id}?_method=PUT`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        // console.log(response.data);
        axios
          .put(
            `http://127.0.0.1:8000/api/manager/${updatedmanger.id}`,
            {
              staff_level_id: updatedmanger.user.staff,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((staffResponse) => {
            console.log(staffResponse.data);
            const updatedmangers = mangers.map((manager) => {
              if (manager.id === updatedmanger.id) {
                manager.user = response.data.data;
                manager.staff_level = staffResponse.data.data.staff_level;
              }
              return manager;
            });

            console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
            console.log(updatedmangers);
            setmangers(updatedmangers);
            setShowEditForm(false);
            setSelectedmanger(null);
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

  const handleClose = () => {
    setShowEditForm(false);
    setSelectedmanger(null);
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
        <h4 className="m-0">Product Managers</h4>
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
            value={mangers}
            paginator
            header={header}
            rows={10}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            rowsPerPageOptions={[10, 25, 50]}
            dataKey="id"
            selectionMode="checkbox"
            selection={selectedmangers}
            onSelectionChange={(e) => setSelectedmangers(e.value)}
            filters={filters}
            filterDisplay="menu"
            globalFilterFields={[
              "user.name",
              "user.email",
              "user.phone",
              "user.gender",
              "user.profilePic",
              "user.country",
              "staff_level.name",
            ]}
            emptyMessage="No mangers found."
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
                setSelectedmanger(rowData);
                return (
                  <div style={{ display: "flex" }}>
                    {/* <button
                      className="btn btn-info me-2"
                      onClick={() => handleEdit(rowData)}
                    >
                      Edit
                    </button> */}
                    <ProductManagerEditForm
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
              manger={selectedmanger}
              handleUpdate={handleUpdate}
              handleClose={handleClose}
            />
          )} */}
        </div>
      </div>
    </div>
  );
}
