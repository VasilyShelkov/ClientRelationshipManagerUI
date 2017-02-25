export const removeNameFromList = (previousResult, nameToRemoveId, nameListType, isName = false) => {
  let removedNamePosition;
  if (isName) {
    removedNamePosition = previousResult.user[nameListType].findIndex(
      ({ name }) => name.id === nameToRemoveId
    );
  } else {
    removedNamePosition = previousResult.user[nameListType].findIndex(
      ({ id }) => id === nameToRemoveId
    );
  }

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
};
