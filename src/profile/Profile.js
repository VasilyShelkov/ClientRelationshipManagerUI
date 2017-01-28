import React from 'react';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';

import GetUserProfile from './GetUserProfile.gql';
import LoadingSpinner from '../shared/LoadingSpinner';
import ShowProfileWithData from './details/ShowProfile';
import ShowCompanyWithData from './company/ShowCompany';

import { cancelEditProfile, cancelEditCompany } from './profileActions';
import EditProfile from './details/EditProfile';
import EditCompany from './company/EditCompany';

export const Profile = ({
  loading, user, editingProfile, editingCompany,
  onCancelEditProfile, onCancelEditCompany
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
              />
            :
              <ShowProfileWithData
                userId={user.id}
                firstName={user.firstName}
                lastName={user.lastName}
                phone={user.phone}
                email={user.email}
                updatedAt={user.updated_at}
              />
          }
        </div>

        <div className="col-12 col-sm-6 pull-sm-6 align-self-center">
          {
            editingCompany ?
              <EditCompany
                userId={user.id}
                initialValues={user.company}
                handleCancelEditCompany={onCancelEditCompany}
              />
            :
              <ShowCompanyWithData
                name={user.company.name}
                address={user.company.address}
                phone={user.company.phone}
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
  editingProfile: state.profile.editing.profile,
  editingCompany: state.profile.editing.company
});

const mapDispatchToProps = dispatch => ({
  onCancelEditProfile: () => dispatch(cancelEditProfile()),
  onCancelEditCompany: () => dispatch(cancelEditCompany())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileWithData);
