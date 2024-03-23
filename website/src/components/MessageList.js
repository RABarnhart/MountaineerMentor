import React from "react";
import { FaRobot } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { getMessagesFromAI, sendMessage } from "../api/messagingAPI"

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
            <div className="AITextArea my-5 border border-white w-[40%] h-96 overflow-auto">
                {this.state.messages.map(({from, message}) => 
                    {from === "user" ? <UserResponseText text={message} /> : <AIResponseText text={message} /> }
                )}

            </div>
        )
    }

    handleInputMessage = event => {
        this.setState({ userMessage: event.target.value })
    }

    sendMessage = async(message) => {
        sendMessage("user", message)
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
