import React from 'react';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';

import LockOpenIcon from 'material-ui/svg-icons/action/lock-open';
import Paper from 'material-ui/Paper';
import { cyan500 } from 'material-ui/styles/colors';
import LoadingSpinner from '../shared/LoadingSpinner';
import NamesList from './NamesList';

import GetUnprotectedNames from './GetUnprotectedNames.gql';

export const UnprotectedNames = ({ loading, names }) => (
  <div style={{ marginTop: '20px', }}>
    <div style={{ textAlign: 'center' }}>
      <LockOpenIcon style={{ height: '100px', width: '100px' }} color={cyan500} />
      <h2>Unprotected Names</h2>
    </div>
    <Paper>
      {
        loading ?
          <LoadingSpinner />
        :
          <NamesList names={names} />
      }
    </Paper>
  </div>
);

const UnprotectedNamesWithData = graphql(GetUnprotectedNames, {
  options: ({ id }) => ({ variables: { id } }),
  props: ({ ownProps, data: { loading, user } }) => ({
    loading,
    names: user && user.unprotected,
    ...ownProps
  })
})(UnprotectedNames);

const mapStateToProps = state => ({ id: state.profile.id });

const mapDispatchToProps = dispatch => ({ });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnprotectedNamesWithData);
