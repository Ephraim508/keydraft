import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import './Index.css'
import { AiFillHome } from "react-icons/ai";
import { BsDatabaseFillAdd } from "react-icons/bs";
import { TbHelpSquareFilled } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { saveFormData } from "../store/actions/FormActions";
import { editRecord } from "../store/actions/FormActions";
const BranchManage = () => {
   const [activeItem, setActiveItem] = useState("Home");
      const handleActiveItem = (item) => {
        setActiveItem(item);
      };
  const [formData, setFormData] = useState({
    "branchCode": "",
    "branchName": "",
    "branchShortName": "",
    "BRANCHNAME": "",
    "status": false,
    "doorFlatNo": "",
    "street": "",
    "city": "",
    "state": "",
    "pincode": "",
    "locality": "",
  
    "gstin": "",
    "vehicleType": "",
  
    "contactNo": "",
    "email": "",
    "alternateContactNo": "",
    "whatsappNumber": "",
  
    "branchInchargeName": "",
    "inchargeContactNo": "",
    "inchargeAlternateNo": "",
    "inchargeWhatsappNo": "",
    "inchargeEmail": "",
  
    "contactPersonName": "",
    "personContactNo": "",
    "personAlternateNo": "",
    "personWhatsappNo": "",
    "personEmail": "",
  
    "openingBalance": "",
    "openingDate": "",
    "minimumAmount": "",
    "maximumUnsettledAmount": "",
    "monthlyMaximumAmount": "",
    "effectiveDate": "",
    "accountNumber": "",
    "accountHolderName": "",
    "ifscCode": "",
    "bankName": "",
  });
  const {id}=useParams()
  const branchData = useSelector((state) => {
   
    return state.formData?.find((item) => item.branchCode === id) || null;
  });

  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
 

  console.log(id)
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if we're editing an existing branch or adding a new one
    if (branchData) {
      // If branchData exists (meaning we're editing an existing record)
      console.log("Updating data:", formData);
      dispatch(editRecord(formData)); // Action to update the existing data
      alert("Branch data has been updated successfully");
    } else {
      // If no branchData (meaning we're adding a new one)
      console.log("Submitting data to Redux store:", formData);
      dispatch(saveFormData(formData)); // Action to save a new record
      alert("Data has been added successfully");
    }
  };
  
  useEffect(() => {
    if (branchData) {
      console.log("branchData fetched:", branchData); // Debugging if the data exists
  
      setFormData(prevState => ({
        ...prevState,
        branchCode: branchData.branchCode || prevState.branchCode,
        branchName: branchData.branchName || prevState.branchName,
        branchShortName: branchData.branchShortName || prevState.branchShortName,
        doorFlatNo: branchData.doorFlatNo || prevState.doorFlatNo,
        street: branchData.street || prevState.street,
        city: branchData.city || prevState.city,
        state: branchData.state || prevState.state,
        pincode: branchData.pincode || prevState.pincode,
        locality: branchData.locality || prevState.locality,
        gstin: branchData.gstin || prevState.gstin,
        vehicleType: branchData.vehicleType || prevState.vehicleType,
        contactNo: branchData.contactNo || prevState.contactNo,
        email: branchData.email || prevState.email,
        alternateContactNo: branchData.alternateContactNo || prevState.alternateContactNo,
        whatsappNumber: branchData.whatsappNumber || prevState.whatsappNumber,
        branchInchargeName: branchData.branchInchargeName || prevState.branchInchargeName,
        inchargeContactNo: branchData.inchargeContactNo || prevState.inchargeContactNo,
        inchargeAlternateNo: branchData.inchargeAlternateNo || prevState.inchargeAlternateNo,
        inchargeWhatsappNo: branchData.inchargeWhatsappNo || prevState.inchargeWhatsappNo,
        inchargeEmail: branchData.inchargeEmail || prevState.inchargeEmail,
        contactPersonName: branchData.contactPersonName || prevState.contactPersonName,
        personContactNo: branchData.personContactNo || prevState.personContactNo,
        personAlternateNo: branchData.personAlternateNo || prevState.personAlternateNo,
        personWhatsappNo: branchData.personWhatsappNo || prevState.personWhatsappNo,
        personEmail: branchData.personEmail || prevState.personEmail,
        openingBalance: branchData.openingBalance || prevState.openingBalance,
        openingDate: branchData.openingDate || prevState.openingDate,
        minimumAmount: branchData.minimumAmount || prevState.minimumAmount,
        maximumUnsettledAmount: branchData.maximumUnsettledAmount || prevState.maximumUnsettledAmount,
        monthlyMaximumAmount: branchData.monthlyMaximumAmount || prevState.monthlyMaximumAmount,
        effectiveDate: branchData.effectiveDate || prevState.effectiveDate,
        accountNumber: branchData.accountNumber || prevState.accountNumber,
        accountHolderName: branchData.accountHolderName || prevState.accountHolderName,
        ifscCode: branchData.ifscCode || prevState.ifscCode,
        bankName: branchData.bankName || prevState.bankName,
      }));
    } else {
      console.log("No branch data available yet");
    }
  }, [branchData]);
  

  return (
    <div style={{display:"flex"}}>
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
        <div className="branch-right">
        <form onSubmit={handleSubmit} className="manage-branch-form">
      <h3>Manage Branch</h3>

      <fieldset>
        <legend>1. Branch Details</legend>
        <input type="text" name="branchCode" placeholder="Branch Code" value={formData.branchCode} onChange={handleChange} required />
        <input type="text" name="branchName" placeholder="Branch Name" value={formData.branchName} onChange={handleChange} required />
        <input type="text" name="branchShortName" placeholder="Branch Short Name" value={formData.branchShortName} onChange={handleChange} required />
        <input type="text" name="doorFlatNo" placeholder="Door/Flat/House No" value={formData.doorFlatNo} onChange={handleChange} />
        <input type="text" name="street" placeholder="Street" value={formData.street} onChange={handleChange} />
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
        <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
        <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} />
        <input type="text" name="locality" placeholder="Locality" value={formData.locality} onChange={handleChange} required />
        <input type="text" name="gstin" placeholder="GSTIN" value={formData.gstin} onChange={handleChange} />
        <select name="vehicleType" value={formData.vehicleType} onChange={handleChange}>
          <option value="" disabled>Select Vehicle Type</option>
          <option value="Branch">Branch</option>
         
        </select>
      </fieldset>

      <fieldset>
        <legend>2. Branch Contact Details</legend>
        <input type="text" name="contactNo" placeholder="Contact No" value={formData.contactNo} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email ID" value={formData.email} onChange={handleChange} />
        <input type="text" name="alternateContactNo" placeholder="Alternate Contact No" value={formData.alternateContactNo} onChange={handleChange} />
        <input type="text" name="whatsappNumber" placeholder="WhatsApp Number" value={formData.whatsappNumber} onChange={handleChange} />
      </fieldset>
      <fieldset>
        <legend>3. Branch Incharge Details</legend>
        <input type="text" placeholder="Branch Incharge Name" />
        <input type="text" placeholder="Contact No" />
        <input type="text" placeholder="Alternate Contact No" />
        <input type="text" placeholder="Whatsapp Number" />
        <input type="email" placeholder="Email Id" />
      </fieldset>

      <fieldset>
        <legend>4. Contact Person Details</legend>
        <input type="text" placeholder="Contact Person Name" />
        <input type="text" placeholder="Contact No" />
        <input type="text" placeholder="Alternate Contact No" />
        <input type="text" placeholder="Whatsapp Number" />
        <input type="email" placeholder="Email Id" />
      </fieldset>

      <fieldset>
        <legend>5. Opening Details</legend>
        <input type="number" placeholder="Opening Balance" />
        <input type="date" placeholder="Opening Date" />
      </fieldset>

      <fieldset>
        <legend>6. Advance Request Details</legend>
        <input type="number" placeholder="Minimum Amount" />
        <input type="number" placeholder="Maximum Unsettled Amount" />
        <input type="number" placeholder="Maximum Amount" />
        <input type="date" placeholder="Effective Date" />
      </fieldset>

      <fieldset>
        <legend>7. Bank Details</legend>
        <input type="number" placeholder="Account Number" />
        <input type="text" placeholder="Account Holder Name" />
        <input type="text" placeholder="IFSC Code" />
        <input type="text" placeholder="Bank Name" />
        <input type="text" placeholder="Branch Name" />
      </fieldset>
    
      <fieldset>
        <legend>Status</legend>
        <label>
          <input
            type="checkbox"
            name="status"
            checked={formData.status}
            onChange={handleChange}
          />
          Active
        </label>
      </fieldset>

      <div className="form-actions">
        <button type="button" onClick={() => setFormData({})}>
          Discard
        </button>
        <button type="submit">Submit</button>
      </div>
    </form>
        </div>
    </div>
    
  );
};

export default BranchManage;
