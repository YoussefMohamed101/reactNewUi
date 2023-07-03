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
import ProjectEditForm from "./editForms/projectEditform";

export default function Project() {
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
      .get("http://127.0.0.1:8000/api/projects")
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
            Authorization: `Bearer ${localStorage.getItem(
              "user_access_token"
            )}`,
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
      .delete(`http://127.0.0.1:8000/api/projects/${employeeId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user_access_token")}`,
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
        `http://127.0.0.1:8000/api/projects/${updatedEmployee.id}`,
        {
          project_title: updatedEmployee.name,
          project_type: updatedEmployee.type,
          project_description: updatedEmployee.description,
          project_start: updatedEmployee.start,
          project_end: updatedEmployee.end,
          project_status: updatedEmployee.status,
          ProductOwner_id: updatedEmployee.productOnwer.id,
          ProductManager_id: updatedEmployee.ProductManager.id,
          Client_id: updatedEmployee.client.id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "user_access_token"
            )}`,
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
        <h4 className="m-0">Customers</h4>
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
              "user.name",
              "user.email",
              "user.phone",
              "user.country",
            ]}
            emptyMessage="No customers found."
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          >
            <Column
              selectionMode="multiple"
              headerStyle={{ width: "3rem" }}
            ></Column>
            <Column
              field="name"
              header="Name"
              sortable
              filter
              style={{ minWidth: "14rem" }}
            />

            <Column
              field="type"
              header="Type"
              sortable
              filter
              style={{ minWidth: "14rem" }}
            />

            <Column
              field="start"
              header="Start Date"
              sortable
              filter
              style={{ minWidth: "14rem" }}
            />
            <Column
              field="end"
              header="End Date"
              sortable
              filter
              style={{ minWidth: "14rem" }}
              // body={(rowData) =>
              //   rowData.user.skills.map((skill) => skill.name).join(", ")
              // }
            />
            <Column
              field="status"
              header="Status"
              sortable
              filter
              style={{ minWidth: "14rem" }}
              // body={(rowData) =>
              //   rowData.user.skills.map((skill) => skill.name).join(", ")
              // }
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

                    <ProjectEditForm
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

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import UserForm from "./userform";
// import Editform from "./editform";
// import "../admin.css";

// const Developer = () => {
//   const [employees, setEmployees] = useState([]);
//   const [showEditForm, setShowEditForm] = useState(false);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);

//   // useEffect(() => {}, [employees]);

//   const [formData, setFormData] = useState({
//     user: {
//       name: "",
//       email: "",
//       password: "",
//       phone: "",
//       address: "",
//       joinedDate: "",
//       endDate: "",
//       profilePic: "",
//       country: "",
//     },
//   });

//   useEffect(() => {
//     axios
//       .get("http://127.0.0.1:8000/api/employee")
//       .then((response) => {
//         console.log(response.data);
//         setEmployees(response.data.data || []);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);

//   const handleInputChange = (event) => {
//     setFormData({
//       ...formData,
//       user: {
//         ...formData.user,
//         [event.target.name]: event.target.value,
//       },
//     });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     console.log(formData);
//     await axios
//       .post("http://127.0.0.1:8000/api/register/manager", {
//         name: formData.user.name,
//         email: formData.user.email,
//         password: formData.user.password,
//         phone: formData.user.phone,
//         nationalID: formData.user.nationalID,
//         address: formData.user.address,
//         joinedDate: formData.user.joinedDate,
//         endDate: formData.user.endDate,
//         country: formData.user.country,
//         role: formData.user.role,
//       })
//       .then((response) => {
//         console.log(formData);
//         setEmployees([...employees, formData]);
//         setFormData({
//           user: {
//             name: "",
//             email: "",
//             password: "",
//             phone: "",
//             nationalID: "",
//             address: "",
//             joinedDate: "",
//             endDate: "",
//             profilePic: "",
//             country: "",
//           },
//         });
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   const handleDelete = (employeeId) => {
//     axios
//       .delete(`http://127.0.0.1:8000/api/employee/${employeeId}`, {
//         headers: {
//           Authorization: "Bearer 7|rg9CBKokDh8YT3ThlLPB068mmCT5CH1UF7lcY8kl",
//         },
//       })
//       .then((response) => {
//         console.log(response.data);
//         setEmployees(
//           employees.filter((employee) => employee.id !== employeeId)
//         );
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   const handleEdit = (employee) => {
//     setSelectedEmployee(employee);
//     setShowEditForm(true);
//   };

//   const handleUpdate = (updatedEmployee) => {
//     console.log(updatedEmployee);
//     axios
//       .put(
//         `http://127.0.0.1:8000/api/user/${updatedEmployee.user.id}`,
//         updatedEmployee.user,
//         {
//           headers: {
//             Authorization: "Bearer 47|TeQrlI4SmHUN4rvJdxGZZx0eb9ryFBXmsNPNOHCY",
//           },
//         }
//       )
//       .then((response) => {
//         console.log(response.data);
//         const updatedEmployees = employees.map((employee) => {
//           if (employee.id === selectedEmployee.id) {
//             employee.user = response.data.data;
//           }
//           return employee;
//         });

//         console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
//         console.log(updatedEmployees);
//         setEmployees(updatedEmployees);
//         setShowEditForm(false);
//         setSelectedEmployee(null);
//       })
//       .catch((error) => {
//         console.log("asdadadasdassdasdadas");

//         console.error(error);
//       });
//   };

//   const handleClose = () => {
//     setShowEditForm(false);
//     setSelectedEmployee(null);
//   };

//   return (
//     <div className="col main pt-5 mt-3 h-100">
//       {/* <UserForm
//         formData={formData.user}
//         handleInputChange={handleInputChange}
//         handleSubmit={handleSubmit}
//       /> */}

//       <div className="employee-list row d-flex justify-content-center">
//         <h3 className="text-center">Employee List</h3>
//         {employees.length > 0 ? (
//           <div className="table-responsive">
//             <table className="table  table-striped text-center table-sm">
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Name</th>
//                   <th>Email</th>
//                   <th>Phone</th>
//                   <th>Address</th>
//                   <th>National ID</th>
//                   <th>Joined Date</th>
//                   <th>End Date</th>
//                   <th>Profile Picture</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {employees.map((employee) => (
//                   <tr key={employee.id}>
//                     <td>{employee.id}</td>
//                     <td>{employee.user.name}</td>
//                     <td>{employee.user.email}</td>
//                     <td>{employee.user.phone}</td>
//                     <td>{employee.user.address}</td>
//                     <td>{employee.user.nationalID}</td>
//                     <td>{employee.user.joinedDate}</td>
//                     <td>{employee.user.endDate}</td>
//                     <td>{employee.user.profilePic}</td>
//                     <td className="d-flex justify-content-evenly">
//                       <button
//                         className="btn btn-info"
//                         onClick={() => handleEdit(employee)}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="btn btn-danger"
//                         onClick={() => handleDelete(employee.id)}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <p>No employees found.</p>
//         )}
//       </div>

//       {showEditForm && (
//         <Editform
//           employee={selectedEmployee}
//           handleUpdate={handleUpdate}
//           handleClose={handleClose}
//         />
//       )}
//     </div>
//   );
// };

// export default Developer;

// import React, { useState, useEffect } from "react";
// import { classNames } from "primereact/utils";
// import { FilterMatchMode, FilterOperator } from "primereact/api";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { InputText } from "primereact/inputtext";
// import { Dropdown } from "primereact/dropdown";
// import { MultiSelect } from "primereact/multiselect";
// import { Tag } from "primereact/tag";
// import { TriStateCheckbox } from "primereact/tristatecheckbox";
// import { CustomerService } from "./CustomerService";
// import axios from "axios";

// export function BasicFilterDemo() {
//   useEffect(() => {
//     axios
//       .get("http://127.0.0.1:8000/api/employee")
//       .then((response) => {
//         console.log(response.data);
//         setCustomers(response.data.data || []);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);
//   const [customers, setCustomers] = useState(CustomerService);
//   const [filters, setFilters] = useState({
//     global: { value: null, matchMode: FilterMatchMode.CONTAINS },
//     name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
//     "country.name": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
//     representative: { value: null, matchMode: FilterMatchMode.IN },
//     status: { value: null, matchMode: FilterMatchMode.EQUALS },
//     verified: { value: null, matchMode: FilterMatchMode.EQUALS },
//   });
//   const [loading, setLoading] = useState(true);
//   const [globalFilterValue, setGlobalFilterValue] = useState("");
//   const [representatives] = useState([
//     { name: "Amy Elsner", image: "amyelsner.png" },
//     { name: "Anna Fali", image: "annafali.png" },
//     { name: "Asiya Javayant", image: "asiyajavayant.png" },
//     { name: "Bernardo Dominic", image: "bernardodominic.png" },
//     { name: "Elwin Sharvill", image: "elwinsharvill.png" },
//     { name: "Ioni Bowcher", image: "ionibowcher.png" },
//     { name: "Ivan Magalhaes", image: "ivanmagalhaes.png" },
//     { name: "Onyama Limba", image: "onyamalimba.png" },
//     { name: "Stephen Shaw", image: "stephenshaw.png" },
//     { name: "XuXue Feng", image: "xuxuefeng.png" },
//   ]);
//   const [statuses] = useState([
//     "unqualified",
//     "qualified",
//     "new",
//     "negotiation",
//     "renewal",
//   ]);

//   const getSeverity = (status) => {
//     switch (status) {
//       case "unqualified":
//         return "danger";

//       case "qualified":
//         return "success";

//       case "new":
//         return "info";

//       case "negotiation":
//         return "warning";

//       case "renewal":
//         return null;
//     }
//   };

//   // useEffect(() => {
//   // CustomerService.getCustomersMedium().then((data) => {
//   // setCustomers(customers);
//   // setLoading(false);
//   // });
//   // }, []); // eslint-disable-line react-hooks/exhaustive-deps

//   const getCustomers = (data) => {
//     return [...(data || [])].map((d) => {
//       d.date = new Date(d.date);

//       return d;
//     });
//   };

//   const onGlobalFilterChange = (e) => {
//     const value = e.target.value;
//     let _filters = { ...filters };

//     _filters["global"].value = value;

//     setFilters(_filters);
//     setGlobalFilterValue(value);
//   };

//   const renderHeader = () => {
//     return (
//       <div className="flex justify-content-end">
//         <span className="p-input-icon-left">
//           <i className="pi pi-search" />
//           <InputText
//             value={globalFilterValue}
//             onChange={onGlobalFilterChange}
//             placeholder="Keyword Search"
//           />
//         </span>
//       </div>
//     );
//   };

//   const representativeBodyTemplate = (rowData) => {
//     const representative = rowData.representative;

//     return (
//       <div className="flex align-items-center gap-2">
//         <img
//           alt={representative.name}
//           src={`https://primefaces.org/cdn/primereact/images/avatar/${representative.image}`}
//           width="32"
//         />
//         <span>{representative.name}</span>
//       </div>
//     );
//   };

//   const representativesItemTemplate = (option) => {
//     return (
//       <div className="flex align-items-center gap-2">
//         <img
//           alt={option.name}
//           src={`https://primefaces.org/cdn/primereact/images/avatar/${option.image}`}
//           width="32"
//         />
//         <span>{option.name}</span>
//       </div>
//     );
//   };

//   const statusBodyTemplate = (rowData) => {
//     return (
//       <Tag value={rowData.status} severity={getSeverity(rowData.status)} />
//     );
//   };

//   const statusItemTemplate = (option) => {
//     return <Tag value={option} severity={getSeverity(option)} />;
//   };

//   const verifiedBodyTemplate = (rowData) => {
//     return (
//       <i
//         className={classNames("pi", {
//           "true-icon pi-check-circle": rowData.verified,
//           "false-icon pi-times-circle": !rowData.verified,
//         })}
//       ></i>
//     );
//   };

//   const representativeRowFilterTemplate = (options) => {
//     return (
//       <MultiSelect
//         value={options.value}
//         options={representatives}
//         itemTemplate={representativesItemTemplate}
//         onChange={(e) => options.filterApplyCallback(e.value)}
//         optionLabel="name"
//         placeholder="Any"
//         className="p-column-filter"
//         maxSelectedLabels={1}
//         style={{ minWidth: "14rem" }}
//       />
//     );
//   };

//   const statusRowFilterTemplate = (options) => {
//     return (
//       <Dropdown
//         value={options.value}
//         options={statuses}
//         onChange={(e) => options.filterApplyCallback(e.value)}
//         itemTemplate={statusItemTemplate}
//         placeholder="Select One"
//         className="p-column-filter"
//         showClear
//         style={{ minWidth: "12rem" }}
//       />
//     );
//   };

//   const verifiedRowFilterTemplate = (options) => {
//     return (
//       <TriStateCheckbox
//         value={options.value}
//         onChange={(e) => options.filterApplyCallback(e.value)}
//       />
//     );
//   };

//   const header = renderHeader();

//   return (
//     <div className="card">
//       <DataTable
//         value={customers}
//         paginator
//         rows={10}
//         dataKey="id"
//         filters={filters}
//         // filterDisplay="row"
//         // loading={loading}
//         globalFilterFields={[
//           "user.name",
//           "user.email",
//           "user.nationalID",
//           "user.country",
//         ]}
//         header={header}
//         emptyMessage="No customers found."
//       >
//         <Column
//           field="user.name"
//           filterField="user.name"
//           header="Name"
//           style={{ minWidth: "12rem" }}
//         />
//         <Column
//           header="Email"
//           field="user.email"
//           filterField="user.email"
//           style={{ minWidth: "12rem" }}
//         />
//         <Column
//           header="National id"
//           filterField="user.nationalID"
//           field="user.nationalID"
//           style={{ minWidth: "14rem" }}
//           // showFilterMenu={false}
//           // filterMenuStyle={{ width: "14rem" }}
//           // body={representativeBodyTemplate}
//           // filter
//           // filterElement={representativeRowFilterTemplate}
//         />
//         <Column
//           field="user.country"
//           header="Country"
//           style={{ minWidth: "12rem" }}
//           // filterMenuStyle={{ width: "14rem" }}
//           // showFilterMenu={false}
//           // body={statusBodyTemplate}
//           // filter
//           // filterElement={statusRowFilterTemplate}
//         />
//         <Column
//           field="verified"
//           header="Actions"
//           // dataType="boolean"
//           style={{ minWidth: "6rem" }}
//           // body={verifiedBodyTemplate}
//           // filter
//           // filterElement={verifiedRowFilterTemplate}
//         />
//       </DataTable>
//     </div>
//   );
// }

//=====================================================
