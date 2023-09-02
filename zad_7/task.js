class AsyncOperationManager {
    simulateAsyncOperation(delay) {
      setTimeout(() => {
        console.log(`Timeout ${delay} ms`);
      }, delay);
    }
  
    scheduleImmediate() {
      setImmediate(() => {
        console.log("Immediate");
      });
    }
}
  
function asyncScenario() {
    const manager = new AsyncOperationManager();

    // macro-task - first on web-api, but third in macro-task queue
    manager.simulateAsyncOperation(3000); // (6)

    // micro-task - first in micro-task queue
    process.nextTick(() => { console.log("Tick"); }); // (2)

    // sync function - executed first
    console.log("Console Log"); // (1)

    // macro-task - second on web-api, but first in macro-task queue
    manager.scheduleImmediate(); // (5)

    // micro-task - second in micro-task queue
    Promise.resolve()
    .then(() => {
            console.log("Promise 1"); // (3)
    });

    // macro-task - third on web-api,  but second in macro-task queue
    setTimeout(() => {
        console.log("Timeout 1000 ms"); // (7)
    }, 1000);

    // micro-task - third in micro-task queue
    Promise.resolve()
    .then(() => {
            console.log("Promise 2"); // (4)
    });
}

asyncScenario();