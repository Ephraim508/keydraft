// BranchTable.js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"; // Import from react-redux
import "./Index.css";
import * as XLSX from 'xlsx';
import { AiFillHome } from "react-icons/ai";
import { BsDatabaseFillAdd } from "react-icons/bs";
import { TbHelpSquareFilled } from "react-icons/tb";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { RemoveData } from "../store/actions/FormActions";
import { useNavigate } from "react-router-dom";
import { ImportData } from "../store/actions/FormActions";

const BranchTable = () => {
   const [activeItem, setActiveItem] = useState("Home");
      const handleActiveItem = (item) => {
        setActiveItem(item);
      };
  const [isZoomed, setIsZoomed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRow, setSelectedRow] = useState(null); // Modal state
  const branches = useSelector((state) => state.formData);  // Access data from Redux store
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [mainList, setMainlist] = useState(branches); // Initialize with all branches
  const [currentPage, setCurrentPage] = useState(1);  // Track current page
  const itemsPerPage = 5; // 

  // Effect hook to filter branches based on searchQuery
  useEffect(() => {
    if (searchQuery === "") {
      setMainlist(branches);
    } else {
      const filtered = branches.filter((item) =>
        item.branchCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.branchName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setMainlist(filtered);
    }
  }, [searchQuery, branches]);

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value); // Update search query
  };

  const deleteData = (id) => {
    dispatch(RemoveData(id));  // Dispatch action to remove data
  };

  const handleView = (row) => {
    setSelectedRow(row); // Set row data for modal
  };

  const closeModal = () => {
    setSelectedRow(null); // Close modal
  };

  const addNewBranch = () => {
    alert("Add New Branch functionality to be implemented.");
  };

  const editRow = (id) => {
    navigate(`/branch/${id}`);  // Navigate to edit page for this row
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          // Read the binary data from the file
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' }); // Parse the file into workbook
          
          // Get the first sheet name and the corresponding sheet
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];

          // Convert sheet to JSON
          const jsonData = XLSX.utils.sheet_to_json(sheet);
          
          // Dispatch imported data to the Redux store
          if (Array.isArray(jsonData)) {
            dispatch(ImportData(jsonData)); 
          } else {
            console.error("Parsed data is not an array. Check your file structure.");
          }
        } catch (error) {
          console.error("Error processing file:", error.message);
        }
      };

      reader.readAsArrayBuffer(file); // Read the file as an ArrayBuffer
    }
  };

  const indexOfLastRow = currentPage * itemsPerPage;
  const indexOfFirstRow = indexOfLastRow - itemsPerPage;
  const currentRows = mainList.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);  // Update the current page for pagination
  };

  const totalPages = Math.ceil(mainList.length / itemsPerPage);

  return (
    <div style={{ display: "flex" }}>
      {/* Table left side component */}
      <div className="table-left">
        <div className="left-home-logo">
          <img
            src="https://res.cloudinary.com/dgq6hbukw/image/upload/v1735732932/hcocak9gk7lyteem8khp.png"
            alt="main-logo"
            style={{ height: "40px" }}
          />
          <img
            src="https://res.cloudinary.com/dgq6hbukw/image/upload/v1735732932/wco08my40zihqqa6eurb.png"
            alt="digltrac"
            style={{ height: "40px" }}
          />
        </div>
        {/* Left navbar with home, help, and master options */}
        <ul className="left-home-icons">
                <li
                  className={`icon-item ${activeItem === "Home" ? "active" : ""}`}
                  onClick={() => handleActiveItem("Home")}
                >
                  <AiFillHome className="icon" />
                  Home
                </li>
                <li
                  className={`icon-item master-item ${
                    activeItem === "Masters" ? "active" : ""
                  }`}
                  onClick={() => handleActiveItem("Masters")}
                >
                  <BsDatabaseFillAdd className="icon" />
                  Masters
                  <ul className="branch-list">
                    <Link to="/table">
                      <li>Branch</li>
                    </Link>
                  </ul>
                </li>
                <li
                  className={`icon-item ${activeItem === "Help" ? "active" : ""}`}
                  onClick={() => handleActiveItem("Help")}
                >
                  <TbHelpSquareFilled className="icon" />
                  Help
                </li>
              </ul>
      </div>

      {/* Table right side with search, pagination, and file upload */}
      <div className="table-right">
        <div className="branch-table-wrapper">
          <h1>Branch</h1>
          <div
            className="top-bar"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              className="top-bar-left"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Link to="/branch">
                <button className="add-icon" onClick={addNewBranch}>
                  <FaPlus />
                </button>
              </Link>
              <div className="search">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearch} // Bind search handler
                />
                <button onClick={handleSearch}>🔍</button>
              </div>
            </div>
            <button className="zoom-icon" onClick={toggleZoom}>
              {isZoomed ? "🔍 Zoom Out" : "🔎 Zoom In"}
            </button>
            <button>
              <label htmlFor="file-upload" style={{ cursor: "pointer" }}>Import</label>
            </button>
            <input
              id="file-upload"
              type="file"
              accept=".xlsx, .xls"
              style={{ display: "none" }}
              onChange={handleFileUpload} // Import file logic
            />
          </div>

          {/* Branch table with data display */}
          <div className={`table-container ${isZoomed ? "zoomed" : "small"}`}>
            <table className="branch-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Branch Name</th>
                  <th>Branch Code</th>
                  <th>Branch Short Name</th>
                  <th>Locality</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Contact Person</th>
                  <th>Contact Person Phone</th>
                  <th>Pan No</th>
                  <th>GSTIN</th>
                  <th>Status</th>
                  <th>Action</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.length > 0 ? (
                  currentRows.map((row) => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>{row.branchName}</td>
                      <td>{row.branchCode}</td>
                      <td>{row.branchShortName}</td>
                      <td>{row.locality}</td>
                      <td>{row.city}</td>
                      <td>{row.state}</td>
                      <td>{row.contactPerson}</td>
                      <td>{row.contactPersonPhone}</td>
                      <td>{row.panNo}</td>
                      <td>{row.gstin}</td>
                      <td>{row.status}</td>
                      <td>
                        <MdEdit
                          style={{
                            width: "20px",
                            height: "20px",
                            marginRight: "8px",
                          }}
                          onClick={() => editRow(row.branchCode)}
                        />
                        <FaEye
                          onClick={() => handleView(row)}
                          style={{
                            width: "20px",
                            height: "20px",
                            cursor: "pointer",
                          }}
                        />
                      </td>
                      <td>
                        <button onClick={() => deleteData(row.branchCode)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="13">No branches found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={i + 1 === currentPage ? "active" : ""}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
           {/* Modal Component */}
        {selectedRow && (
          <div className="modal-backdrop" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2 style={{ marginBottom: "16px", color: "#444" }}>Branch Details</h2>
              <p><b>Branch Name:</b> {selectedRow.branchName}</p>
              <p><b>Branch Code:</b> {selectedRow.branchCode}</p>
              <p><b>Branch Short Name:</b> {selectedRow.branchShortName}</p>
              <p><b>Locality:</b> {selectedRow.locality}</p>
              <p><b>City:</b> {selectedRow.city}</p>
              <p><b>State:</b> {selectedRow.state}</p>
              <p><b>Contact Person:</b> {selectedRow.contactPerson}</p>
              <p><b>Contact Phone:</b> {selectedRow.contactPersonPhone}</p>
              <p><b>PAN No:</b> {selectedRow.panNo}</p>
              <p><b>GSTIN:</b> {selectedRow.gstin}</p>
              <p><b>Status:</b> {selectedRow.status}</p>
              <button
                onClick={closeModal}
                style={{
                  marginTop: "20px",
                  padding: "10px 20px",
                  background: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default BranchTable;
