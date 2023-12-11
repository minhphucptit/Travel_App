import { checkInput } from '../js/inputCheck.js';

describe('Test Regex', function () {
  it('Input should be a string', function () {
    const urlRGEX = /^[a-zA-Z\s]{0,255}$/;
    const urlTest = 'L0nd0n';
    expect(urlRGEX.test(urlTest)).toBe(false);
  });
});

export { checkInput }