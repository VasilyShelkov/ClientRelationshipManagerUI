import React from 'react';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import PersonOutline from 'material-ui/svg-icons/social/person-outline';
import { cyan500 } from 'material-ui/styles/colors';

import GetUserProfile from './GetUserProfile.gql';
import LoadingSpinner from '../shared/LoadingSpinner';
import ShowProfile from './ShowProfile';
import ShowCompany from './ShowCompany';

import {
  editProfileSuccess, cancelEditProfile,
  editCompanySuccess, cancelEditCompany
} from './profileActions';
import EditProfile from './edit/EditProfile';
import EditCompany from './edit/EditCompany';

const Profile = ({
  user, editingProfile, editingCompany, loading,
  onCancelEditProfile, onEditProfileSuccess,
  onCancelEditCompany, onEditCompanySuccess
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
                handleEditProfileSuccess={onEditProfileSuccess}
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
              />
          }
        </div>

        <div className="col-12 col-sm-6 pull-sm-6 align-self-center">
          {
            editingCompany ?
              <EditCompany 
                userId={user.id}
                firstName={user.firstName}
                initialValues={user.company}
                handleCancelEditCompany={onCancelEditCompany}
                handleEditCompanySuccess={onEditCompanySuccess}
              />
            :
              <ShowCompany
                name={user.company.name}
                address={user.company.address}
                phone={user.company.phone}
                createdAt={user.company.created_at}
                updatedAt={user.company.updated_at}
              />
          }
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
  editingCompany: state.profile.editingCompany
});

const mapDispatchToProps = dispatch => ({
  onEditProfileSuccess: () => dispatch(editProfileSuccess()),
  onCancelEditProfile: () => dispatch(cancelEditProfile()),
  onEditCompanySuccess: () => dispatch(editCompanySuccess()),
  onCancelEditCompany: () => dispatch(cancelEditCompany())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileWithData);
