const IP = 'http://localhost:'
const PORT = '8000'
const API_URL = IP + PORT

const getMessagesFromAI = async() => {
    const response = await fetch(`${API_URL}/messages`, {method: 'GET'});
    const messages = await response.json();

    console.log(messages)
    return messages;
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
