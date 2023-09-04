const promiseAll = async (promise_array) => {
  const result = [];
  for (const promise of promise_array) {
    result.push(await promise);
  }
  return result;
}

const promises = [
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.resolve(3)
];
  
promiseAll(promises)
    .then(results => {
      console.log("All promises resolved:", results); // Expected: [1, 2, 3]
    })
    .catch(error => {
      console.error("At least one promise rejected:", error);
    });