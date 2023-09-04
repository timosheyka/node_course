class AsyncOperationManager {
    simulateAsyncOperation(delay) {
        setTimeout(() => {
          console.log(`Async operation completed after ${delay} ms`);
          this.scheduleNextTick(setTimeout);
        }, delay);
      }
    
      scheduleImmediate() {
        setImmediate(() => {
          console.log("Immediate task executed");
          this.scheduleNextTick(setImmediate);
        });
      }

      scheduleNextTick(func) {
        process.nextTick(() => {
            console.log(`this message shows after the ${func.name}`);
        })
      }
}
  
const manager = new AsyncOperationManager();
manager.simulateAsyncOperation(200);
process.nextTick(() => {
  console.log("Microtask executed immediately");
});
manager.scheduleImmediate();
  