export const removeNameFromList = (previousResult, nameToRemoveId, nameListType, isName = false) => {
  let removedNamePosition;
  if (isName) {
    removedNamePosition = previousResult.user[nameListType].findIndex(({ name }) => name.id === nameToRemoveId);
  } else {
    removedNamePosition = previousResult.user[nameListType].findIndex(({ id }) => id === nameToRemoveId);
  }

  if (removedNamePosition >= 0) {
    return {
      ...previousResult,
      user: {
        ...previousResult.user,
        [nameListType]: [
          ...previousResult.user[nameListType].slice(0, removedNamePosition),
          ...previousResult.user[nameListType].slice(removedNamePosition + 1)
        ]
      }
    };
  }

  return previousResult;
};

export const getNameByNameId = (typedNamesList, nameId) => {
  if (typedNamesList && nameId) {
    return typedNamesList.find(typedName => typedName.name.id === nameId);
  }

  return null;
};

export const getNameIndexByNameId = (typedNamesList, nameId) => {
  if (typedNamesList && nameId) {
    return typedNamesList.findIndex(typedName => typedName.name.id === nameId);
  }

  return null;
};

export const getNameByFirstAndLastName = (typedNamesList, encodedName) => {
  if (typedNamesList && encodedName) {
    const decodedName = decodeURI(encodedName).split('-');
    const selectedFirstName = decodedName[0];
    const selectedLastName = decodedName[1];
    return typedNamesList.find(
      typedName =>
        typedName.name.firstName.toLowerCase() === selectedFirstName &&
        typedName.name.lastName.toLowerCase() === selectedLastName
    );
  }

  return null;
};
