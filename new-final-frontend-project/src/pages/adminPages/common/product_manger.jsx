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
import { CometChat } from "@cometchat-pro/chat";

// import Editform from "./editform";
import UserForm from "./userform";
import ProductManagerEditForm from "./editForms/productManagerEditform";

export default function Developer() {
  // const [mangers, setmangers] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedmanger, setSelectedmanger] = useState(null);

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
        setmangers(response.data.data || []);
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
    const authKey = "581f246117c147b5f041cf28049c89388b3fc5cd";
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
      .post("http://127.0.0.1:8000/api/register/manager", {
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
      })
      .then((response) => {
        console.log(formData);
        handleUserChat(response.data.manager.user);

        setmangers([...mangers, formData]);
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

  const handleDelete = (mangerId) => {
    axios
      .delete(`http://127.0.0.1:8000/api/manger/${mangerId}`, {
        headers: {
          Authorization: "Bearer 5|wJK45DIqlgaXP59oWB6RL3iNxp52nlHaAVQPGJ5n",
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
    axios
      .put(
        `http://127.0.0.1:8000/api/user/${updatedmanger.user.id}`,
        updatedmanger.user,
        {
          headers: {
            Authorization: "Bearer 47|TeQrlI4SmHUN4rvJdxGZZx0eb9ryFBXmsNPNOHCY",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        const updatedmangers = mangers.map((manger) => {
          if (manger.id === selectedmanger.id) {
            manger.user = response.data.data;
          }
          return manger;
        });

        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        console.log(updatedmangers);
        setmangers(updatedmangers);
        setShowEditForm(false);
        setSelectedmanger(null);
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
        <h4 className="m-0">mangers</h4>
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
              "user.country",
            ]}
            emptyMessage="No mangers found."
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          >
            <Column
              selectionMode="multiple"
              headerStyle={{ width: "3rem" }}
            ></Column>
            <Column
              field="user.name"
              header="Name"
              sortable
              filter
              style={{ minWidth: "14rem" }}
            />
            <Column
              field="user.email"
              header="Email"
              sortable
              filter
              style={{ minWidth: "14rem" }}
            />
            <Column
              field="user.phone"
              header="Phone"
              sortable
              filter
              style={{ minWidth: "14rem" }}
            />
            <Column
              field="user.country"
              header="Country"
              sortable
              filter
              style={{ minWidth: "14rem" }}
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
