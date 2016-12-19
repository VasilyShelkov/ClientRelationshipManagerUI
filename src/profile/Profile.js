import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import LoadingSpinner from '../LoadingSpinner';

const Profile = ({ loading, user }) => (
  <div>
    {
      loading ?
        <LoadingSpinner />
      :
        <div>
          First name: {user.firstName}
          Last name: {user.lastName}
          <br />
          Email: {user.email}
          <br />
          phone: {user.phone}
          <br />
          accountType: {user.accountType}
          approved: {user.approved}
        </div>
    }
  </div>
);

const userData = gql`
  query($userId: String!) {
    users(userId: $userId) {
      firstName,
      lastName,
      email,
      accountType,
      phone,
      approved,
    }
  }
`;

const ProfileWithData = graphql(userData, {
  options: ({ userId }) => ({ variables: { userId } }),
  props: ({ data: { loading, users } }) => ({
    loading,
    user: users && users[0]
  }),
})(Profile);

const mapStateToProps = state => ({
  userId: state.account.userId
});

export default connect(mapStateToProps)(ProfileWithData);
