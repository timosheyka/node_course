function debounce(func, delay) {
    let timeout
    return function(...args) {
        const effect = () => {
            timeout = null
            return func.apply(this, args)
        }
    
        clearTimeout(timeout)
        timeout = setTimeout(effect, delay)
    }
}

const delay = 2000;

function debouncedSearch(query) {    
    console.log("Searching for:", "\'", query, "\'", "with", delay, "delay");  
}  
      
const debouncedSearchHandler = debounce(debouncedSearch, delay);  
      
const inputElement = document.getElementById("search-input");  
inputElement.addEventListener("input", event => {  
debouncedSearchHandler(event.target.value);  
});