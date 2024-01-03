const { fn } = require("../js/function");

describe("the funtion be called", () => {
  beforeAll(() => {
    console.log("beforeAll");
  });
  afterAll(() => {
    console.log("afterAll");
  });
  beforeEach(() => {
    console.log("beforeEach");
  });
  afterEach(() => {
    console.log("afterEach");
  });
  test("fn", () => {
    const f = jest.fn();
    fn(f);

    console.log(f.mock.calls);
    console.log(f.mock.calls[0][0]);
    expect(f.mock.calls[0][0]).toBe(1);
  });
});
