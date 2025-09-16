function run() {
    let htmlCode = document.getElementById("html-code");
    let cssCode = document.getElementById("css-code");
    let jsCode = document.getElementById("js-code");
    let output = document.getElementById("output");
    let errorDisplay = document.getElementById("error-display");

    // Clear previous errors
    errorDisplay.textContent = "";
    htmlCode.style.borderColor = "";
    cssCode.style.borderColor = "";

    // HTML Error Checking
    let parser = new DOMParser();
    let parsedHtml = parser.parseFromString(htmlCode.value, "text/html");
    let htmlErrors = parsedHtml.querySelector("parsererror");

    if (htmlErrors) {
        htmlCode.style.borderColor = "red";
        errorDisplay.textContent = "HTML Error: " + htmlErrors.textContent.trim();
        return;
    }

    // CSS Error Checking
    try {
        let styleSheet = new CSSStyleSheet();
        styleSheet.replaceSync(cssCode.value); // Throws error for invalid CSS
    } catch (cssError) {
        cssCode.style.borderColor = "red";
        errorDisplay.textContent = "CSS Error: " + cssError.message;
        return;
    }

    // Update HTML and CSS
    output.contentDocument.body.innerHTML = htmlCode.value + "<style>" + cssCode.value + "</style>";

    // JavaScript Error Checking
    try {
        output.contentWindow.eval(jsCode.value);
    } catch (jsError) {
        errorDisplay.textContent = "JavaScript Error: " + jsError.message;
    }
}
