function throttle(func, interval) {
    let wait = false
    return function(...args) {
        if (!wait) {
            func.apply(this, args)
            wait = true
            setTimeout(function () { wait = false }, interval)
        }
    }
}

function onScroll(event) {
    console.log("Scroll event:", event); // Handle scroll event
}

const throttledScrollHandler = throttle(onScroll, 2000);      
window.addEventListener("scroll", throttledScrollHandler);