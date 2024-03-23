const IP = 'localhost'
const PORT = '8000'
const API_URL = IP + PORT

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
