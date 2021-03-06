import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { graphql, compose } from 'react-apollo';
import { SubmissionError } from 'redux-form';
import _ from 'lodash';
import { loader } from 'graphql.macro';

import AddUnprotectedNameForm from './UnprotectedNameForm';
import { selectName } from '../../../selected/selectedActions';

const GetAllCompanies = loader('../../../GetAllCompanies.gql');
const CreateUnprotectedName = loader('./CreateUnprotectedName.gql');
const GetUserNamesCount = loader('../../../GetUserNamesCount.gql');
const AddUnprotectedNameWithCompanyData = compose(
  graphql(CreateUnprotectedName, {
    props: ({ ownProps, mutate }) => ({
      onSubmit: async values => {
        const {
          companyName,
          companyAddress,
          companyPhone,
          ...nameDetails
        } = values;
        const { createUnprotectedNameSuccess } = ownProps;
        try {
          const unprotectedName = await mutate({
            variables: {
              userId: ownProps.id,
              ...nameDetails,
              companyFields: {
                name: companyName,
                address: companyAddress,
                phone: companyPhone,
              },
            },
          });
          createUnprotectedNameSuccess(
            _.get(unprotectedName, 'data.addUnprotectedNameToUser'),
          );
        } catch (error) {
          throw new SubmissionError({ _error: error.graphQLErrors[0].message });
        }
      },
      ...ownProps,
    }),
    options: props => ({
      refetchQueries: [
        {
          query: GetUserNamesCount,
          variables: {
            id: props.id,
          },
        },
      ],
    }),
  }),
  graphql(GetAllCompanies, {
    props: ({ ownProps, data: { loading, companies } }) => ({
      loading,
      existingCompanies: companies,
      ...ownProps,
    }),
  }),
)(AddUnprotectedNameForm);

const mapStateToProps = state => ({
  id: state.account.id,
});

const mapDispatchToProps = dispatch => ({
  createUnprotectedNameSuccess: name =>
    dispatch(selectName(name, 'unprotected')),
  cancelAddUnprotectedName: () => dispatch(push('/account/names/unprotected')),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddUnprotectedNameWithCompanyData);
