// Reducer to hold the array of form data
const defaultFormData = {
  branchCode: "BR001",
  branchName: "Central Branch",
  branchShortName: "CBR",
  doorFlatNo: "12A",
  street: "Main Street",
  city: "New York",
  state: "NY",
  pincode: "10001",
  locality: "Downtown",
  gstin: "22AAAAA0000A1Z5",
  vehicleType: "Truck",
  contactNo: "1234567890",
  email: "centralbranch@example.com",
  alternateContactNo: "0987654321",
  whatsappNumber: "1234567890",
  branchInchargeName: "John Doe",
  inchargeContactNo: "1234567890",
  inchargeAlternateNo: "0987654321",
  inchargeWhatsappNo: "1234567890",
  inchargeEmail: "johndoe@example.com",
  contactPersonName: "Jane Smith",
  personContactNo: "9876543210",
  personAlternateNo: "1234509876",
  personWhatsappNo: "9876543210",
  personEmail: "janesmith@example.com",
  openingBalance: "5000",
  openingDate: "2025-01-01",
  minimumAmount: "100",
  maximumUnsettledAmount: "5000",
  monthlyMaximumAmount: "20000",
  effectiveDate: "2025-01-01",
  accountNumber: "123456789012",
  accountHolderName: "Central Branch Bank",
  ifscCode: "IFSC0000123",
  bankName: "Central Bank",
  BRANCHNAME: "Main Branch",
  status: true,
};

const initialState = {
  formData: [defaultFormData], // Initial array with one default form data
};

const FormReducers = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_FORM_DATA":
      return {
        ...state,
        formData: [...state.formData, action.payload], // Add new form data to array
      };
      case "DELETE_RECORD":
       const filterData=state.formData.filter((item)=>item.branchCode!==action.payload)
        return{
          ...state,formData:filterData
        }
        case "EDIT_RECORD":
      return {
        ...state,
        formData: state.formData.map((item) =>
          item.branchCode === action.payload.branchCode
            ? { ...item, ...action.payload }
            : item
        ),
      };
      case "IMPORT_DATA":
        return {
          ...state,
          formData: [...state.formData, ...action.payload], // Append the imported data to existing `formData`
        };
      

     
    
    default:
      return state;
  }
};

export default FormReducers;
