export  function mapValues(obj, fn) {
  return Object.keys(obj).reduce((result, key) => {
    result[key] = fn(obj[key], key);
    return result;
  }, {});
}


export function traverse(obj, fn) {
    fn(obj);
    for (let i of obj) {
        if (i && typeof i === 'object') {
            traverse(i, fn);
        }
    }
}