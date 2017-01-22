import React from 'react';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import Avatar from 'material-ui/Avatar';
import PersonOutline from 'material-ui/svg-icons/social/person-outline';
import { cyan500 } from 'material-ui/styles/colors';

import GetUserProfile from './GetUserProfile.gql';
import {
  editProfileSuccess, cancelEditProfile
} from './profileActions';
import LoadingSpinner from '../shared/LoadingSpinner';
import ShowProfile from './ShowProfile';
import ShowCompany from './ShowCompany';
import EditProfile from './EditProfile';


const Profile = ({
  user, editingProfile, loading,
  onCancelEditProfile, onEditProfileSuccess, onEditProfilePasswordSuccess
}) => {
  if (loading) {
    return (
      <div className="container-fluid Profile">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container-fluid Profile">
      <div className="row">
        <div className="col-12 col-sm-6 push-sm-6 align-self-center">
          {
            editingProfile ?
              <EditProfile
                initialValues={user}
                handleCancelEditProfile={onCancelEditProfile}
                handleProfileSuccess={onEditProfileSuccess}
              />
            :
              <ShowProfile
                userId={user.id}
                firstName={user.firstName}
                lastName={user.lastName}
                phone={user.phone}
                email={user.email}
                createdAt={user.created_at}
                updatedAt={user.updated_at}
                onEditProfilePasswordSuccess={onEditProfilePasswordSuccess}
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
    </div>
  );
};

const ProfileWithData = graphql(GetUserProfile, {
  options: ({ id }) => ({ variables: { id } }),
  props: ({ ownProps, data: { loading, user } }) => ({
    loading,
    user,
    ...ownProps
  })
})(Profile);

const mapStateToProps = state => ({
  id: state.account.id,
  editingProfile: state.profile.editingProfile,
});

const mapDispatchToProps = dispatch => ({
  onEditProfileSuccess: () => dispatch(editProfileSuccess()),
  onCancelEditProfile: () => dispatch(cancelEditProfile()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileWithData);
