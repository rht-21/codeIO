function run()  {
    let htmlCode = document.getElementById("html-code").value;
    let cssCode = document.getElementById("css-code").value;
    let jsCode = document.getElementById("js-code").value;
    let output = document.getElementById("frame");

    output.contentDocument.body.innerHTML = htmlCode + '<style>' + cssCode + '</style>';
    output.contentWindow.eval(jsCode);
}

// Define a common event listener function
function handleInput(event) {
    const textarea = event.target;
    const cursorPosition = textarea.selectionStart;
    const inputValue = textarea.value;

    const charTyped = inputValue.charAt(cursorPosition - 1);
    const closingBracket = getClosingBracket(charTyped);

    if (closingBracket) {
        textarea.value = inputValue.slice(0, cursorPosition) + closingBracket + inputValue.slice(cursorPosition);
        textarea.setSelectionRange(cursorPosition, cursorPosition);
    }
}

// Add the event listener to all textareas with class 'code-input'
const codeInputs = document.querySelectorAll('.code');
codeInputs.forEach(function (textarea) {
    textarea.addEventListener('input', handleInput);
});

function getClosingBracket(openingBracket) {
    switch (openingBracket) {
        case '<':
            return '>';
        case '{':
            return '}';
        case '(':
            return ')';
        case '[':
            return ']';
        default:
            return null;
    }
}