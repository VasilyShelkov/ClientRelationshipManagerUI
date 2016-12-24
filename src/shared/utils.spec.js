import * as utils from './utils';

describe('src/utils', () => {
  it('returns falsey when none of the fields to edit are different to the original object', () => {
    const originalObject = {
      fieldOne: 'originalFieldOne',
      fieldTwo: 'originalFieldTwo'
    };

    const fieldsToEdit = originalObject;

    expect(utils.checkIfAnyKeysDifferent(originalObject, fieldsToEdit)).toEqual(0);
  });


  it('returns truthy when some fields to edit are different to the original object', () => {
    const originalObject = {
      fieldOne: 'originalFieldOne',
      fieldTwo: 'originalFieldTwo'
    };

    const fieldsToEdit = {
      ...originalObject,
      fieldTwo: 'newFieldTwo'
    };

    expect(utils.checkIfAnyKeysDifferent(originalObject, fieldsToEdit)).toEqual(1);
  });
});
