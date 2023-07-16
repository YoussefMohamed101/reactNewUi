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
import ProductOwnerEditForm from "./editForms/productOwnerEditform";
import UserForm from "./userform";
import { toast } from "react-toastify";
import { CometChat } from "@cometchat-pro/chat";

export default function ProductOwner() {
  // const [owners, setowners] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedowner, setSelectedowner] = useState(null);
  const [imagedata, setImagedata] = useState("");

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
  const [owners, setowners] = useState([]);
  const [selectedowners, setSelectedowners] = useState([]);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/managers/ProductOwner")
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          setowners(response.data.data || []);
          toast.success("product owners fectched successfully");
        } else {
          toast.error("failed to load the data");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(error);
      });
  }, []);

  // const handleInputChange = (event) => {
  //   setFormData({
  //     ...formData,
  //     user: {
  //       ...formData.user,
  //       imagedata:event.target.files [0],
  //       [event.target.name]: event.target.value,
  //     },
  //   });
  // };

  // const handleInputChange = (event) => {
  //   if (event.target.files && event.target.files.length > 0) {
  //     setFormData({
  //       ...formData,
  //       user: {
  //         ...formData.user,
  //         profilePic: event.target.files[0],
  //         [event.target.name]: event.target.value,
  //       },
  //     });
  //   } else {
  //     setFormData({
  //       ...formData,
  //       user: {
  //         ...formData.user,
  //         [event.target.name]: event.target.value,
  //       },
  //     });
  //   }
  // };

  // const handleInputChange = (event) => {
  //   const file = event.target.files[0];
  //   setImagedata(file);
  // };

  const handleInputChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setImagedata(event.target.files[0]);
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        user: {
          ...prevFormData.user,
          profilePic: event.target.files && event.target.files[0],
          [event.target.name]: event.target.value,
        },
      }));
    }
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

  // const handleSubmit = async (event) => {
  //   // event.preventDefault();
  //   console.log(formData);
  //   const data =new FormData();
  //   data.append("profilePic", imagedata);
  //  console.log(formData.user.profilePic);
  //   await axios
  //     .post("http://127.0.0.1:8000/api/register/manager", {
  //       name: formData.user.name,
  //       email: formData.user.email,
  //       password: formData.user.password,
  //       phone: formData.user.phone,
  //       nationalID: formData.user.nationalID,
  //       address: formData.user.address,
  //       joinedDate: formData.user.joinedDate,
  //       endDate: formData.user.endDate,
  //       country: formData.user.country,
  //       role: formData.user.role,
  //       userName: formData.user.userName,
  //       gender: formData.user.gender,
  //       profilePic:formData.user.profilePic,
  //       staff_level_id: formData.user.staff,
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     },data)
  //     .then((response) => {
  //       console.log(formData);
  //       handleUserChat(response.data.manager.user);

  //       axios
  //         .get("http://127.0.0.1:8000/api/staff", {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           },
  //         })
  //         .then((response) => {
  //           // console.log(response.data);
  //           if (response.status === 200) {
  //             // setStaffLevels(response.data.data || []);
  //             response.data.data.map((level) => {
  //               if (level.id == formData.user.staff) {
  //                 formData.staff_level = level;
  //                 console.log(formData);
  //                 setowners([...owners, formData]);
  //               }
  //             });
  //             // toast.success("product owners fectched successfully");
  //           } else {
  //             toast.error("failed to load the data");
  //           }
  //         })
  //         .catch((error) => {
  //           console.error(error);
  //           toast.error("failed to load the data");

  //           // toast.error(error);
  //         });

  //       setFormData({
  //         staff_level: {},
  //         user: {
  //           name: "",
  //           email: "",
  //           password: "",
  //           phone: "",
  //           nationalID: "",
  //           address: "",
  //           joinedDate: "",
  //           endDate: "",
  //           profilePic: "",
  //           country: "",
  //           gender: "male",
  //           staff: 1,
  //         },
  //       });
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  const handleSubmit = async (event) => {
    // event.preventDefault();

    // console.log(formData.user.profilePic);
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

    console.log(data.get("profilePic"));
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register/manager",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(response.data.manager.user);
      handleUserChat(response.data.manager.user);

      const staffResponse = await axios.get("http://127.0.0.1:8000/api/staff", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (staffResponse.status === 200) {
        const level = staffResponse.data.data.find(
          (level) => level.id === formData.user.staff
        );

        if (level) {
          formData.staff_level = level;
          setowners([...owners, formData]);
          console.log(formData);
          // toast.success("product owners fetched successfully");
        }
      } else {
        // toast.error("failed to load the data");
      }

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
    } catch (error) {
      console.error(error);
    }
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
        setowners(owners.filter((owner) => owner.id !== ownerId));
        toast.success("User deleted successfully");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to delete user");
      });
  };

  const handleEdit = (owner) => {
    // console.log(owner);
    setSelectedowner(owner);
    setShowEditForm(true);
  };

  const handleUpdate = (updatedowner) => {
    console.log(updatedowner);
    // setSelectedowner(updatedowner);
    // setSelectedowner(updatedowner);
    // console.log(selectedowner);

    const data = new FormData();
    data.append("profilePic", updatedowner.profilePic);
    data.append("name", updatedowner.user.name);
    data.append("email", updatedowner.user.email);
    data.append("password", updatedowner.user.password);
    data.append("phone", updatedowner.user.phone);
    data.append("nationalID", updatedowner.user.nationalID);
    data.append("address", updatedowner.user.address);
    data.append("joinedDate", updatedowner.user.joinedDate);
    data.append("endDate", updatedowner.user.endDate);
    data.append("country", updatedowner.user.country);
    data.append("role", updatedowner.user.role);
    data.append("userName", updatedowner.user.userName);
    data.append("gender", updatedowner.user.gender);
    data.append("staff_level_id", updatedowner.user.staff);
    axios
      .post(
        `http://127.0.0.1:8000/api/user/${updatedowner.user.id}?_method=PUT`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        axios
          .put(
            `http://127.0.0.1:8000/api/manager/${updatedowner.id}`,
            {
              staff_level_id: updatedowner.user.staff,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((staffResponse) => {
            console.log(staffResponse.data);
            const updatedowners = owners.map((owner) => {
              if (owner.id === updatedowner.id) {
                owner.user = response.data.data;
                owner.staff_level = staffResponse.data.data.staff_level;
              }
              return owner;
            });

            console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
            console.log(updatedowners);
            setowners(updatedowners);
            setShowEditForm(false);
            setSelectedowner(null);
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
    setSelectedowner(null);
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
        <h4 className="m-0">Product Owners</h4>
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
            value={owners}
            paginator
            header={header}
            rows={10}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            rowsPerPageOptions={[10, 25, 50]}
            dataKey="id"
            selectionMode="checkbox"
            selection={selectedowners}
            onSelectionChange={(e) => setSelectedowners(e.value)}
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
            emptyMessage="No owners found."
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
                return (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <ProductOwnerEditForm
                      employee={rowData}
                      handleUpdate={handleUpdate}
                    />
                    {/* <button
                      className="btn btn-info me-2"
                      onClick={() => handleEdit(rowData)}
                    >
                      Edit
                    </button> */}
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
              owner={selectedowner}
              handleUpdate={handleUpdate}
              handleClose={handleClose}
            />
          )} */}
        </div>
      </div>
    </div>
  );
}
