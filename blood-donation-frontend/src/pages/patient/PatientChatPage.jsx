import { useEffect, useRef, useState } from "react";
import socket from "../../socket";

const API = "http://127.0.0.1:5000";


export default function PatientChatPage() {


    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const token = localStorage.getItem("token");


    const [conversationId, setConversationId] = useState(null);

    const [messages, setMessages] = useState([]);

    const [message, setMessage] = useState("");

    const [typingUser, setTypingUser] = useState(null);

    const [adminOnline, setAdminOnline] = useState(false);


    const messagesEndRef = useRef(null);




    // ==========================
    // CREATE ADMIN CHAT
    // ==========================

    useEffect(() => {


        createConversation();


        socket.emit(
            "user_online",
            {
                user_id:user.id
            }
        );


        socket.emit(
            "get_online_users"
        );


    }, []);




    const createConversation = async () => {

        try {


            const response = await fetch(

                `${API}/api/chat/conversation/1`,

                {

                    method:"POST",

                    headers:{

                        Authorization:
                        `Bearer ${token}`

                    }

                }

            );


            const data =
                await response.json();


            setConversationId(
                data.conversation_id
            );


        }
        catch(error){

            console.error(error);

        }

    };






    // ==========================
    // LOAD MESSAGES
    // ==========================

    useEffect(() => {


        if(!conversationId)
            return;



        fetch(

            `${API}/api/chat/messages/${conversationId}`,

            {

                headers:{

                    Authorization:
                    `Bearer ${token}`

                }

            }

        )

        .then(res=>res.json())

        .then(data=>{

            setMessages(data);

        });




        socket.emit(

            "join_room",

            {

                conversation_id:
                conversationId

            }

        );




        return()=>{


            socket.emit(

                "leave_room",

                {

                    conversation_id:
                    conversationId

                }

            );


        };


    },[conversationId]);







    // ==========================
    // SOCKET LISTENERS
    // ==========================

    useEffect(()=>{


        const receiveMessage = (data)=>{


            if(
                data.conversation_id === conversationId
            ){


                setMessages(prev=>{


                    const exists =
                    prev.some(
                        msg=>msg.id === data.id
                    );


                    if(exists)
                        return prev;


                    return [
                        ...prev,
                        data
                    ];


                });


            }


        };




        const userConnected = (data)=>{


            if(data.user_id === 1){

                setAdminOnline(true);

            }

        };




        const userDisconnected = (data)=>{


            if(data.user_id === 1){

                setAdminOnline(false);

            }

        };





        const typing = (data)=>{


            if(data.user_id !== user.id){


                setTypingUser(
                    data.user_name
                );


                setTimeout(()=>{

                    setTypingUser(null);

                },2000);


            }

        };





        socket.on(
            "receive_message",
            receiveMessage
        );


        socket.on(
            "user_connected",
            userConnected
        );


        socket.on(
            "user_disconnected",
            userDisconnected
        );


        socket.on(
            "user_typing",
            typing
        );





        return()=>{


            socket.off(
                "receive_message",
                receiveMessage
            );


            socket.off(
                "user_connected",
                userConnected
            );


            socket.off(
                "user_disconnected",
                userDisconnected
            );


            socket.off(
                "user_typing",
                typing
            );


        };


    },[conversationId]);







    // ==========================
    // AUTO SCROLL
    // ==========================

    useEffect(()=>{


        messagesEndRef.current?.scrollIntoView({

            behavior:"smooth"

        });


    },[messages]);







    // ==========================
    // SEND MESSAGE
    // ==========================

    const sendMessage = ()=>{


        if(!message.trim())
            return;



        socket.emit(

            "send_message",

            {

                conversation_id:
                conversationId,


                sender_id:
                user.id,


                receiver_id:
                1,


                message:
                message.trim()

            }

        );


        setMessage("");

    };







    // ==========================
    // TIME FORMAT
    // ==========================

    const formatTime = (time)=>{


        if(!time)
            return "";



        let timestamp = time;



        if(
            typeof timestamp === "string" &&
            !timestamp.endsWith("Z") &&
            !timestamp.includes("+")
        ){

            timestamp += "Z";

        }



        return new Date(timestamp)

            .toLocaleTimeString(

                "en-KE",

                {

                    timeZone:
                    "Africa/Nairobi",

                    hour:"2-digit",

                    minute:"2-digit",

                    hour12:true

                }

            );


    };







    return (

        <div className="h-screen flex flex-col bg-gray-100">


            <div className="bg-red-600 text-white p-5">


                <h2 className="text-xl font-bold">

                    💬 Admin Support

                </h2>


                <p>

                    {
                        adminOnline
                        ?
                        "🟢 Online"
                        :
                        "⚪ Offline"
                    }

                </p>


            </div>






            <div className="flex-1 overflow-y-auto p-5 space-y-3">


                {
                    messages.map(msg=>(


                        <div

                            key={msg.id}

                            className={`flex ${
                                msg.sender_id === user.id
                                ?
                                "justify-end"
                                :
                                "justify-start"
                            }`}

                        >



                            <div

                                className={`px-4 py-3 rounded-2xl max-w-md shadow ${
                                    msg.sender_id === user.id
                                    ?
                                    "bg-red-600 text-white"
                                    :
                                    "bg-white"
                                }`}

                            >


                                <p>

                                    {msg.message}

                                </p>



                                <div className="text-xs opacity-70 mt-1 text-right">


                                    {formatTime(
                                        msg.created_at
                                    )}


                                </div>



                            </div>



                        </div>


                    ))

                }



                <div ref={messagesEndRef}/>


            </div>






            {
                typingUser &&

                <div className="px-5 text-gray-500">

                    {typingUser} typing...

                </div>

            }







            <div className="p-4 bg-white flex gap-3">


                <input

                    value={message}


                    onChange={(e)=>{


                        setMessage(
                            e.target.value
                        );


                        socket.emit(

                            "typing",

                            {

                                conversation_id:
                                conversationId,


                                user_id:
                                user.id,


                                user_name:
                                user.full_name

                            }

                        );


                    }}


                    onKeyDown={(e)=>{

                        if(e.key==="Enter")
                            sendMessage();

                    }}


                    placeholder="Message admin..."


                    className="
                    flex-1
                    border
                    rounded-full
                    px-5
                    py-3
                    focus:outline-none
                    "

                />




                <button

                    onClick={sendMessage}

                    className="
                    bg-red-600
                    hover:bg-red-700
                    text-white
                    px-6
                    rounded-full
                    "

                >

                    Send

                </button>



            </div>



        </div>

    );

}