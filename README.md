⚠️ cidafm 0.2 is in alpha. Its use may result in unintended behavior.

cidafm (pronounced like Sid Affum, but with stress on the "daf" rather than the "cid") is a protocol for modularized AI behavior modification. cidafm is unique in that it requires no code to run; it is simply activated using the init prompt, available on cidafm.com. It enables the use of AFMs (AI function modules), or snippets of reusable execution logic. AFMs can either be imported through CIDs (context import documents) or defined directly by the user via prompting.

The three types of AFMs:
- Response modifiers (prefixed with ^): modify the response to the prompt the response modifier is used within (i.e. ^concise)
- State AFMs (prefixed with &): modify all the AI's responses while toggled on, but can be toggled off by repeating the name of the AFM in a prompt (i.e. &concise)
- Execution commands (prefixed with !): perform a single command once (i.e. !state-check)

How to use: 
1. Go to cidafm.com
2. Read and copy the init prompt
3. Paste it into ChatGPT or any other chatbot (it's only been thoroughly tested for GPT-4)
4. Download the AFM library, then import it into the chat along with "!import-cid" somewhere in the prompt (not in quotes)
5. Try out the AFMs
6. Try to develop your own AFMs. An example could be to define a state AFM which makes the AI talk like a famous person or character. Try it, then try toggling it on and off. Try a "!state-check"
7. Ask the AI how it would improve cidafm, or how it would improve a specific AFM
