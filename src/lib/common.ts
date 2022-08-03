/**
 * Deep clone an object.
 * @param obj Object to clone.
 * @returns Deep cloned object.
 */
export const deepClone = (obj: any) => {
  const newObj: any = {};
  for (const key in obj) {
    if (Array.isArray(obj[key])) {
      const newArr = [];
      obj[key].forEach((val) => {
        if (typeof val === "object") newArr.push(deepClone(val));
        else newArr.push(val);
      });
      newObj[key] = newArr;
      continue;
    }
    if (typeof obj[key] === "object" && !obj[key].tagName) {
      newObj[key] = deepClone(obj[key]);
      continue;
    }
    newObj[key] = obj[key];
  }
  return newObj;
};

/**
 * Evaluate an expression.
 * @param expression Expression to evaluate its value.
 * @param extraContext Some extra context to inject.
 * @param shouldExecuate Whether or not to execuate the generated function.
 * @returns Evaluated result or error message.
 */
export const evaluate = (
  expression: string,
  extraContext = {},
  shouldExecuate = true
) => {
  let extraContextEval = "";
  for (const key in extraContext) {
    extraContextEval += `const ${key} = ${
      typeof extraContext[key] === "string"
        ? '"' + extraContext[key] + '"'
        : JSON.stringify(extraContext[key])
    }; `;
  }
  try {
    const func = Function(
      "ctx",
      `with(window.data) {${extraContextEval}; return ${expression};}`
    );
    return shouldExecuate ? func(extraContext) : func;
  } catch (e) {
    return e.toString();
  }
};
