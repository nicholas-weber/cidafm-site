cidafm (like Sid Affum, but with stress on the "daf" rather than the "cid") is an open-source framework for modularized AI behavior modification, which can be activated with a single prompt. No code or coding necessary. While the final version of cidafm.com is currently under development, here's a short explanation on how to set up and use cidafm 0.1: 
1. Go to cidafm.com
2. Copy the init prompt
3. Paste it into ChatGPT or some other chatbot (it's only been tested for GPT-4, use at your own risk)
4. Download my custom AFM library, then import it into the chat along with "!import-cid" somewhere in the prompt (not in quotes)
5. Try out the AFMs, or try to develop your own! An example could be to define a state AFM which makes the AI talk like a famous person or character. Try it, then try toggling it on and off. Also, if you downloaded the library, then try a "!state-check"
6. Ask the AI how it would improve cidafm, or how it would improve a specific AFM (optional)

The three types of AFMs:
- Response modifiers (prefixed with ^): only modify the response to the prompt the response modifier is used in (i.e. ^concise)
- State AFMs (prefixed with &): modify all the AI's responses while toggled on, but can be toggled off by repeating the name of the AFM in a prompt (i.e. &concise)
- Execution commands (prefixed with !): perform a single command once (i.e. !state-check)

⚠️ cidafm 0.1 is in alpha. Its use may result in unintended behavior.
