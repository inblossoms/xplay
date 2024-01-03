const vm = require("node:vm");

const ctx = {
  console,
  info: "omyjest",
};
vm.createContext(ctx);
vm.runInContext("console.log(info)", ctx);

// console.log(require.cache);
// jest 通过缓存的方式注入了其内部的众多 api, jest 注入 vm 的 require 是其自己实现的

// require.cache["fs"] = {
//   id: "fs",
//   filename: "fs",
//   loaded: true,
//   exports: {
//     readFileSync(filename) {
//       return "xxx";
//     },
//   },
// };
// const fs = require("fs");

// console.log(fs.readFileSync("./package.json"));

const vm = require("node:vm");
const fs = require("node:fs");

const testPath = process.argv.slice(2)[0];
const code = fs.readFileSync(testPath, { encoding: "utf8" });

const dispatch = (event) => {
  const { fn, type, name, pass } = event;
  switch (type) {
    case "ADD_TEST":
      const { testBlock } = global["STATE"];
      testBlock.push({ fn, name });
      break;
    case "BEFORE_EACH":
      const { beforeEachBlock } = global["STATE"];
      beforeEachBlock.push(fn);
      break;
    case "BEFORE_ALL":
      const { beforeAllBlock } = global["STATE"];
      beforeAllBlock.push(fn);
      break;
    case "AFTER_EACH":
      const { afterEachBlock } = global["STATE"];
      afterEachBlock.push(fn);
      break;
    case "AFTER_ALL":
      const { afterAllBlock } = global["STATE"];
      afterAllBlock.push(fn);
      break;
    case "COLLECT_REPORT":
      const { reports } = global["STATE"];
      reports.push({ name, pass });
      break;
  }
};

void (function createState() {
  global["STATE"] = {
    testBlock: [],
    beforeEachBlock: [],
    beforeAllBlock: [],
    afterEachBlock: [],
    afterAllBlock: [],
    reports: [],
  };
})();

const jest = {
  fn(impl = () => {}) {
    const mockFn = (...args) => {
      mockFn.mock.calls.push(args);
      return impl(...args);
    };
    mockFn.originImpl = impl;
    mockFn.mock = { calls: [] };
    return mockFn;
  },
  mock(mockPath, mockExports = {}) {
    const path = require.resolve(mockPath, { paths: ["."] });
    require.cache[path] = {
      id: path,
      filename: path,
      loaded: true,
      exports: mockExports,
    };
  },
};

const test = (name, fn) => dispatch({ type: "ADD_TEST", fn, name });
const afterAll = (fn) => dispatch({ type: "AFTER_ALL", fn });
const afterEach = (fn) => dispatch({ type: "AFTER_EACH", fn });
const beforeAll = (fn) => dispatch({ type: "BEFORE_ALL", fn });
const beforeEach = (fn) => dispatch({ type: "BEFORE_EACH", fn });

const expect = (actual) => ({
  toBe(expected) {
    if (actual !== expected) {
      throw new Error(`${actual} is not equal to ${expected}`);
    }
  },
  toBeGreaterThan(expected) {
    if (actual <= expected) {
      throw new Error(`${actual} is not greater than to ${expected}`);
    }
  },
});

const context = {
  console,
  jest,
  expect,
  require,
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  test,
};

(async () => {
  vm.createContext(context);
  vm.runInContext(code, context);

  const {
    testBlock,
    beforeEachBlock,
    beforeAllBlock,
    afterEachBlock,
    afterAllBlock,
  } = global["STATE"];

  for (let i = 0; i < beforeAllBlock.length; i++) {
    await beforeAllBlock[i]();
  }

  for (let i = 0; i < testBlock.length; i++) {
    const item = testBlock[i];
    const { fn, name } = item;
    try {
      await beforeEachBlock.map(async (beforeEach) => await beforeEach());

      await fn.apply(this);

      dispatch({ type: "COLLECT_REPORT", name, pass: 1 });

      await afterEachBlock.map(async (afterEach) => await afterEach());
      console.log(`${name} passed`);
    } catch (error) {
      dispatch({ type: "COLLECT_REPORT", name, pass: 0 });

      console.error(error);
      console.log(`${name} error`);
    }
  }

  for (let i = 0; i < afterAllBlock.length; i++) {
    await afterAllBlock[i]();
  }

  const { reports } = global["STATE"];

  let passNum = 0;
  reports.forEach((item) => {
    passNum += item.pass;
  });
  console.log(`All Tests: ${passNum}/${reports.length} passed`);
})();
