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
import {
  getNameByFirstAndLastName,
  getNameByNameId,
} from './nameListShapeShifter';
import Name from './Name';
import NameOrganiser from './NameListOrganiser';
import LoadingSpinner from '../../shared/LoadingSpinner';
import EditLockedName from './locked/EditLockedNameInfo';
import { selectName } from '../selected/selectedActions';
import {
  openEditProtectedNameMeetingDialog,
  openEditProtectedNameCallDialog,
} from '../nameActions';

export class NamesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
      sortBy: sortTypes.createdAsc,
      fuse: new Fuse(this.props.names, {
        keys: ['name.firstName', 'name.lastName', 'name.phone', 'name.company'],
      }),
    };
  }

  updateSearch = event => {
    this.setState({ searchValue: event.target.value });
  };

  updateSort = (event, index, value) => this.setState({ sortBy: value });

  componentDidUpdate() {
    const {
      names = [],
      nameListType,
      selectedNameId,
      openNameDetails,
      currentPath,
    } = this.props;

    const encodedNameFromURL = _.get(
      matchPath(currentPath, {
        path: '/account/names/(.*)/selected/:encodedName',
      }),
      'params.encodedName',
    );
    const selectedNameFromURL = getNameByFirstAndLastName(
      names,
      encodedNameFromURL,
    );
    if (selectedNameFromURL && !selectedNameId) {
      openNameDetails(selectedNameFromURL, nameListType);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      loading,
      names = [],
      nameListType,
      selectedNameId,
      currentPath,
    } = this.props;
    const { searchValue, sortBy } = this.state;

    const currentlySelectedName = _.get(
      matchPath(currentPath, {
        path: '/account/names/(.*)/selected/:encodedName',
      }),
      'params.encodedName',
    );
    const newSelectedName = _.get(
      matchPath(nextProps.currentPath, {
        path: '/account/names/(.*)/selected/:encodedName',
      }),
      'params.encodedName',
    );
    return (
      loading !== nextProps.loading ||
      (!nextProps.loading && !_.isEqual(names, nextProps.names)) ||
      (!nextProps.loading && nameListType !== nextProps.nameListType) ||
      (!nextProps.loading && selectedNameId !== nextProps.selectedNameId) ||
      (!nextProps.loading && searchValue !== nextState.searchValue) ||
      (!nextProps.loading && sortBy !== nextState.sortBy) ||
      (!nextProps.loading &&
        (matchPath(currentPath, {
          path: '/account/names/:nameListType',
          exact: true,
        }) ||
          currentlySelectedName !== newSelectedName))
    );
  }

  render() {
    const {
      loading = true,
      names = [],
      nameListType,
      selectedNameId,
      openNameDetails,
      openEditProtectedNameMeetingDialog,
      openEditProtectedNameCallDialog,
      onSubmitBookCall,
      onSubmitBookMeeting,
      currentPath,
      initialListIndex,
    } = this.props;
    if (loading) return <LoadingSpinner />;

    const encodedNameFromURL = _.get(
      matchPath(currentPath, {
        path: '/account/names/(.*)/selected/:encodedName',
      }),
      'params.encodedName',
    );
    const selectedNameFromURL = getNameByFirstAndLastName(
      names,
      encodedNameFromURL,
    );
    if (selectedNameId && (!encodedNameFromURL || !selectedNameFromURL)) {
      const selectedNameInCurrentList = getNameByNameId(names, selectedNameId);
      if (selectedNameInCurrentList) {
        return (
          <Redirect
            to={`/account/names/${nameListType}/selected/${selectedNameInCurrentList.name.firstName.toLowerCase()}-${selectedNameInCurrentList.name.lastName.toLowerCase()}`}
          />
        );
      }
    }

    if (
      encodedNameFromURL &&
      matchPath(currentPath, { path: '/account/names/:nameListType' }).params
        .nameListType === nameListType &&
      names.length &&
      !selectedNameFromURL
    ) {
      return <Redirect to={`/account/names/${nameListType}`} />;
    }

    let namesFromSearch = names.slice(0);
    if (this.state.searchValue) {
      namesFromSearch = this.state.fuse.search(this.state.searchValue);
    }

    const sortedNames = sortNamesByType(
      this.state.sortBy,
      namesFromSearch,
      nameListType === 'metWithProtected',
    );

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

    return (
      <div id={`${nameListType}NamesList`}>
        {names.length ? (
          <div>
            <NameOrganiser
              searchValue={this.state.searchValue}
              sortBy={this.state.sortBy}
              searchResultsLength={
                namesFromSearch.length !== names.length &&
                namesFromSearch.length
              }
              updateSearch={this.updateSearch}
              updateSort={this.updateSort}
            />
            <div style={{ overflow: 'auto', maxHeight: 400 }}>
              <ReactList
                length={sortedNames.length}
                initialIndex={initialListIndex}
                type="uniform"
                itemRenderer={(index, key) => {
                  const typedName = sortedNames[index];
                  return (
                    <Name
                      id={`name-${key}`}
                      createdText={createdText}
                      key={`name-${index}`}
                      selected={typedName.name.id === selectedNameId}
                      showMoreDetails={() =>
                        openNameDetails(typedName, nameListType, index)
                      }
                      editProtectedCall={() =>
                        openEditProtectedNameCallDialog(typedName.name.id)
                      }
                      editProtectedMeeting={() =>
                        openEditProtectedNameMeetingDialog(typedName.name.id)
                      }
                      currentPath={currentPath}
                      {...typedName}
                    />
                  );
                }}
              />
            </div>
          </div>
        ) : (
          <Switch>
            <Route
              path="/account/names/unprotected"
              render={() => (
                <RaisedButton
                  containerElement={
                    <Link to="/account/names/unprotected/add" />
                  }
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
          </Switch>
        )}
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
  currentPath: state.routing.location.pathname,
  initialListIndex: state.name.initialListIndex,
});

const mapDispatchToProps = dispatch => ({
  openNameDetails: (name, selectedNameList, namePosition) =>
    dispatch(selectName(name, selectedNameList, namePosition)),
  openEditProtectedNameMeetingDialog: nameId =>
    dispatch(openEditProtectedNameMeetingDialog(nameId)),
  openEditProtectedNameCallDialog: nameId =>
    dispatch(openEditProtectedNameCallDialog(nameId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NamesList);
