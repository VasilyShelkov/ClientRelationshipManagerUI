import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { green500, red500, cyan500 } from 'material-ui/styles/colors';
import { sortTypes } from './nameSorter';

export default ({
  searchValue,
  searchResultsLength,
  sortBy,
  showProtectedNameOptions,
  selectedNameDrawerOpen,
  updateSearch,
  updateSort
}) => {
  let searchColor = cyan500;
  if (searchResultsLength) {
    searchColor = green500;
  }

  if (searchResultsLength === 0) {
    searchColor = red500;
  }

  const searchGridSize = `col-12 col-md-${selectedNameDrawerOpen ? 5 : 7} col-lg-${selectedNameDrawerOpen ? 12 : 6} col-xl-${selectedNameDrawerOpen ? 7 : 8}`;
  const sortGridSize = `col-12 col-md-${selectedNameDrawerOpen ? 7 : 5} col-lg-${selectedNameDrawerOpen ? 12 : 6} col-xl-${selectedNameDrawerOpen ? 5 : 4}`;
  return (
    <div className="row NameListOrganiser">
      <div className={`NameListOrganiser__search${selectedNameDrawerOpen ? '--name-selected' : ''} ${searchGridSize}`}>
        <Paper className="NameListOrganiser__search__container">
          <TextField
            name="searchName"
            hintText="Search by name, company or phone..."
            hintStyle={{ whiteSpace: 'nowrap' }}
            errorText={searchValue && searchResultsLength !== false ? `${searchResultsLength} results` : ''}
            underlineStyle={searchValue && { borderColor: searchColor }}
            errorStyle={{ color: searchColor }}
            onChange={updateSearch}
            fullWidth
          />
        </Paper>
      </div>

      <div className={sortGridSize}>
        <Paper className="">
          {showProtectedNameOptions
            ? <DropDownMenu
                value={sortBy}
                onChange={updateSort}
                underlineStyle={{ borderTop: '0px' }}
                style={{ width: '100%' }}
              >
                <MenuItem value={sortTypes.createdAsc} primaryText="Newest Added" />
                <MenuItem value={sortTypes.createdDesc} primaryText="Oldest Added" />
                <MenuItem value={sortTypes.nameAsc} primaryText="Name Alphabetically Ascending" />
                <MenuItem value={sortTypes.nameDesc} primaryText="Name Alphabetically Descending" />
                <MenuItem value={sortTypes.companyAsc} primaryText="Company Alphabetically Ascending" />
                <MenuItem value={sortTypes.companyDesc} primaryText="Company Alphabetically Descending" />
                <MenuItem value={sortTypes.callBookedAsc} primaryText="Soonest Call Booked" />
                <MenuItem value={sortTypes.callBookedDesc} primaryText="Latest Call Booked" />
                <MenuItem value={sortTypes.meetingBookedAsc} primaryText="Soonest Meeting Booked" />
                <MenuItem value={sortTypes.meetingBookedDesc} primaryText="Latest Meeting Booked" />
              </DropDownMenu>
            : <DropDownMenu
                value={sortBy}
                onChange={updateSort}
                underlineStyle={{ borderTop: '0px' }}
                style={{ width: '100%' }}
              >
                <MenuItem value={sortTypes.createdAsc} primaryText="Newest Added" />
                <MenuItem value={sortTypes.createdDesc} primaryText="Oldest Added" />
                <MenuItem value={sortTypes.nameAsc} primaryText="Name Alphabetically Ascending" />
                <MenuItem value={sortTypes.nameDesc} primaryText="Name Alphabetically Descending" />
                <MenuItem value={sortTypes.companyAsc} primaryText="Company Alphabetically Ascending" />
                <MenuItem value={sortTypes.companyDesc} primaryText="Company Alphabetically Descending" />
              </DropDownMenu>}
        </Paper>
      </div>
    </div>
  );
};
