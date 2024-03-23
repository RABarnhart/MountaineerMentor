const API_URL = "localhost:8080"

const getMessagesFromAI = async() => {
    const messages = await fetch(`${API_URL}/messages`, {method: 'GET'})
    return messages
}

const sendMessage = async(from, message) => {
    
    var jsonMessage = {
        "message":`${message}`,
        "from":`${from}`
    }

    await fetch(`${API_URL}/message`, {method: 'POST', body: JSON.stringify(jsonMessage)})
}

export {
    getMessagesFromAI,
    sendMessage
}
