const translations = {  
	en: {  
	greet: "Hello",  
	intro: "Welcome to our website"  
},  
	fr: {  
	greet: "Bonjour",  
	intro: "Bienvenue sur notre site web"  
}  
};  

const language = "fr"; // Change to "en" for English  
const greeting = "greet";  
const introduction = "intro";  
  
function localize(strings, arg, obj = translations) {
    return obj[language][arg];
}

const localizedGreeting = localize`${greeting}`;  
const localizedIntroduction = localize`${introduction}`;  

console.log(localizedGreeting); // Expected: "Bonjour" (for language "fr")  
console.log(localizedIntroduction); // Expected: "Bienvenue sur notre site web" (for language "fr")