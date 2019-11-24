import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { graphql } from 'react-apollo';
import _ from 'lodash';
import { loader } from 'graphql.macro';

import { changeShownUserProfile } from '../profile/profileActions';
import AddUser from './AddUser';

const CreateUser = loader('./CreateUser.gql');
const GetUserCompany = loader('./GetUserCompany.gql');

const AddUserFormWithCompanyData = graphql(CreateUser, {
  props: ({ ownProps, mutate }) => ({
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      setSubmitting(true);
      if (values.password === values.confirmPassword) {
        const { id, __typename, ...companyFields } = ownProps.user.company;

        const {
          confirmPassword,
          firstName,
          lastName,
          isAdmin,
          ...otherValues
        } = values;
        const userFields = {
          firstName: _.upperFirst(firstName.trim()),
          lastName: _.upperFirst(lastName.trim()),
          accountType: isAdmin ? 'admin' : 'member',
          ...otherValues,
        };

        try {
          const mutationResponse = await mutate({
            variables: { ...userFields, companyFields },
          });
          setSubmitting(false);
          ownProps.showNewProfile({
            currentUserId: ownProps.id,
            ...mutationResponse.data.createUser,
          });
          ownProps.onAddUserSuccess(mutationResponse.data.createUser);
        } catch (error) {
          setSubmitting(false);
          setStatus(error.graphQLErrors[0].message);
        }
      } else {
        setSubmitting(false);
        setStatus('Passwords do not match');
      }
    },
    ...ownProps,
  }),
})(AddUser);

const AddUserFormWithProfileData = graphql(GetUserCompany, {
  options: ({ id }) => ({ variables: { id } }),
  props: ({ ownProps, data: { loading, user } }) => ({
    queryLoading: loading,
    user,
    ...ownProps,
  }),
})(AddUserFormWithCompanyData);

const mapStateToProps = state => ({
  id: state.account.id,
  creatingUser: state.creatingUser,
});

const mapDispatchToProps = dispatch => ({
  showNewProfile: ({ currentUserId, id, firstName, lastName }) => {
    dispatch(
      changeShownUserProfile({
        currentUserId,
        userIdToShow: id,
        isNewUser: true,
      }),
    );
    dispatch(
      push(`/account/users/${_.camelCase(`${firstName} ${lastName}`)}/profile`),
    );
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddUserFormWithProfileData);
