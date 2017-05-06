import { props, reducer } from './AdminUserListWithData';
import { APOLLO_MUTATION_RESULT } from '../thirdPartyActions';

describe('src/navigation/AdminUserListWithData', () => {
  describe('props after query', () => {
    it('sends no users when loading', () => {
      const actualProps = props({ data: { loading: true } });
      expect(actualProps).to.deep.equal({
        loading: true,
        users: []
      });
    });

    it('sends users without passed in user', () => {
      const currentUserId = '2';
      const currentUser = { id: currentUserId };
      const expectedUsers = [
        {
          id: '1'
        },
        {
          id: '3'
        }
      ];
      const usersWithSelf = [...expectedUsers, currentUser];
      const actualProps = props({
        ownProps: { currentUserId },
        data: { loading: false, users: usersWithSelf }
      });

      expect(actualProps.users).length.to.be(2);
      expect(actualProps).to.deep.equal({
        loading: false,
        users: expectedUsers,
        currentUserId
      });
    });
  });

  describe('reducer that changes store after mutation', () => {
    it('returns previous state if was not an APOLLO_MUTATION_RESULT', () => {
      const previousState = [{ id: '1' }];
      const action = { type: 'RANDOM_TEST_ACTION' };
      expect(reducer(previousState, action)).to.equal(previousState);
    });

    it('returns previous state if was APOLLO_MUTATION_RESULT that did not create a new user', () => {
      const previousState = { users: [{ id: '1' }] };
      const action = { type: APOLLO_MUTATION_RESULT, operationName: 'AddName' };
      expect(reducer(previousState, action)).to.equal(previousState);
    });

    it('returns previous state when there is no data', () => {
      const previousState = { users: [{ id: '1' }] };
      const action = {
        type: APOLLO_MUTATION_RESULT,
        operationName: 'CreateUser',
        result: { data: null }
      };

      expect(reducer(previousState, action)).to.deep.equal(previousState);
    });

    it('returns previous state when there is no data and errors', () => {
      const previousState = { users: [{ id: '1' }] };
      const action = {
        type: APOLLO_MUTATION_RESULT,
        operationName: 'CreateUser',
        result: { data: null, errors: [] }
      };

      expect(reducer(previousState, action)).to.deep.equal(previousState);
    });

    it('returns the list with a newly new user', () => {
      const previousState = { users: [{ id: '1' }] };
      const action = {
        type: APOLLO_MUTATION_RESULT,
        operationName: 'CreateUser',
        result: { data: { createUser: { id: '2' } } }
      };

      expect(reducer(previousState, action)).to.deep.equal({
        users: [
          {
            id: '1'
          },
          {
            id: '2'
          }
        ]
      });
    });
  });
});
