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
import StaffLevelEditForm from "./editForms/StaffLevelEditform";
import { toast } from "react-toastify";
import StaffLevelForm from "./StaffLevelform";

export default function AdminStaffLevel() {
  // const [skills, setskills] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedstaffLevel, setSelectedstaffLevel] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    salary: "",
  });
  const [staffLevels, setstaffLevels] = useState([]);
  const [selectedstaffLevels, setSelectedstaffLevels] = useState([]);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/staff", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          setstaffLevels(response.data.data || []);
          toast.success("staff Levels fectched successfully");
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
        "http://127.0.0.1:8000/api/staff",
        {
          name: formData.name,
          salary: formData.salary,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(formData);
        setstaffLevels([...staffLevels, formData]);
        setFormData({
          user: {
            name: "",
            salary: "",
          },
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (staffId) => {
    console.log(staffId);
    axios
      .delete(`http://127.0.0.1:8000/api/staff/${staffId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setstaffLevels(staffLevels.filter((staff) => staff.id !== staffId));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEdit = (staff) => {
    // console.log(skill);
    setSelectedstaffLevel(staff);
    setShowEditForm(true);
  };

  const handleUpdate = (updatedstaff) => {
    console.log(updatedstaff);
    axios
      .put(
        `http://127.0.0.1:8000/api/staff/${updatedstaff.id}`,
        {
          name: updatedstaff.name,
          salary: updatedstaff.salary,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data.data);

        const updatedstaffs = staffLevels.map((staff) => {
          if (staff.id === updatedstaff.id) {
            staff = response.data.data;
          }
          return staff;
        });

        // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        // console.log(updatedskills);
        setstaffLevels(updatedstaffs);
        // setskills(updatedskills);
        setShowEditForm(false);
        setSelectedstaffLevel(null);
        // setSelectedskill(null);
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
        <h4 className="m-0">Staff Levels</h4>
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
          <StaffLevelForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
          <DataTable
            className="col-12"
            value={staffLevels}
            paginator
            header={header}
            rows={10}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            rowsPerPageOptions={[10, 25, 50]}
            dataKey="id"
            selectionMode="checkbox"
            selection={selectedstaffLevels}
            onSelectionChange={(e) => setSelectedstaffLevels(e.value)}
            filters={filters}
            filterDisplay="menu"
            globalFilterFields={["name"]}
            emptyMessage="No StaffLevel found."
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          >
            {/* <Column
              selectionMode="multiple"
              headerStyle={{ width: "3rem" }}
            ></Column> */}
            <Column
              field="name"
              header="Name"
              sortable
              // filter
              style={{ minWidth: "14rem" }}
            />

            <Column
              field="salary"
              header="Salary"
              sortable
              // filter
              style={{ minWidth: "14rem" }}
            />

            <Column
              headerStyle={{ width: "5rem", textAlign: "center" }}
              bodyStyle={{ textAlign: "center", overflow: "visible" }}
              header="Actions"
              body={(rowData) => {
                // console.log(rowData);
                setSelectedstaffLevel(rowData);
                // setSelectedskill(rowData);
                return (
                  <div style={{ display: "flex" }}>
                    {/* <button
                      className="btn btn-info me-2"
                      onClick={() => handleEdit(rowData)}
                    >
                      Edit
                    </button> */}

                    <StaffLevelEditForm
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
