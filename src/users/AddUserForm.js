import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { graphql } from 'react-apollo';
import { reduxForm, SubmissionError, formValueSelector } from 'redux-form';
import _ from 'lodash';

import { changeShownUserProfile } from '../profile/profileActions';
import CreateUser from './CreateUser.gql';
import GetUserCompany from './GetUserCompany.gql';
import AddUser from './AddUser';

const selector = formValueSelector('newUser');

const AddUserWithFormSelector = connect(state => ({
  currentProtectedNamesLimit: selector(state, 'protectedNamesLimit')
}))(AddUser);

const AddUserForm = reduxForm({
  form: 'newUser',
  initialValues: { protectedNamesLimit: 150 }
})(AddUserWithFormSelector);

const AddUserFormWithCompanyData = graphql(CreateUser, {
  props: ({ ownProps, mutate }) => ({
    onSubmit: async values => {
      if (values.password === values.confirmPassword) {
        const { id, __typename, ...companyFields } = ownProps.user.company;

        const { confirmPassword, firstName, lastName, accountType, ...otherValues } = values;
        const userFields = {
          firstName: _.upperFirst(firstName.trim()),
          lastName: _.upperFirst(lastName.trim()),
          accountType: accountType ? 'admin' : 'member',
          ...otherValues
        };

        try {
          const mutationResponse = await mutate({ variables: { ...userFields, companyFields } });
          ownProps.showNewProfile({
            currentUserId: ownProps.id,
            ...mutationResponse.data.createUser
          });
        } catch (error) {
          throw new SubmissionError({ _error: error.graphQLErrors[0].message });
        }
      } else {
        throw new SubmissionError({
          _error: 'Passwords do not match'
        });
      }
    },
    ...ownProps
  })
})(AddUserForm);

const AddUserFormWithProfileData = graphql(GetUserCompany, {
  options: ({ id }) => ({ variables: { id } }),
  props: ({ ownProps, data: { loading, user } }) => ({
    queryLoading: loading,
    user,
    ...ownProps
  })
})(AddUserFormWithCompanyData);

const mapStateToProps = state => ({
  id: state.account.id,
  creatingUser: state.creatingUser
});

const mapDispatchToProps = dispatch => ({
  showNewProfile: ({ currentUserId, id, firstName, lastName }) => {
    dispatch(changeShownUserProfile({ currentUserId, userIdToShow: id, isNewUser: true }));
    dispatch(push(`/account/users/${_.camelCase(`${firstName} ${lastName}`)}/profile`));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddUserFormWithProfileData);
