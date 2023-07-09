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
import SkillEditForm from "./editForms/SkillEditform";
import { toast } from "react-toastify";
import SkillForm from "./Skillform";
import AddSkillToUserForm from "./editForms/AddSkillToUserform";

export default function Adminskill() {
  // const [skills, setskills] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedskill, setSelectedskill] = useState(null);

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
  const [skills, setskills] = useState([]);
  const [selectedskills, setSelectedskills] = useState([]);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/skill")
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          setskills(response.data.data || []);
          toast.success("skills fectched successfully");
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

      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    // event.preventDefault();
    console.log(formData);
    await axios
      .post(
        "http://127.0.0.1:8000/api/skill",
        {
          name: formData.name,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(formData);
        setskills([...skills, formData]);
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

  const handleDelete = (skillId) => {
    axios
      .delete(`http://127.0.0.1:8000/api/skill/${skillId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setskills(skills.filter((skill) => skill.id !== skillId));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEdit = (skill) => {
    // console.log(skill);
    setSelectedskill(skill);
    setShowEditForm(true);
  };

  const handleUpdate = (updatedskill) => {
    console.log(updatedskill);
    axios
      .put(
        `http://127.0.0.1:8000/api/skill/${updatedskill.id}`,
        {
          name: updatedskill.name,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data.data);

        const updatedskills = skills.map((skill) => {
          if (skill.id === updatedskill.id) {
            skill = response.data.data;
          }
          return skill;
        });

        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        console.log(updatedskills);
        setskills(updatedskills);
        setShowEditForm(false);
        setSelectedskill(null);
        // handleClose();
      })
      .catch((error) => {
        console.log("asdadadasdassdasdadas");
        console.error(error);
      });
  };

  // const handleClose = () => {
  //   setShowEditForm(false);
  //   setSelectedskill(null);
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
        <h4 className="m-0">Skills</h4>
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
          <SkillForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
          <DataTable
            className="col-12"
            value={skills}
            paginator
            header={header}
            rows={10}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            rowsPerPageOptions={[10, 25, 50]}
            dataKey="id"
            selectionMode="checkbox"
            selection={selectedskills}
            onSelectionChange={(e) => setSelectedskills(e.value)}
            filters={filters}
            filterDisplay="menu"
            globalFilterFields={["name"]}
            emptyMessage="No skills found."
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          >
            {/* <Column
              selectionMode="multiple"
              headerStyle={{ width: "3rem" }}
            ></Column> */}
            <Column
              field="name"
              header="skill Name"
              sortable
              // filter
              style={{ width: "35rem" }}
            />

            <Column
              headerStyle={{ width: "10rem", textAlign: "center" }}
              bodyStyle={{ textAlign: "center", overflow: "visible" }}
              header="Actions"
              body={(rowData) => {
                console.log(rowData);
                setSelectedskill(rowData);
                return (
                  <div style={{ display: "flex" }}>
                    {/* <button
                      className="btn btn-info me-2"
                      onClick={() => handleEdit(rowData)}
                    >
                      Edit
                    </button> */}

                    <AddSkillToUserForm skill={rowData}></AddSkillToUserForm>
                    {/* <button
                      className="btn btn-warning me-4"
                      onClick={() => handleDelete(rowData.id)}
                    >
                      Add to User
                    </button> */}
                    <SkillEditForm
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
              skill={selectedskill}
              handleUpdate={handleUpdate}
              // handleClose={handleClose}
            />
          )} */}
        </div>
      </div>
    </div>
  );
}
