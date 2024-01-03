const fs = require("fs");
const { read } = require("../js/jestmock");

jest.mock("fs");
describe("jestmock: fs mock", () => {
  test("read", () => {
    fs.readFileSync.mockReturnValue('{"version":"1.0.0"}');
    expect(read()).toBe(111);

    fs.readFileSync.mockReturnValue('{"version":"2.0.0"}');
    expect(read()).toBe(222);
  });
});
