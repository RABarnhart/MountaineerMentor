const IP = 'http://localhost:'
const PORT = '8000'
const API_URL = IP + PORT

const getMessagesFromAI = async() => {
    const response = await fetch(`${API_URL}/messages`, {method: 'GET'});
    const messages = await response.json();
    
    const processedMessages = messages.map(message => {
        if (message.role === 'user') {
            const questionStartIndex = message.content.indexOf('question: ');
            if (questionStartIndex !== -1) {
                return {
                    role: 'user',
                    content: message.content.substring(questionStartIndex + 'question: '.length)
                };
            } else {
                return {
                    role: 'user',
                    content: ''                };
            }
        } else if (message.role === 'assistant') {
            return message; 
        } else {
            return null;
        }
    }).filter(processedMessage => processedMessage !== null); // Remove messages that were turned into null

    console.log(processedMessages)

    return processedMessages;
}




const sendUserMessage = async(message) => {
    console.log("Sending Message Data...")
    await fetch(`${API_URL}/messages`, {
        method: 'POST', 
        body: JSON.stringify(message),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

const ping = async () => {
    console.log("Pinging server...");
    const response = await fetch(`${API_URL}/debug`);
    const text = await response.text();
    console.log("Server response:", text);
}

export {
    getMessagesFromAI,
    sendUserMessage,
    ping
}
