import { useEffect, useState } from "react";

import useChat from "../../hooks/useChat";

import {
    getUsers
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



    // ==============================
    // LOAD ALL USERS FOR ADMIN CHAT
    // ==============================

    useEffect(() => {

        async function loadUsers() {

            try {

                const data = await getUsers();

                setUsers(data);

            } catch (error) {

                console.error(
                    "Failed loading users:",
                    error
                );

            }

        }


        loadUsers();

    }, []);




    // ==============================
    // OPEN CONVERSATION
    // ==============================

    const openConversation = async (selected) => {

        setSelectedUser(selected);

        await loadConversation(
            selected.id
        );

    };




    // ==============================
    // SEND MESSAGE
    // ==============================

    const handleSend = () => {

        if (!message.trim()) return;


        sendMessage(
            selectedUser.id,
            message
        );


        setMessage("");

    };




    return (

        <div className="h-screen flex bg-gray-100">


            {/* SIDEBAR */}

            <ChatSidebar

                title="Conversations"

                users={users}

                selectedUser={selectedUser}

                onSelectUser={openConversation}

                notifications={notifications}

                onlineUsers={onlineUsers}

            />




            {

                selectedUser ? (

                    <div className="flex-1 flex flex-col">



                        {/* HEADER */}

                        <ChatHeader

                            title={
                                selectedUser.full_name
                            }

                            subtitle={
                                selectedUser.role
                            }

                            avatar={
                                selectedUser.full_name
                                    ?.charAt(0)
                            }

                            online={
                                onlineUsers.includes(
                                    selectedUser.id
                                )
                            }

                        />




                        {/* MESSAGES */}

                        <MessageList

                            messages={messages}

                            currentUserId={
                                user.id
                            }

                            messagesEndRef={
                                messagesEndRef
                            }

                        />




                        {/* TYPING */}

                        {

                            typingUser && (

                                <div className="
                                    px-5
                                    py-2
                                    text-sm
                                    text-gray-500
                                ">

                                    {typingUser} is typing...

                                </div>

                            )

                        }




                        {/* INPUT */}

                        <ChatInput

                            value={message}

                            onChange={(text) => {

                                setMessage(text);

                                sendTyping();

                            }}

                            onSend={
                                handleSend
                            }

                        />


                    </div>


                ) : (


                    <div className="
                        flex-1
                        flex
                        items-center
                        justify-center
                        bg-gray-100
                    ">

                        <div className="text-center">


                            <h2 className="
                                text-3xl
                                font-bold
                            ">

                                💬 LifeLink Chat

                            </h2>


                            <p className="
                                mt-2
                                text-gray-500
                            ">

                                Select a conversation from the left.

                            </p>


                        </div>


                    </div>


                )

            }


        </div>

    );

}