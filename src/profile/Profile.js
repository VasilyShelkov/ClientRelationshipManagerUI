import React from 'react';

import LoadingSpinner from '../shared/LoadingSpinner';
import ShowProfileWithData from './details/ShowProfile';
import { EDIT_IN_PROGRESS } from './profileReducer';
import EditProfile from './details/EditProfile';
import CompanyProfile from './company/Company';

export default ({
  loading, user, editingProfile, displayCompany, onCancelEditProfile
}) => {
  if (loading) {
    return (
      <div className="container-fluid">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container-fluid Profile">
      <div className="row">
        <div className={`col-12 ${displayCompany && 'col-sm-6 push-sm-6 align-self-center'}`}>
          {
            editingProfile ?
              <EditProfile
                initialValues={user}
                handleCancelEditProfile={onCancelEditProfile}
                editInProgess={editingProfile === EDIT_IN_PROGRESS}
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
        <CompanyProfile user={user} display={displayCompany} />
      </div>
    </div>
  );
};

