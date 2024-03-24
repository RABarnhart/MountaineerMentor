import React from "react";
import { FaRobot } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { getMessagesFromAI, sendUserMessage } from "../api/messagingAPI"
import YosefinaPic from "../assets/yosefina.webp"

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
            });
    }

    sendMessageToAI = async () => {
        sendUserMessage(this.state.userMessage) 
            .then(data => {console.log(data)})
            .catch(error => console.log(error))

        this.setState({ userMessage: '' }); // Reset the user input field
    }
 

    render() {
        return (
            <div>
                <img src={YosefinaPic} className="w-1/6 mx-auto h-1/6 m-4 border"/>
                <div className="AITextArea w-1/2 mx-auto my-5 border border-white h-96 overflow-auto">

                    {this.state.messages.map(({role, content} , index) => 
                        role === "user" ? 
                            <UserResponseText key={index} text={content} /> : 
                            <AIResponseText key={index} text={content} />
                    )}

                </div>
                <h2>Ask Your Question Here!</h2>
                <input onChange={this.handleInputMessage} onKeyDown={(e) => {
                    if (e.key == "Enter") { this.sendMessageToAI() }
                }} value={this.state.userMessage} className='userInput m-2 mb-6 bg-black/5 border border-white p-2'/>
                <button onClick={this.sendMessageToAI}>Send</button>

            </div>
        )
    }

    handleInputMessage = event => {
        this.setState({ userMessage: event.target.value })
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
            <span className="flex"><FaRobot className="w-8 m-3 text-white" /><p className="p-2 w-3/4 bg-black/20 rounded">{props.text}</p></span>
        </div>
    )
}

function UserResponseText(props) { 
    return (
        <div className="UserResponseText text-white p-2">        
            <span className="flex"><FaPerson className="w-8 h-8 m-3 text-white" /><p className="p-2 bg-black/20 rounded">{props.text}</p></span>
        </div>
    )
}

export default MessageList;
