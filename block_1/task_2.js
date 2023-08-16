const keywords = ["JavaScript", "template", "tagged"];  
const template = "Learn \${0} tagged templates to create custom \${1} literals for \${2} manipulation.";  

function highlightKeywords(string, array) {
    const span_start = "<span class='highlight'>", span_end = "</span>";
    const elements = array.map(element => span_start + element + span_end);
    return string.replace(/\$\{(\d+)\}/g, (match, number) => {
        const index = parseInt(number);
        if (index >= 0 && index < 3) { return elements[index]; }
    });
}

const highlighted = highlightKeywords(template, keywords);  
  
console.log(highlighted);

const Expected = "Learn <span class='highlight'>JavaScript</span> tagged templates to create custom <span class='highlight'>template</span> literals for <span class='highlight'>tagged</span> manipulation.";
console.log(highlighted === Expected);