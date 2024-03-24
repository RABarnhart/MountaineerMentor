import React from "react";
import { FaRobot } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { getMessagesFromAI, sendUserMessage, ping } from "../api/messagingAPI"

class MessageList extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            messages: [],
            userMessage: ""
        }

        this.handleInputMessage = this.handleInputMessage.bind(this)
    }

    componentDidMount() {
        getMessagesFromAI()
            .then(data => {
                this.setState({ messages: data });
                console.log("Loaded Messages...");
            });
    }
 

    render() {
        return (
            <div>
                <div className="AITextArea my-5 border border-white h-96 overflow-auto">

                    {this.state.messages.map(({role, message}, index) => 
                        role === "user" ? 
                            <UserResponseText key={index} text={message} /> : 
                            <AIResponseText key={index} text={message} />
                    )}

                </div>
                <h2>Ask Your Question Here!</h2>
                <input onChange={this.handleInputMessage} onKeyDown={(e) => {
                    if (e.key == "Enter") { this.sendMessageToAI() }
                }} value={this.state.userMessage} className='userInput m-2 mb-6 bg-black/5 border border-white p-2'/>
                <button onClick={this.sendMessageToAI}>Send</button>
                <button onClick={this.getMessagesFromAIHandler}>Get AI</button>
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

    getMessagesFromAIHandler = async() => {
        getMessagesFromAI()
            .then(json_data => console.log(json_data))
            .catch(error => console.error("Error fetching messages:", error))
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
