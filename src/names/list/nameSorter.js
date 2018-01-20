import moment from 'moment';

export const sortNamesByType = (
  sortType,
  unsortedNamesList,
  metWithProtected = false,
) => {
  switch (sortType) {
    case sortTypes.createdAsc: {
      const createdKey = metWithProtected ? 'metWith' : 'created_at';
      return unsortedNamesList.sort((nameA, nameB) =>
        moment(nameB[createdKey]).diff(moment(nameA[createdKey])),
      );
    }
    case sortTypes.createdDesc: {
      const createdKey = metWithProtected ? 'metWith' : 'created_at';
      return unsortedNamesList.sort((nameA, nameB) =>
        moment(nameA[createdKey]).diff(moment(nameB[createdKey])),
      );
    }
    case sortTypes.nameAsc:
      return unsortedNamesList.sort((nameA, nameB) => {
        const nameAFull = nameA.name.firstName.toLowerCase();
        const nameBFull = nameB.name.firstName.toLowerCase();
        if (nameAFull < nameBFull) return -1;
        if (nameAFull > nameBFull) return 1;
        return 0;
      });
    case sortTypes.nameDesc:
      return unsortedNamesList.sort((nameA, nameB) => {
        const nameAFull = nameA.name.firstName.toLowerCase();
        const nameBFull = nameB.name.firstName.toLowerCase();
        if (nameBFull < nameAFull) return -1;
        if (nameBFull > nameAFull) return 1;
        return 0;
      });
    case sortTypes.companyAsc:
      return unsortedNamesList.sort((nameA, nameB) => {
        const nameACompanyName = nameA.name.company.name.toLowerCase();
        const nameBCompanyName = nameB.name.company.name.toLowerCase();
        if (nameACompanyName < nameBCompanyName) return -1;
        if (nameACompanyName > nameBCompanyName) return 1;
        return 0;
      });
    case sortTypes.companyDesc:
      return unsortedNamesList.sort((nameA, nameB) => {
        const nameACompanyName = nameA.name.company.name.toLowerCase();
        const nameBCompanyName = nameB.name.company.name.toLowerCase();
        if (nameBCompanyName < nameACompanyName) return -1;
        if (nameBCompanyName > nameACompanyName) return 1;
        return 0;
      });
    case sortTypes.callBookedAsc:
      return unsortedNamesList.sort((nameA, nameB) =>
        moment(nameB.callBooked).diff(moment(nameA.callBooked)),
      );
    case sortTypes.callBookedDesc:
      return unsortedNamesList.sort((nameA, nameB) =>
        moment(nameA.callBooked).diff(moment(nameB.callBooked)),
      );
    case sortTypes.meetingBookedAsc:
      return unsortedNamesList.sort((nameA, nameB) =>
        moment(nameB.meetingBooked).diff(moment(nameA.meetingBooked)),
      );
    case sortTypes.meetingBookedDesc:
      return unsortedNamesList.sort((nameA, nameB) =>
        moment(nameA.meetingBooked).diff(moment(nameB.meetingBooked)),
      );
    default:
      return unsortedNamesList.sort((nameA, nameB) =>
        moment(nameB.name.createdAt).diff(moment(nameA.name.createdAt)),
      );
  }
};

export const sortTypes = {
  createdAsc: 'newestAdded',
  createdDesc: 'oldestAdded',
  nameAsc: 'nameAsc',
  nameDesc: 'nameDesc',
  companyAsc: 'companyAsc',
  companyDesc: 'companyDesc',
  callBookedAsc: 'callBookedAsc',
  callBookedDesc: 'callBookedDesc',
  meetingBookedAsc: 'meetingBookedAsc',
  meetingBookedDesc: 'meetingBookedDesc',
};
