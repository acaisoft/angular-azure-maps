import {arrayDiff, diff} from './arrayHelp';

describe('arrayDiff', () => {
  it('should return two empty array', function () {
    const result = arrayDiff([], []);

    expect(result).toEqual({
      added: [],
      deleted: [],
    });
  });
  it('should return empty added and 1 added value', function () {
    const result = arrayDiff([1, 2], [1]);

    expect(result).toEqual({
      added: [],
      deleted: [2],
    });

  });
  it('should return 1 deleted value and empty added', function () {
    const result = arrayDiff(['string', 'str'], ['str']);

    expect(result).toEqual({
      added: [],
      deleted: ['string'],
    });
  });

  it('should return empty deleted value and 1 added', function () {
    const result = arrayDiff(['str'], ['string', 'str']);

    expect(result).toEqual({
      added: ['string'],
      deleted: [],
    });
  });
  it('should return 1 deleted object and 2 object added', function () {
    const first = [{name: 'rom', type: 'das'}];
    const scnd = [{name: 'Tas', type: 'vgas'}, {name: 'htfda', type: 'wwa'}];
    const result = arrayDiff(first, scnd);

    expect(result).toEqual({
      added: [{name: 'Tas', type: 'vgas'}, {name: 'htfda', type: 'wwa'}],
      deleted: [{name: 'rom', type: 'das'}],
    });

  });
  it('should return 0 deleted object and 0 object added, object are equals', function () {
    const first = [{name: 'Tas', type: 'vgas'}, {name: 'htfda', type: 'wwa'}];
    const scnd = [{name: 'Tas', type: 'vgas'}, {name: 'htfda', type: 'wwa'}];
    const result = arrayDiff(first, scnd);

    expect(result).toEqual({
      added: [],
      deleted: []
    });

  });
  it('should return 0 deleted object and 0 object added, Objects are equals, but mixed', function () {
    const first = [{name: 'asdas', type: 'aasd'}, {name: 'htfda', type: 'wwa'}];
    const scnd = [{name: 'sadasd', type: 'wwa'}, {name: 'Tas', type: 'vgas'}];
    const result = diff(first, scnd);

    expect(result).toEqual({
      added: [],
      deleted: []
    });

  });
  it('should return 1 deleted object and 1 object added', function () {
    const first = [{name: 'rom', type: 'das'}, {name: 'dasd', type: 'daegfasds'}]; // old
    const scnd = [{name: 'rom', type: 'das'}, {name: 'htfda', type: 'wwa'}]; // new
    const result = arrayDiff(first, scnd);

    expect(result).toEqual({
      added: [{name: 'htfda', type: 'wwa'}],
      deleted: [{name: 'dasd', type: 'daegfasds'}],
    });
  });
});
