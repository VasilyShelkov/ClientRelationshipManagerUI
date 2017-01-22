import React from 'react';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import Avatar from 'material-ui/Avatar';
import PersonOutline from 'material-ui/svg-icons/social/person-outline';
import { cyan500 } from 'material-ui/styles/colors';

import GetUserProfile from './GetUserProfile.gql';
import EditUserDetails from './EditUserDetails.gql';
import {
  editProfileSuccess, cancelEditProfile, editProfilePasswordSuccess
} from './profileActions';
import LoadingSpinner from '../shared/LoadingSpinner';
import ShowProfile from './ShowProfile';
import ShowCompany from './ShowCompany';
import EditProfile from './EditProfile';

import { checkIfAnyKeysDifferent } from '../shared/utils';

const getProfile = ({
  user, editingProfile, loading, onCancelEditProfile, saveProfile
}) => {
  if (loading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <div className="row">
      <div className="col-12 col-sm-6 push-sm-6 align-self-center">
        {
          editingProfile ?
            <EditProfile
              initialValues={user}
              onSubmit={saveProfile(user)}
              handleCancelEditProfile={onCancelEditProfile}
            />
          :
            <ShowProfile
              firstName={user.firstName}
              lastName={user.lastName}
              phone={user.phone}
              email={user.email}
              createdAt={user.created_at}
              updatedAt={user.updated_at}
            />
        }
      </div>

      <div className="col-12 col-sm-6 pull-sm-6 align-self-center">
        <ShowCompany
          name={user.company.name}
          address={user.company.address}
          phone={user.company.phone}
          createdAt={user.company.created_at}
          updatedAt={user.company.updated_at}
        />
      </div>
    </div>
  );
};

const Profile = ({
  loading, user, editingProfile, onCancelEditProfile, saveProfile
}) => (
  <div className="container-fluid Profile">
    {
      getProfile({
        user, editingProfile, loading, onCancelEditProfile, saveProfile
      })
    }
  </div>
);

const ProfileWithData = compose(
  graphql(GetUserProfile, {
    options: ({ id }) => ({ variables: { id } }),
    props: ({ ownProps, data: { loading, user } }) => ({
      loading,
      user,
      ...ownProps
    })
  }),
  graphql(EditUserDetails, {
    props: ({ ownProps, mutate }) => ({
      saveProfile: initialValues => values => {
        if (checkIfAnyKeysDifferent(initialValues, values) > 0) {
          try {
            mutate({
              variables: { id: initialValues.id, ...values }
            });
          } catch (error) {
            throw new SubmissionError({ _error: error });
          }

          return ownProps.onEditProfileSuccess();
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
  id: state.account.id,
  editingProfile: state.profile.editingProfile,
});

const mapDispatchToProps = dispatch => ({
  onEditProfileSuccess: () => dispatch(editProfileSuccess()),
  onCancelEditProfile: () => dispatch(cancelEditProfile()),
  onEditProfilePasswordSuccess: () => dispatch(editProfilePasswordSuccess()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileWithData);
