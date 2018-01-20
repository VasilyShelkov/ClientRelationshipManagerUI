import { graphql } from 'react-apollo';
import { connect } from 'react-redux';

import GetUserProfile from './GetUserProfile.gql';
import { cancelEditProfile } from './profileActions';
import Profile from './Profile';

const ProfileWithData = graphql(GetUserProfile, {
  options: ({ id }) => ({ variables: { id } }),
  props: ({ ownProps, data: { loading, user } }) => ({
    loading,
    user,
    ...ownProps,
  }),
})(Profile);

const mapStateToProps = state => ({
  id: state.profile.id,
  editingProfile: state.profile.editing.profile,
  displayCompany: state.profile.display.company,
  displayNewProfileNotification: state.profile.display.newProfileNotification,
});

const mapDispatchToProps = dispatch => ({
  onCancelEditProfile: () => dispatch(cancelEditProfile()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileWithData);
