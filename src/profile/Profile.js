import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';

import { editProfile, cancelEditProfile } from './profileActions';
import LoadingSpinner from '../shared/LoadingSpinner';
import ShowProfile from './ShowProfile';
import EditProfile from './EditProfile';

import { checkIfAnyKeysDifferent } from '../shared/utils';

const getProfile = ({
  user, editing, loading, onEditProfile, onCancelEditProfile, saveProfile
}) => {
  if (loading) {
    return (
      <LoadingSpinner />
    );
  }

  if (editing) {
    return (
      <EditProfile
        initialValues={user}
        onSubmit={saveProfile(user)}
        handleCancelEditProfile={onCancelEditProfile}
      />
    );
  }

  return (
    <ShowProfile
      firstName={user.firstName}
      lastName={user.lastName}
      phone={user.phone}
      email={user.email}
      onEditProfile={onEditProfile}
    />
  );
};

const Profile = ({
  loading, user, editing, onEditProfile, onCancelEditProfile, saveProfile
}) => (
  <div>
    <h1 className="Profile__title">Profile</h1>
    <div>
      {
        getProfile({
          user, editing, loading, onEditProfile, onCancelEditProfile, saveProfile
        })
      }
    </div>
  </div>
);

const userData = gql`
  query($userId: String!) {
    users(userId: $userId) {
      userId
      firstName,
      lastName,
      email,
      phone,
      created_at,
      updated_at
    }
  }
`;

const editUser = gql`
  mutation(
    $userId: String!,
    $firstName: String,
    $lastName: String,
    $email: String,
    $phone: String
  ) {
    editUser(
      userId: $userId,
      firstName: $firstName,
      lastName: $lastName,
      email: $email,
      phone: $phone
    ) {
      firstName
      lastName
      email
      phone
      updated_at
    }
  }
`;

const ProfileWithData = compose(
  graphql(userData, {
    options: ({ userId }) => ({ variables: { userId } }),
    props: ({ ownProps, data: { loading, users } }) => ({
      loading,
      user: users && users[0],
      ...ownProps
    })
  }),
  graphql(editUser, {
    props: ({ ownProps, mutate }) => ({
      saveProfile: initialValues => values => {
        if (checkIfAnyKeysDifferent(initialValues, values) > 0) {
          try{
            mutate({
              variables: { userId: initialValues.userId, ...values }
            });
          } catch (error) {
            throw new SubmissionError({ _error: error });
          }
        }

        throw new SubmissionError({
          _error: 'Please change one of the profile fields to to update your profile...'
        });
      },
      ...ownProps
    })
  })
)(Profile);

const mapStateToProps = state => ({
  userId: state.account.userId,
  editing: state.profile.editing
});

const mapDispatchToProps = dispatch => ({
  onEditProfile: () => dispatch(editProfile()),
  onCancelEditProfile: () => dispatch(cancelEditProfile())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileWithData);
