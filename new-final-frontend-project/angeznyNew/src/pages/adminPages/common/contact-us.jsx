import React, { useState, useEffect } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import axios from "axios";
import { toast } from "react-toastify";

export default function AdminContactUs() {
  const [showReply, setShowReply] = useState(true);
  const [selectedContactObject, setSelectedContactObject] = useState(null);

  const [contacts, setContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/contact-us")
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          setContacts(response.data.data || []);
          toast.success("Contacts fetched successfully");
        } else {
          toast.error("failed to load the data");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDelete = (contactId) => {
    axios
      .delete(`http://127.0.0.1:8000/api/contact-us/${contactId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setContacts(contacts.filter((contact) => contact.id !== contactId));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = (updatedContact) => {
    console.log(updatedContact);
    axios
      .put(
        `http://127.0.0.1:8000/api/contact-us/${updatedContact.id}`,
        {
          Admin_id: localStorage.getItem("user_id"),
          replayed: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data.data);

        const updatedContacts = contacts.map((contact) => {
          if (contact.id === updatedContact.id) {
            contact = response.data.data;
          }
          return contact;
        });

        // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        console.log(updatedContacts);
        setContacts(updatedContacts);
        // setShowEditForm(false);
        selectedContactObject(null);
        // handleClose();
      })
      .catch((error) => {
        // console.log("asdadadasdassdasdadas");
        console.error(error);
      });
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
        <h4 className="m-0">Contact Us</h4>
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
            value={contacts}
            paginator
            header={header}
            rows={10}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            rowsPerPageOptions={[10, 25, 50]}
            dataKey="id"
            selectionMode="checkbox"
            selection={selectedContacts}
            onSelectionChange={(e) => setSelectedContacts(e.value)}
            filters={filters}
            filterDisplay="menu"
            globalFilterFields={["name"]}
            emptyMessage="No Messages found."
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          >
            <Column
              field="name"
              header="Name"
              sortable
              // filter
              style={{ width: "35rem" }}
            />

            <Column
              field="email"
              header="Email"
              sortable
              // filter
              style={{ width: "35rem" }}
            />

            <Column
              field="subject"
              header="Subject"
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
                setSelectedContactObject(rowData);
                return (
                  <div style={{ display: "flex" }}>
                    <button
                      className="btn btn-info me-3 w-75"
                      onClick={() => handleSubmit(rowData)}
                      disabled={rowData.replayed} // set disabled attribute based on replayed property
                    >
                      {rowData.replayed ? "Replayed" : "Replay"}{" "}
                      {/* set text content based on replayed property */}
                    </button>
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
