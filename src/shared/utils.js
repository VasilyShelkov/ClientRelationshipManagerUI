export const checkIfAnyKeysDifferent = (originalObject, fieldsToEdit) => {
  const editFieldNames = Object.keys(fieldsToEdit);
  return editFieldNames.filter(
    editField => fieldsToEdit[editField] !== originalObject[editField],
  ).length;
};
