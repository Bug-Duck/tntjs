const deepClone = (obj) => {
    const newObj = {};
    for (const key in obj) {
        if (Array.isArray(obj[key])) {
            const newArr = [];
            obj[key].forEach((val) => {
                if (typeof val === "object")
                    newArr.push(deepClone(val));
                else
                    newArr.push(val);
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
const evaluate = (expression, extraContext = {}, shouldExecuate = true) => {
    let extraContextEval = "";
    for (const key in extraContext) {
        extraContextEval += `const ${key} = ${typeof extraContext[key] === "string"
            ? '"' + extraContext[key] + '"'
            : JSON.stringify(extraContext[key])}; `;
    }
    try {
        const func = Function("ctx", `with(window.data) {${extraContextEval}; return ${expression};}`);
        return shouldExecuate ? func(extraContext) : func;
    }
    catch (e) {
        return e.toString();
    }
};

export { deepClone, evaluate };
//# sourceMappingURL=common.js.map
