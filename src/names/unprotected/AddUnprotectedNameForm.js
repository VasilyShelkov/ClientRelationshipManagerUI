import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { reduxForm, SubmissionError } from 'redux-form';
import _ from 'lodash';

import CreateUnprotectedName from './CreateUnprotectedName.gql';
import AddUnprotectedName from './AddUnprotectedName';
import { hideCreateNameForm } from '../nameActions';

const AddUnprotectedNameForm = reduxForm({ form: 'newName' })(AddUnprotectedName);

const AddUnprotectedNameWithCompanyData = graphql(CreateUnprotectedName, {
  props: ({ ownProps, mutate }) => ({
    onSubmit: async (values) => {
      const { companyName, companyAddress, companyPhone, ...nameDetails } = values;
      try {
        await mutate({
          variables: {
            userId: ownProps.id,
            ...nameDetails,
            companyFields: {
              name: companyName,
              address: companyAddress,
              phone: companyPhone
            }
          }
        });
        ownProps.createUnprotectedNameSuccess();
      } catch (error) {
        throw new SubmissionError({ _error: error.graphQLErrors[0].message });
      }
    },
    ...ownProps
  })
})(AddUnprotectedNameForm);

const mapStateToProps = state => ({
  id: state.account.id,
  creatingUnprotectedName: state.name.creating
});

const mapDispatchToProps = (dispatch) => {
  const handleCancel = () => dispatch(hideCreateNameForm());
  return {
    handleCancel,
    createUnprotectedNameSuccess: () => {
      handleCancel();
      // show notification of sorts
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddUnprotectedNameWithCompanyData);
