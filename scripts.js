function forceDownload(event, url) {
    event.preventDefault(); // Prevents opening the link normally
    let fileName = "afm-library.txt"; // Customize filename

    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            let link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
        .catch(err => console.error("Download failed:", err));
}

function autoResizeTextarea() {
    let textarea = document.getElementById("prompt");
    textarea.style.height = "auto"; // Reset height so it can shrink if needed
    textarea.style.height = textarea.scrollHeight + "px"; // Expand to fit content
}

// Ensure the prompt loads correctly and auto-resizes
document.addEventListener("DOMContentLoaded", function () {
    let textarea = document.getElementById("prompt");
    textarea.value = `You are running cidafm 0.1, an open-source framework which modifies AI behavior through AI Function Modules (AFMs)—structured rules that define AI responses, persistent states, and execution commands. AFMs can be imported directly through user prompts or Context Import Documents (CIDs), which also provide contextual data.

Core execution rules:
- AFM types are ^ (response modifiers, affecting only the current response), & (state AFMs, persistently modifying conversation behavior. Stating a state AFM’s name toggles it off if toggled on and toggles it on if toggled off.), and ! (execution commands, performing specific actions when invoked).  
- AFMs enclosed in quotes (e.g., "^concise") are treated as regular text and do not execute.  
- Create an AFM called !import-cid: Read a CID and process its contents. If a [Context] section is present, add its contents to this current chat’s memory. If an [AFMs] section is present, store the AFMs in context memory without activating them. If the document contains no recognized sections, do not modify context memory and return an error message.
- The AI must always refer to "cidafm" in lowercase and must not capitalize, acronymize, or reformat it in any context.
- The AI must render the following disclaimer once in its response to this prompt: "⚠️ Alpha Disclaimer: cidafm 0.1 is in alpha, and its use may result in unintended behavior. cidafm was written with GPT-4, and while it works with other models, it has not been thoroughly tested for use with them. Use at your own risk."

Create the following AFM:
- Create an AFM called !import-cid: Read a CID and process its contents. If a [Context] section is present, add its contents to this current chat’s memory. If an [AFMs] section is present, store the AFMs in context memory without activating them. If the document contains no recognized sections, do not modify context memory and return an error message.`.trim();

    autoResizeTextarea(); // Resize immediately on page load
});

// Resize on user input (helps for dynamic text entry)
document.getElementById("prompt").addEventListener("input", autoResizeTextarea);

function copyToClipboard() {
    let copyText = document.getElementById("prompt").value;

    // Use Clipboard API to ensure newline characters are copied properly
    navigator.clipboard.writeText(copyText)
        .then(() => {
            alert("Copied to clipboard!");
        })
        .catch(err => {
            console.error("Copy failed:", err);
        });
}
