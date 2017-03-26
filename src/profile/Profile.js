import React from 'react';

import LoadingSpinner from '../shared/LoadingSpinner';
import ShowProfileWithData from './details/ShowProfile';
import ShowCompanyWithData from './company/ShowCompany';

import { EDIT_IN_PROGRESS } from './profileReducer';
import EditProfile from './details/EditProfile';
import EditCompany from './company/EditCompany';

export default ({
  loading, user, editingProfile, editingCompany,
  displayCompany, displayNewProfileNotification,
  onCancelEditProfile, onCancelEditCompany
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

        {
          displayCompany &&
          <div className="col-12 col-sm-6 pull-sm-6 align-self-center">
            {
              editingCompany ?
                <EditCompany
                  userId={user.id}
                  initialValues={user.company}
                  handleCancelEditCompany={onCancelEditCompany}
                  editInProgess={editingCompany === EDIT_IN_PROGRESS}
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
        }
      </div>
    </div>
  );
};

