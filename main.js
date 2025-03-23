window.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("cidafm-header");
    const tagline = document.getElementById("tagline");
    const content = document.getElementById("content-container");
    const text = "cidafm";
    let index = 0;

    function typeNextChar() {
      if (index < text.length) {
        header.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeNextChar, 50);
      } else {
        const sub = document.getElementById("cidafm-subheader");
        if (sub) {
          sub.classList.add("fade-in");
          sub.style.opacity = 1;
        }
      }
    }

    if (header) {
      setTimeout(typeNextChar, 500);

      const totalTypingTime = text.length * 150 + 150;


      if (content) {
        setTimeout(() => {
          content.style.opacity = 1;
        }, totalTypingTime + 150);
      }
    }

    let currentView = "prompt";

    function fadeSwapContent(contentElement, html, callback) {
      contentElement.classList.remove("fade-in");
      contentElement.classList.add("fade-out");

      setTimeout(() => {
        contentElement.innerHTML = html;
        contentElement.classList.remove("fade-out");
        contentElement.classList.add("fade-in");
        if (callback) callback();
      }, 300);
    }

    function navigate(view) {
      currentView = view;
      const contentElement = document.getElementById("content");

      if (view === "prompt") {
        fetch("prompt.html")
          .then(res => res.text())
          .then(html => fadeSwapContent(contentElement, html, setupPrompt))
          .catch(err => {
            console.error("Failed to load prompt.html:", err);
          });
      } else {
        fetch(view)
          .then(res => res.text())
          .then(html => fadeSwapContent(contentElement, html));
      }

      renderNavButtons();
    }

    function renderNavButtons() {
      const navContainer = document.getElementById("nav-buttons");
      if (!navContainer) return;

      navContainer.innerHTML = "";
      const views = [
        { label: "Prompt", value: "prompt" },
        { label: "How-to", value: "how-to.html" },
        { label: "FAQ", value: "faq.html" }
      ];

      views.forEach(view => {
        const isCurrent = (currentView === "prompt" && view.value === "prompt") ||
                          (currentView === "how-to.html" && view.value === "how-to.html") ||
                          (currentView === "faq.html" && view.value === "faq.html");
        if (isCurrent) return;

        const btn = document.createElement("button");
        btn.className = "nav-btn";
        btn.textContent = view.label;
        btn.onclick = () => navigate(view.value);
        navContainer.appendChild(btn);
      });
    }

    function setupPrompt() {
      const textarea = document.getElementById("prompt-output");
      const copyBtn = document.querySelector(".copy-btn");

      if (textarea) {
        fetch("assets/init-prompt.txt")
          .then(res => res.text())
          .then(data => {
            textarea.value = data;
            const container = document.getElementById("prompt-container");
            if (container) container.style.visibility = "visible";
          })
          .catch(err => {
            textarea.value = "Error loading prompt.";
            console.error("Fetch failed:", err);
          });
      }

      if (copyBtn) {
        copyBtn.addEventListener("click", () => {
          const promptText = textarea.value;

          if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(promptText)
              .then(() => window.alert("Copied to clipboard."))
              .catch(err => {
                console.error("Clipboard API failed", err);
                fallbackCopy(promptText);
              });
          } else {
            fallbackCopy(promptText);
          }
        });
      }
    }

    // Fallback copy logic
    function fallbackCopy(text) {
      const temp = document.createElement("textarea");
      temp.value = text;
      temp.style.position = "fixed";
      temp.style.opacity = 0;
      document.body.appendChild(temp);
      temp.focus();
      temp.select();
      try {
        document.execCommand("copy");
        window.alert("Copied to clipboard.");
      } catch (err) {
        console.error("Fallback copy failed", err);
        window.alert("Copy failed.");
      }
      document.body.removeChild(temp);
    }

    document.body.addEventListener("htmx:afterSwap", (e) => {
      if (e.target.id === "content") {
        e.target.classList.remove("fade-in"); // Reset animation
        void e.target.offsetWidth; // Trigger reflow
        e.target.classList.add("fade-in"); // Replay animation
      }
    });

    // Kick off initial view
    navigate("prompt");
});