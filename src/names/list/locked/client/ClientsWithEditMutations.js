import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { red500 } from 'material-ui/styles/colors';
import { loader } from 'graphql.macro';

import { onSubmitBookCall, onSubmitBookMeeting } from '../lockedMutations';
import { performingNameAction } from '../../../nameActions';
import { showNotification } from '../../../../app/appActions';
import NamesList from '../../NamesList';

const BookClientCall = loader('./BookCall.gql');
const BookClientMeeting = loader('./BookMeeting.gql');
const GetNameComments = loader(
  '../../../selected/comments/GetNameComments.gql',
);
const ClientsWithEditMutations = compose(
  graphql(BookClientCall, {
    props: ({ ownProps, mutate }) => ({
      onSubmitBookCall: onSubmitBookCall({
        mutate,
        userId: ownProps.id,
        names: ownProps.names,
        nameListTypeIdKey: 'clientId',
        performingNameAction: ownProps.performingNameAction,
        showErrorNotification: ownProps.showErrorNotification,
      }),
      ...ownProps,
    }),
    options: props => ({
      refetchQueries: [
        {
          query: GetNameComments,
          variables: {
            userId: props.id,
            id: props.selectedNameId,
          },
        },
      ],
    }),
  }),
  graphql(BookClientMeeting, {
    props: ({ ownProps, mutate }) => ({
      onSubmitBookMeeting: onSubmitBookMeeting({
        mutate,
        userId: ownProps.id,
        names: ownProps.names,
        nameListTypeIdKey: 'clientId',
        performingNameAction: ownProps.performingNameAction,
        showErrorNotification: ownProps.showErrorNotification,
      }),
      ...ownProps,
    }),
    options: props => ({
      refetchQueries: [
        {
          query: GetNameComments,
          variables: {
            userId: props.id,
            id: props.selectedNameId,
          },
        },
      ],
    }),
  }),
)(NamesList);

const mapStateToProps = state => ({
  selectedNameId: state.selectedName.nameId,
});

const mapDispatchToProps = dispatch => ({
  performingNameAction: message => dispatch(performingNameAction(message)),
  showErrorNotification: message => dispatch(showNotification(message, red500)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClientsWithEditMutations);
