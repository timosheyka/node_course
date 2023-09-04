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

/** Execution Flow Analysis:
 * micro-task (nextTick) is always executed before the macro-tasks
 * according to eventloop processing cycle
 * then in macro-task queue we have setTimeout and setImmediate
 * it appears that setImmediate completes faster due to delay in setTimeout,
 * so the eventloop execute ONLY ONE macro-task (setImmediate), 
 * after that next micro-task (nextTick) walks in 
 * (that means that eventloop must free the micro-task queue first
 * to process next macro-task)
 * only then next macro-task is executed and then the last Tick is executed.
 */
const manager = new AsyncOperationManager();
manager.simulateAsyncOperation(200);
process.nextTick(() => {
  console.log("Microtask executed immediately");
});
manager.scheduleImmediate();
  