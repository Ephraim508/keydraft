// Example implementation of saveFormData
export const saveFormData = (formData) => ({
  type: "SAVE_FORM_DATA",
  payload: formData,
});

export const RemoveData = (branchCode) => {
  return {
    type: "DELETE_RECORD",
    payload: branchCode, // Pass the branchCode for deletion
  };
};

export const editRecord = (updatedData) => ({
  type: "EDIT_RECORD",
  payload: updatedData, // Pass the full data that needs to be updated
});

export const ImportData = (data) => ({
  type: "IMPORT_DATA",
  payload: data,
});
