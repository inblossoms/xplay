const { readFileSync } = require("node:fs");
const { resolve } = require("node:path");

const tagsList = JSON.parse(
  readFileSync(resolve(__dirname, "data/tags.json"), "utf8")
);

const typesList = JSON.parse(
  readFileSync(resolve(__dirname, "data/types.json"), "utf8")
);

const eventsList = JSON.parse(
  readFileSync(resolve(__dirname, "data/events.json"), "utf8")
);
module.exports = function (filename, filejson) {
  const data = {
    state: {},
    props: {},
    computed: {},
    methods: {},
  };
  // 1. 编译 fileJSON
  // 在解析 fileJson 的时候，把数据写入到 data 中。
  const template = compileTpl(data, filejson);
  const { script, handler, states } = compileScript(data);
  console.log(script, "\n======", handler, "\n======", states);

  // 2. 写入文件：output / Counter
  // 3. 创建 Counter 组件：handler.js states.js index.js
};

function compileTpl(data, json) {
  const { tag, classes, props, states, computed, text, methods, children } =
    json;

  if (!tagsList.includes(tag)) {
    throw new Error(`Unknown Element: ${tag} does not exist!`);
  }

  let html = `<${tag}`;

  if (classes) {
    html += ` class="${classes.join(" ")}"`;
  }

  if (methods) {
    for (const ev in methods) {
      if (!eventsList.includes(ev)) {
        throw new Error(`Unknown Event: ${ev} does not exist!`);
      }
      let events = methods[ev];
      html += ` @${ev}="${Object.keys(events).join(",")}"`;

      data.methods = {
        ...data.methods,
        ...events,
      };
    }
  }

  // 闭合元素标签
  html += `>`;

  if (text) {
    html += text;
  }

  if (props) {
    html += `{{ ${Object.keys(props)} }}`;

    for (const key in props) {
      data.props[key] = props[key];
    }
  }

  if (states) {
    // TODO 如果多个属性，你可能需要考虑为每一个属性都需要使用插值语法，或者多个属性使用同一个插值。
    // <div>{{ count }}</div>
    html += `{{ ${Object.keys(states)} }}`;
    for (const key in states) {
      data.state[key] = states[key];
    }
  }

  if (computed) {
    for (const key in computed) {
      html += `{{ ${key} }}`;

      data.computed[key] = computed[key];
    }
  }

  if (children) {
    for (let i = 0, len = children.length; i < len; i++) {
      const child = children[i];
      html += compileTpl(data, child);
    }
  }

  html += `</${tag}>`;

  return html;
}

function compileScript(data) {
  const { props, state, computed, methods } = data,
    computed_deps = [];
  let script = "";

  let handler = "";
  script += `import { ${Object.keys(methods).join(
    ","
  )} } from "./handler.js";\n`;

  for (const m in methods) {
    if (Object.hasOwnProperty.call(methods, m)) {
      const fb = methods[m];

      for (const s in state) {
        if (Object.hasOwnProperty.call(state, s)) {
          if (fb.includes(s)) {
            handler += `import { ${s} } from "./handler.js";\n`;
          }
        }
      }

      handler += `export const ${m} = () => {
			${fb};
	  };`;
    }
  }

  let states = "";
  script += `import { ${Object.keys(state).join(",")} } from "./states.js";\n`;
  for (const s in state) {
    if (Object.hasOwnProperty.call(state, s)) {
      const sv = state[s];
      states += `export const ${s} = ref(${sv})\n;`;
    }
  }

  if (Object.keys(computed).length) {
    computed_deps.push("computed");
  }
  script += `import { ${computed_deps.join(",")} } from "vue";\n`;
  script += `const props = defineProps({
	 ${Object.keys(props).reduce((prev, curr) => {
     if (!typesList.includes(props[curr])) {
       throw new Error(`Unknown Type: ${pv} does not exist!`);
     }
     prev += `${curr}:${props[curr]},\n`;
     return prev;
   }, "")},
  });\n`;

  for (const c in computed) {
    if (Object.hasOwnProperty.call(computed, c)) {
      const fb = computed[c];
      script += `const ${c} = computed(() => {
		${fb};
	  };\n`;
    }
  }

  return {
    script,
    states,
    handler,
  };
}
