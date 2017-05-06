import React, { Component } from 'react';
import Fuse from 'fuse.js';
import RaisedButton from 'material-ui/RaisedButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import { fullWhite, green500 } from 'material-ui/styles/colors';
import ReactList from 'react-list';
import { sortNamesByType, sortTypes } from './nameSorter';

import Name from './Name';
import NameOrganiser from './NameListOrganiser';

export default class NamesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
      sortBy: sortTypes.createdAsc,
      fuse: new Fuse(this.props.names, { keys: ['name.firstName', 'name.lastName', 'name.phone', 'name.company'] })
    };
  }

  updateSearch = event => {
    this.setState({ searchValue: event.target.value });
  };

  updateSort = (event, index, value) => this.setState({ sortBy: value });

  render() {
    const {
      id,
      names,
      selectedNameId,
      isProtected,
      selectedNameDrawerOpen,
      showCreateNameForm = null,
      openNameDetails,
      openEditProtectedNameMeetingDialog,
      openEditProtectedNameCallDialog
    } = this.props;
    let namesFromSearch = names.slice(0);

    if (this.state.searchValue) {
      namesFromSearch = this.state.fuse.search(this.state.searchValue);
    }

    const sortedNames = sortNamesByType(this.state.sortBy, namesFromSearch, id === 'metWithProtectedNamesList');

    let createdText = 'created';
    switch (id) {
      case 'unprotectedNamesList':
        createdText = 'created';
        break;
      case 'protectedNamesList':
        createdText = 'protected';
        break;
      case 'metWithProtectedNamesList':
        createdText = 'met with';
        break;
      case 'clientNamesList':
        createdText = 'client since';
        break;
      default:
        createdText = 'created';
    }

    return (
      <div id={id}>
        {names.length
          ? <div>
              <NameOrganiser
                searchValue={this.state.searchValue}
                sortBy={this.state.sortBy}
                searchResultsLength={namesFromSearch.length !== names.length && namesFromSearch.length}
                showProtectedNameOptions={isProtected}
                selectedNameDrawerOpen={selectedNameDrawerOpen}
                updateSearch={this.updateSearch}
                updateSort={this.updateSort}
              />
              <div style={{ overflow: 'auto', maxHeight: 400 }}>
                <ReactList
                  length={sortedNames.length}
                  itemRenderer={(index, key) => {
                    const typedName = sortedNames[index];
                    return (
                      <Name
                        id={`name-${key}`}
                        createdText={createdText}
                        key={`name-${index}`}
                        selected={typedName.name.id === selectedNameId}
                        showMoreDetails={() => openNameDetails(typedName.name.id)}
                        editProtectedCall={() => openEditProtectedNameCallDialog(typedName.name.id)}
                        editProtectedMeeting={() => openEditProtectedNameMeetingDialog(typedName.name.id)}
                        isProtected={isProtected}
                        selectedNameDrawerOpen={selectedNameDrawerOpen}
                        {...typedName}
                      />
                    );
                  }}
                />
              </div>
            </div>
          : <div>
              {showCreateNameForm
                ? <RaisedButton
                    id="createUnprotectedName"
                    onClick={showCreateNameForm}
                    labelStyle={{ color: fullWhite }}
                    backgroundColor={green500}
                    label="Create first name"
                    icon={<AddIcon color={fullWhite} />}
                    fullWidth
                  />
                : 'You currently have none'}
            </div>}
      </div>
    );
  }
}
