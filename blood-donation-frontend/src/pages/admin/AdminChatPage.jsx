import { useEffect, useState } from "react";

import useChat from "../../hooks/useChat";

import {
    getUsers,
    createConversation
} from "../../services/chatService";

import ChatSidebar from "../../components/chat/ChatSidebar";
import ChatHeader from "../../components/chat/ChatHeader";
import MessageList from "../../components/chat/MessageList";
import ChatInput from "../../components/chat/ChatInput";

export default function AdminChatPage() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const [users, setUsers] = useState([]);

    const [selectedUser, setSelectedUser] = useState(null);

    const [message, setMessage] = useState("");

    const {

        loadConversation,

        messages,

        onlineUsers,

        typingUser,

        notifications,

        sendMessage,

        sendTyping,

        messagesEndRef

    } = useChat(user);

        useEffect(() => {

        async function loadUsers() {

            const data = await getUsers();

            setUsers(data);

        }

        loadUsers();

    }, []);

        const openConversation = async (selected) => {

        setSelectedUser(selected);

        const result = await createConversation(
            selected.id
        );

        loadConversation(
            result.conversation_id
        );

    };

        return (

        <div className="h-screen flex bg-gray-100">

            <ChatSidebar

                users={users}

                selectedUser={selectedUser}

                onSelect={openConversation}

                notifications={notifications}

                onlineUsers={onlineUsers}

            />



            {

                selectedUser ? (

                    <div className="flex-1 flex flex-col">

                        <ChatHeader

                            user={selectedUser}

                            online={onlineUsers.includes(selectedUser.id)}

                        />



                        <MessageList

                            messages={messages}

                            currentUser={user}

                            messagesEndRef={messagesEndRef}

                        />



                        {

                            typingUser && (

                                <div className="px-5 py-2 text-sm text-gray-500">

                                    {typingUser} is typing...

                                </div>

                            )

                        }



                        <ChatInput

                            value={message}

                            onChange={(e) => {

                                setMessage(e.target.value);

                                sendTyping();

                            }}

                            onSend={() => {

                                sendMessage(

                                    selectedUser.id,

                                    message

                                );

                                setMessage("");

                            }}

                        />

                    </div>

                ) : (

                    <div className="flex-1 flex items-center justify-center bg-gray-100">

                        <div className="text-center">

                            <h2 className="text-3xl font-bold">

                                💬 LifeLink Chat

                            </h2>

                            <p className="mt-2 text-gray-500">

                                Select a conversation from the left.

                            </p>

                        </div>

                    </div>

                )

            }

        </div>

    );

}