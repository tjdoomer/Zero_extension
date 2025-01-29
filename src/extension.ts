// The module 'vscode' contains the VS Code extensibility API
import * as vscode from 'vscode';
import ollama from 'ollama';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratz, "zero-ext" is now alive!');

    const disposable = vscode.commands.registerCommand('zero-ext.hi', () => {
        const panel = vscode.window.createWebviewPanel(
            'deepChat',
            'Deep Seek Chat',
            vscode.ViewColumn.One,
            { enableScripts: true }
        );

        // Initialize chat history
        let chatHistory: { role: string; content: string; }[] = [];
        
        panel.webview.html = getWebviewContent();

        panel.webview.onDidReceiveMessage(async (message: any) => {
            if (message.command === 'chat') {
                const userPrompt = message.text;
                let responseText = '';

                try {
                    // Add user message to history
                    chatHistory.push({ role: 'user', content: userPrompt });

                    const streamResponse = await ollama.chat({
                        model: 'deepseek-r1:8b',
                        messages: chatHistory,
                        stream: true
                    });

                    // Create a new message ID for this response
                    const messageId = Date.now().toString();
                    panel.webview.postMessage({ 
                        command: 'startNewResponse',
                        messageId
                    });

                    for await (const part of streamResponse) {
                        responseText += part.message.content;
                        panel.webview.postMessage({ 
                            command: 'updateResponse',
                            messageId,
                            text: responseText
                        });
                    }

                    // Add assistant's response to history
                    chatHistory.push({ role: 'assistant', content: responseText });

                } catch (err) {
                    panel.webview.postMessage({ 
                        command: 'error',
                        text: 'Error: ' + String(err)
                    });
                }
            }
        });
    });

    context.subscriptions.push(disposable);
}

function getWebviewContent(): string {
    return /*html*/`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <style>
            body { 
                font-family: Arial, sans-serif; 
                margin: 1rem;
                display: flex;
                flex-direction: column;
                height: 95vh;
            }
            #chatContainer {
                display: flex;
                flex-direction: column;
                height: 100%;
            }
            #chatHistory { 
                flex-grow: 1;
                overflow-y: auto;
                margin-bottom: 1rem;
                border: 1px solid #ccc;
                padding: 1rem;
                border-radius: 4px;
            }
            .input-area {
                margin-top: auto;
            }
            #prompt { 
                width: 100%; 
                box-sizing: border-box;
                margin-bottom: 0.5rem;
            }
            .message { 
                margin: 0.5rem 0;
                padding: 0.5rem;
                border-radius: 4px;
                white-space: pre-wrap;
            }
            .user-message { background-color:rgb(0, 0, 0); }
            .assistant-message { background-color:rgb(0, 0, 0); }
        </style>
    </head>
    <body>
        <h1>Zero Extension</h1>
        <div id="chatContainer">
            <div id="chatHistory"></div>
            <div class="input-area">
                <textarea id="prompt" rows="3" placeholder="Enter your demands..."></textarea>
                <button id="askBtn">Send it</button>
            </div>
        </div>

        <script>
            const vscode = acquireVsCodeApi();
            const chatHistory = document.getElementById('chatHistory');
            let currentMessageElement = null;

            document.getElementById('askBtn').addEventListener('click', () => {
                const promptElement = document.getElementById('prompt');
                const text = promptElement.value.trim();
                
                if (text) {
                    // Add user message to chat history
                    appendMessage(text, 'user');
                    
                    // Clear input
                    promptElement.value = '';
                    
                    vscode.postMessage({ command: 'chat', text });
                }
            });

            function appendMessage(text, role) {
                const messageDiv = document.createElement('div');
                messageDiv.className = \`message \${role}-message\`;
                messageDiv.textContent = text;
                chatHistory.appendChild(messageDiv);
                chatHistory.scrollTop = chatHistory.scrollHeight;
                return messageDiv;
            }

            window.addEventListener('message', event => {
                const message = event.data;

                switch (message.command) {
                    case 'startNewResponse':
                        currentMessageElement = appendMessage('', 'assistant');
                        break;

                    case 'updateResponse':
                        if (currentMessageElement) {
                            currentMessageElement.textContent = message.text;
                            chatHistory.scrollTop = chatHistory.scrollHeight;
                        }
                        break;

                    case 'error':
                        appendMessage(message.text, 'assistant');
                        break;
                }
            });

            // Add enter key support
            document.getElementById('prompt').addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    document.getElementById('askBtn').click();
                }
            });
        </script>
    </body>
    </html>`;
}

export function deactivate() {}
