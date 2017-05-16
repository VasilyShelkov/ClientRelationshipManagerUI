import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Switch, Route, matchPath, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Fuse from 'fuse.js';
import RaisedButton from 'material-ui/RaisedButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import { fullWhite, green500 } from 'material-ui/styles/colors';
import ReactList from 'react-list';

import { sortNamesByType, sortTypes } from './nameSorter';
import { getNameByFirstAndLastName, getNameByNameId, getNameIndexByNameId } from './nameListShapeShifter';
import Name from './Name';
import NameOrganiser from './NameListOrganiser';
import LoadingSpinner from '../../shared/LoadingSpinner';
import EditLockedName from './locked/EditLockedNameInfo';
import { selectName } from '../selected/selectedActions';
import { openEditProtectedNameMeetingDialog, openEditProtectedNameCallDialog } from '../nameActions';

export class NamesList extends Component {
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

  componentDidUpdate() {
    const { loading, names = [], nameListType, selectedName, openNameDetails, currentPath } = this.props;

    const encodedNameFromURL = _.get(
      matchPath(currentPath, { path: '/account/names/(.*)/selected/:encodedName' }),
      'params.encodedName'
    );
    const selectedNameFromURL = getNameByFirstAndLastName(names, encodedNameFromURL);
    if (selectedNameFromURL && !selectedName) {
      openNameDetails(selectedNameFromURL, nameListType);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { loading, names = [], nameListType, selectedName } = this.props;
    const { searchValue, sortBy } = this.state;

    return (
      (!nextProps.loading && _.isEqual(names, nextProps.names)) ||
      (!nextProps.loading && nameListType !== nextProps.nameListType) ||
      (!nextProps.loading && _.isEqual(selectedName, nextProps.selectedName)) ||
      (!nextProps.loading && searchValue !== nextState.searchValue) ||
      (!nextProps.loading && sortBy !== nextState.sortBy)
    );
  }

  render() {
    const {
      loading = true,
      names = [],
      nameListType,
      selectedName,
      openNameDetails,
      openEditProtectedNameMeetingDialog,
      openEditProtectedNameCallDialog,
      onSubmitBookCall,
      onSubmitBookMeeting,
      currentPath
    } = this.props;
    if (loading) return <LoadingSpinner />;

    const encodedNameFromURL = _.get(
      matchPath(currentPath, { path: '/account/names/(.*)/selected/:encodedName' }),
      'params.encodedName'
    );
    const selectedNameFromURL = getNameByFirstAndLastName(names, encodedNameFromURL);
    if (
      encodedNameFromURL &&
      matchPath(currentPath, { path: '/account/names/:nameListType' }).params.nameListType === nameListType &&
      names.length &&
      !selectedNameFromURL
    ) {
      return <Redirect to={`/account/names/${nameListType}`} />;
    }

    const selectedNameId = _.get(selectedName, 'id');
    if (selectedName && !encodedNameFromURL) {
      const selectedNameInCurrentList = getNameByNameId(names, selectedNameId);
      if (selectedNameInCurrentList) {
        return (
          <Redirect
            to={`${currentPath}/selected/${selectedName.firstName.toLowerCase()}-${selectedName.lastName.toLowerCase()}`}
          />
        );
      }
    }

    let namesFromSearch = names.slice(0);
    if (this.state.searchValue) {
      namesFromSearch = this.state.fuse.search(this.state.searchValue);
    }

    const sortedNames = sortNamesByType(this.state.sortBy, namesFromSearch, nameListType === 'metWithProtected');

    let createdText = 'created';
    switch (nameListType) {
      case 'unprotected':
        createdText = 'created';
        break;
      case 'protected':
        createdText = 'protected';
        break;
      case 'metWithProtected':
        createdText = 'met with';
        break;
      case 'clients':
        createdText = 'client since';
        break;
      default:
        createdText = 'created';
    }

    console.log('==========>', sortedNames.length);
    return (
      <div id={`${nameListType}NamesList`}>
        {names.length
          ? <div>
              <NameOrganiser
                searchValue={this.state.searchValue}
                sortBy={this.state.sortBy}
                searchResultsLength={namesFromSearch.length !== names.length && namesFromSearch.length}
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
                        selected={typedName.name.id === _.get(selectedName, 'id')}
                        showMoreDetails={() => openNameDetails(typedName, nameListType)}
                        editProtectedCall={() => openEditProtectedNameCallDialog(typedName.name.id)}
                        editProtectedMeeting={() => openEditProtectedNameMeetingDialog(typedName.name.id)}
                        currentPath={currentPath}
                        {...typedName}
                      />
                    );
                  }}
                />
              </div>
            </div>
          : <Switch>
              <Route
                path="/account/names/unprotected"
                render={() => (
                  <RaisedButton
                    containerElement={<Link to="/account/names/unprotected/add" />}
                    id="createUnprotectedName"
                    labelStyle={{ color: fullWhite }}
                    backgroundColor={green500}
                    label="Create first name"
                    icon={<AddIcon color={fullWhite} />}
                    fullWidth
                  />
                )}
              />
              <Route render={() => <div>You currently have none</div>} />
            </Switch>}
        <Route
          path="/account/names/(protected|metWithProtected|clients)"
          render={() => (
            <EditLockedName
              names={names}
              onSubmitBookCall={onSubmitBookCall}
              onSubmitBookMeeting={onSubmitBookMeeting}
            />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentPath: state.routing.location.pathname
});

const mapDispatchToProps = dispatch => ({
  openNameDetails: (name, selectedNameList) => dispatch(selectName(name, selectedNameList)),
  openEditProtectedNameMeetingDialog: nameId => dispatch(openEditProtectedNameMeetingDialog(nameId)),
  openEditProtectedNameCallDialog: nameId => dispatch(openEditProtectedNameCallDialog(nameId))
});

export default connect(mapStateToProps, mapDispatchToProps)(NamesList);
