import React from 'react';
import { connect } from 'react-redux';

import { cancelEditCompany } from '../profileActions';

import ShowCompanyWithData from './ShowCompany';
import { EDIT_IN_PROGRESS } from '../profileReducer';
import EditCompany from './EditCompany';

export const Company = ({
  user, display, editingCompany, onCancelEditCompany
}) => (
  display ?
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
  :
    null
);

const mapStateToProps = state => ({ editingCompany: state.profile.editing.company });

const mapDispatchToProps = dispatch => ({
  onCancelEditCompany: () => dispatch(cancelEditCompany())
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(Company);
