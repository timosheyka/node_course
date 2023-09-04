function promiseAllSettled(promise_array) {
    return Promise.allSettled(promise_array);
}

function promiseAllSettled_1(promise_array) {
    return Promise.all(
        promise_array.map(promise => promise
            .then(value => ({ status: 'fulfilled', value }))
            .catch(reason => ({ status: 'rejected', reason }))
        ))
}

const promiseAllSettled_2 = async (promise_array) => {
    const result = [];
    for (const promise of promise_array) {
        try {
            const value = await promise;
            result.push({ status: 'fulfilled', value });
        } catch (reason) {
            result.push({ status: 'rejected', reason });
        }
    }
    return result;
}

const promises = [
    Promise.resolve(1),
    Promise.reject("Error occurred"),
    Promise.resolve(3)
];

promiseAllSettled_2(promises)
    .then(results => {
      console.log("All promises settled:", results);
      // Expected: [{ status: 'fulfilled', value: 1 },
      //            { status: 'rejected', reason: 'Error occurred' },
      //            { status: 'fulfilled', value: 3 }]
    });