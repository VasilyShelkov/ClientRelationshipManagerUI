import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';

import BookCall from './BookCall.gql';
import BookMeeting from './BookMeeting.gql';
import GetNameComments from '../../../selected/comments/GetNameComments.gql';

import { onSubmitBookCall, onSubmitBookMeeting } from '../lockedMutations';
import { showNotification } from '../../../../app/appActions';
import LockedNamesListWithData from '../LockedNamesListWithData';

const LockedNamesWithMutations = compose(
  graphql(BookCall, {
    props: ({ ownProps, mutate }) => ({
      onSubmitBookCall: names =>
        onSubmitBookCall({
          mutate,
          userId: ownProps.userId,
          names,
          editCallDialogOpen: ownProps.editProtectedNameCallDialogOpen,
          nameListTypeIdKey: 'protectedId',
          performingNameAction: ownProps.performingNameAction,
          showErrorNotification: ownProps.showErrorNotification
        }),
      ...ownProps
    }),
    options: props => ({
      refetchQueries: [
        {
          query: GetNameComments,
          variables: {
            userId: props.userId,
            id: props.selectedNameId
          }
        }
      ]
    })
  }),
  graphql(BookMeeting, {
    props: ({ ownProps, mutate }) => ({
      onSubmitBookMeeting: names =>
        onSubmitBookMeeting({
          mutate,
          userId: ownProps.userId,
          names,
          editMeetingDialogOpen: ownProps.editProtectedNameMeetingDialogOpen,
          nameListTypeIdKey: 'protectedId',
          performingNameAction: ownProps.performingNameAction,
          showErrorNotification: ownProps.showErrorNotification
        }),
      ...ownProps
    }),
    options: props => ({
      refetchQueries: [
        {
          query: GetNameComments,
          variables: {
            userId: props.userId,
            id: props.selectedNameId
          }
        }
      ]
    })
  })
)(LockedNamesListWithData);

const mapStateToProps = state => ({
  userId: state.account.id,
  selectedNameId: state.selectedName.id,
  editProtectedNameCallDialogOpen: state.name.editProtectedNameCallDialogOpen,
  editProtectedNameMeetingDialogOpen: state.name.editProtectedNameMeetingDialogOpen
});

const mapDispatchToProps = dispatch => ({
  performingNameAction: message => dispatch(performingNameAction(message)),
  showErrorNotification: message => dispatch(showNotification(message, red500))
});

export default connect(mapStateToProps, mapDispatchToProps)(LockedNamesWithMutations);
