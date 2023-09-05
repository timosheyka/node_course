const promiseAll_1 = async (promise_array) => {
  const result = [];
  for (const promise of promise_array) {
    result.push(await promise);
  }
  return result;
}

function promiseAll(promise_array) {
  const results = [];
  return new Promise((resolve, reject) => {
    promise_array.forEach((promise, index) => {
      promise
        .then(result => {
          results[index] = result;
          if (results.length === promise_array.length) 
          { resolve(results); }
        })
        .catch(error => { reject(error);});
    });
  });
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