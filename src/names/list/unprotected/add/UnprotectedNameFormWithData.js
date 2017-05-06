import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { SubmissionError } from 'redux-form';

import GetAllCompanies from '../../../GetAllCompanies.gql';
import CreateUnprotectedName from './CreateUnprotectedName.gql';
import AddUnprotectedNameForm from './UnprotectedNameForm';
import { hideCreateNameForm } from '../../nameListActions';

const AddUnprotectedNameWithCompanyData = compose(
  graphql(CreateUnprotectedName, {
    props: ({ ownProps, mutate }) => ({
      onSubmit: async values => {
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
        } catch (error) {
          throw new SubmissionError({ _error: error.graphQLErrors[0].message });
        }
      },
      ...ownProps
    })
  }),
  graphql(GetAllCompanies, {
    props: ({ ownProps, data: { loading, companies } }) => ({
      loading,
      existingCompanies: companies,
      ...ownProps
    })
  })
)(AddUnprotectedNameForm);

const mapStateToProps = state => ({
  id: state.account.id
});

const mapDispatchToProps = dispatch => ({
  cancelCreateName: () => dispatch(hideCreateNameForm())
});

export default connect(mapStateToProps, mapDispatchToProps)(AddUnprotectedNameWithCompanyData);
