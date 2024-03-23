import React from "react";
import { FaRobot } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { getMessagesFromAI, sendUserMessage, ping } from "../api/messagingAPI"

class MessageList extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            messages: [
                {from: "ai", message: "Test AI Message"},
                {from: "user", message: "Test User Message"}
            ],
            userMessage: ""
        }

        this.handleInputMessage = this.handleInputMessage.bind(this)
    }

    render() {
        return (
            <div>
                <div className="AITextArea my-5 border border-white h-96 overflow-auto">
                    {this.state.messages.map(({from, message}) => 
                        {from === "user" ? <UserResponseText text={message} /> : <AIResponseText text={message} /> }
                    )}

                </div>
                <h2>Ask Your Question Here!</h2>
                <input onChange={this.handleInputMessage} className='userInput m-2 mb-6 bg-black/5 border border-white p-2'/>
                <button onClick={this.sendMessageToAI}>Send</button>
                <button onClick={() => ping()}>PING!</button>

            </div>
        )
    }

    handleInputMessage = event => {
        this.setState({ userMessage: event.target.value })
    }

    sendMessageToAI = async() => {
        sendUserMessage(this.state.userMessage) 
            .then(data => console.log(data))
            .catch(error => console.log(error))
    }

    getMessagesFromAIHandler() {
       getMessagesFromAI()
            .then(data => data.json())
            .then(json_data => {
                console.log(json_data)
            })
    }
    
}

function AIResponseText(props) {
    return (
        <div className="AIResponseText text-white p-2">        
            <span className="flex"><FaRobot className="w-8 m-3 text-white" /><p className="p-2 bg-black/20 rounded">{props.text}</p></span>
        </div>
    )
}

function UserResponseText(props) { 
    return (
        <div className="UserResponseText text-white p-2">        
            <span className="flex"><FaPerson className="w-8 m-3 text-white" /><p className="p-2 bg-black/20 rounded">{props.text}</p></span>
        </div>
    )
}

export default MessageList;
