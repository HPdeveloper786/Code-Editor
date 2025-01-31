let htmlInput = document.querySelector(".html-editor textarea");
let cssInput = document.querySelector(".css-editor textarea");
let jsInput = document.querySelector(".js-editor textarea");
let outputContainer = document.querySelector(".output-container");
let saveButton = document.querySelector("#save");
let outputIframe = document.querySelector("#output");
let fullscreenButton = document.querySelector("#full");
let copyButtons = document.querySelectorAll(".copy");

// Check if all required elements exist
if (!htmlInput || !cssInput || !jsInput || !outputContainer || !saveButton || !outputIframe || !fullscreenButton) {
    console.error("One or more elements not found in the DOM.");
}

// Function to execute code in the iframe
function executeCode() {
    if (outputIframe.contentDocument) {
        // Clear existing content
        outputIframe.contentDocument.body.innerHTML = '';

        // Set HTML and CSS
        outputIframe.contentDocument.body.innerHTML = htmlInput.value;
        outputIframe.contentDocument.head.innerHTML = `<style>${cssInput.value}</style>`;
        
        // Clear existing scripts to avoid duplication
        const existingScripts = outputIframe.contentDocument.querySelectorAll("script");
        existingScripts.forEach(script => script.remove());

        // Create a new script element
        const script = outputIframe.contentDocument.createElement("script");
        script.textContent = jsInput.value;

        // Append the new script to the body
        try {
            outputIframe.contentDocument.body.appendChild(script);
            console.log("JavaScript code executed.");
        } catch (error) {
            console.error("Error executing JavaScript:", error);
        }
    } else {
        console.error("Output iframe is not accessible.");
    }
}

// Event listener to save and execute the code
saveButton.addEventListener("click", executeCode);

// Event listener for fullscreen toggle
fullscreenButton.addEventListener("click", () => {
    outputContainer.classList.toggle("output-full-active");
    fullscreenButton.style.transform = outputContainer.classList.contains("output-full-active") ? "rotate(180deg)" : "rotate(0deg)";
});

// Event listeners for copy buttons
copyButtons.forEach((button) => {
    button.addEventListener("click", () => {
        let textToCopy;
        if (button.classList.contains("copy1")) {
            textToCopy = htmlInput.value;
        } else if (button.classList.contains("copy2")) {
            textToCopy = cssInput.value;
        } else {
            textToCopy = jsInput.value;
        }

        navigator.clipboard.writeText(textToCopy).then(() => {
            console.log(`${textToCopy.length ? "Code" : "Content"} copied to clipboard!`);
        }).catch(err => {
            console.error("Failed to copy:", err);
        });
    });
});
