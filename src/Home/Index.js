import React from "react";
import { useState } from "react";

import { Link } from "react-router-dom";
import "./Index.css";
import { AiFillHome } from "react-icons/ai";
import { BsDatabaseFillAdd } from "react-icons/bs";
import { TbHelpSquareFilled } from "react-icons/tb";
import { FaTruck } from "react-icons/fa";
import { MdBlockFlipped } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { GiKitchenTap } from "react-icons/gi";
import { BsFillFuelPumpDieselFill } from "react-icons/bs";
import { FaBook } from "react-icons/fa6";
import { RiTodoLine } from "react-icons/ri";

const Home = () => {

    const todayDate = new Date().toISOString().split("T")[0]; // Default today's date
    const [activeItem, setActiveItem] = useState("Home");
    const handleActiveItem = (item) => {
      setActiveItem(item);
    };
  
    const [startDate, setStartDate] = useState(todayDate);
    const [endDate, setEndDate] = useState(todayDate);
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };
  return (
    <div className="home-container">
      <div className="left-home-container">
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
      <div className="right-home-container">
        <div className="dates">
        <div className="selection">
    <select className="dropdown-selector">
      <option value="all">ALL</option>
      <option value="spl-corporate">SPL-CORPORATE
      </option>
      <option value="chennai">CHENNAI</option>
    </select>
  </div>

  <div className="date">
            <div className="date-input-container">
              <label htmlFor="startDate">Start Date:</label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={handleStartDateChange}
              />
            </div>
            <div className="date-input-container">
              <label htmlFor="endDate">End Date:</label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={handleEndDateChange}
              />
            </div>
          </div>
        </div>
        <div className="cards">
          <div className="card">
            <div className="card-header">
              <RiTodoLine style={{ padding: "10px", fontSize: "30px" }} />
              <p style={{ fontSize: "30px" }}>0</p>
            </div>
            <h1>Coupon Requested</h1>
          </div>
          <div className="card">
            <div className="card-header">
              <FaBook style={{ padding: "10px", fontSize: "30px" }} />
              <p style={{ fontSize: "30px" }}>0</p>
            </div>
            <h1>Coupon Approved</h1>
          </div>
          <div className="card">
            <div className="card-header">
              <BsFillFuelPumpDieselFill
                style={{ padding: "10px", fontSize: "30px" }}
              />
              <p style={{ fontSize: "30px" }}>0</p>
            </div>
            <h1>Coupon Generated</h1>
          </div>
          <div className="card">
            <div className="card-header">
              <GiKitchenTap style={{ padding: "10px", fontSize: "30px" }} />
              <p style={{ fontSize: "30px" }}>0</p>
            </div>
            <h1>Coupon Utilized</h1>
          </div>
          <div className="card">
            <div className="card-header">
              <FaHistory style={{ padding: "10px", fontSize: "30px" }} />
              <p style={{ fontSize: "30px" }}>0</p>
            </div>
            <h1>Coupon In Progress</h1>
          </div>
          <div className="card">
            <div className="card-header">
              <MdBlockFlipped style={{ padding: "10px", fontSize: "30px" }} />
              <p style={{ fontSize: "30px" }}>0</p>
            </div>
            <h1>Coupon Cancelled</h1>
          </div>
          <div className="card">
            <div className="card-header">
              <FaTruck style={{ padding: "10px", fontSize: "30px" }} />
              <p style={{ fontSize: "30px" }}>0</p>
            </div>
            <h1>Coupon Vehicles</h1>
          </div>
        </div>
        <div className="data-container">
          <h1>PFS Wise Consumption</h1>
          <p>PFS Wise Consumption (0 Ltrs)</p>
          <div className="display-data">
            <p>No data</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
