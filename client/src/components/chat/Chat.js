import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

//Import actions
import { userMessage, sendMessage, createSession } from "../../actions/chatAction"

const Chat = ({ chat, userMessage, sendMessage, createSession }) => {
    const [message, setMessage] = useState("");

    //auto scroll when new message is entered
    const endOfChat = useRef(null);
    const scrollToBottom = () => {
        endOfChat.current.scrollIntoView({ behaviour: "smooth" });
    }
    useEffect(scrollToBottom, [chat]);

    //function to handle the user's input
    const handleClick = async (e) => {
        const code = e.keyCode || e.which;
        //when enter key is pressed
        if (code === 13) {
            userMessage(message);
            setMessage("");
            if (!localStorage.session) {
                createSession(message);
            } else {
                sendMessage(message)
            }
        }
    }

    return (
        <div className="chat">
            <h1>ChatBot</h1>
            <div className="historyContainer">
                {chat.length === 0 ?
                    "" : chat.map((msg, i) => <div className={msg.type} key={i}>{msg.type === "bot" ? "BOT" : "YOU"}: {msg.message}</div>)
                }
                <div ref={endOfChat}></div>
            </div>
            <input id="chatBox"
                placeholder="Type your message here"
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleClick}
                value={message}>
            </input>
        </div>
    )
};

const mapStateToProps = state => ({
    chat: state.chat.messages
})

export default connect(mapStateToProps, { userMessage, sendMessage, createSession })(Chat);
