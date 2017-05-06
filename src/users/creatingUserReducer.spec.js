import creatingUserReducer from './creatingUserReducer';
import { APOLLO_MUTATION_INIT, APOLLO_MUTATION_RESULT } from '../app/thirdPartyActions';

describe('src/users/AddUser.js', () => {
  it('returns creating user when apollo mutation init', () => {
    const stateBefore = false;
    const action = { type: APOLLO_MUTATION_INIT, operationName: 'CreateUser' };
    expect(creatingUserReducer(stateBefore, action)).to.equal(true);
  });

  it('returns state before when apollo mutation init for different operation', () => {
    const stateBefore = false;
    const action = { type: APOLLO_MUTATION_INIT, operationName: 'randomOperation' };
    expect(creatingUserReducer(stateBefore, action)).to.equal(stateBefore);
  });

  it('returns finished creating user when apollo mutation response', () => {
    const stateBefore = true;
    const action = { type: APOLLO_MUTATION_RESULT, operationName: 'CreateUser' };
    expect(creatingUserReducer(stateBefore, action)).to.equal(false);
  });

  it('returns state before when apollo mutation response is for different operation', () => {
    const stateBefore = true;
    const action = { type: APOLLO_MUTATION_RESULT, operationName: 'randomOperation' };
    expect(creatingUserReducer(stateBefore, action)).to.equal(stateBefore);
  });
});
