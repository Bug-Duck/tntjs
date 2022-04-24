let x = {
    a: 1
};
function test(v,vared,name) {
    vared[name] = v;
};
test(5,x,'b');
console.log(x);