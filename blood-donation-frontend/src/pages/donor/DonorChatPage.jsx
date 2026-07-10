import { useEffect, useRef, useState } from "react";
import socket from "../../socket";

const API = "http://127.0.0.1:5000";


export default function DonorChatPage() {


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



    // =====================================
    // CREATE ADMIN CHAT
    // =====================================

    useEffect(()=>{

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


    },[]);



    const createConversation = async()=>{


        try{


            const res = await fetch(

                `${API}/api/chat/conversation/1`,

                {

                    method:"POST",

                    headers:{

                        Authorization:
                        `Bearer ${token}`

                    }

                }

            );


            const data = await res.json();


            setConversationId(
                data.conversation_id
            );


        }
        catch(err){

            console.log(err);

        }


    };





    // =====================================
    // LOAD MESSAGES
    // =====================================


    useEffect(()=>{


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







    // =====================================
    // SOCKET EVENTS
    // =====================================


    useEffect(()=>{


        socket.on(

            "receive_message",

            (data)=>{


                if(
                    data.conversation_id === conversationId
                ){


                    setMessages(prev=>{


                        const exists =
                        prev.find(
                            m=>m.id===data.id
                        );


                        if(exists)
                            return prev;



                        return [

                            ...prev,

                            data

                        ];


                    });



                }


            }

        );





        socket.on(

            "online_users",

            (users)=>{


                if(users.includes(1)){

                    setAdminOnline(true);

                }


            }

        );





        socket.on(

            "user_connected",

            (data)=>{


                if(data.user_id===1){

                    setAdminOnline(true);

                }


            }

        );





        socket.on(

            "user_disconnected",

            (data)=>{


                if(data.user_id===1){

                    setAdminOnline(false);

                }


            }

        );





        socket.on(

            "user_typing",

            (data)=>{


                if(data.user_id!==user.id){


                    setTypingUser(
                        data.user_name
                    );


                    setTimeout(()=>{

                        setTypingUser(null);

                    },2000);


                }


            }

        );




        return()=>{


            socket.off(
                "receive_message"
            );


            socket.off(
                "online_users"
            );


            socket.off(
                "user_connected"
            );


            socket.off(
                "user_disconnected"
            );


            socket.off(
                "user_typing"
            );


        };


    },[conversationId]);








    // =====================================
    // AUTO SCROLL
    // =====================================


    useEffect(()=>{


        messagesEndRef.current?.scrollIntoView({

            behavior:"smooth"

        });


    },[messages]);








    // =====================================
    // SEND MESSAGE
    // =====================================


    const sendMessage = ()=>{


        if(!message.trim())
            return;



        const tempMessage={


            id:
            Date.now(),


            sender_id:
            user.id,


            receiver_id:
            1,


            message:
            message,


            created_at:
            new Date().toISOString(),


            sending:true


        };



        // show immediately

        setMessages(prev=>[

            ...prev,

            tempMessage

        ]);




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
                message

            }

        );



        setMessage("");



    };









    return (

        <div className="h-screen flex flex-col bg-gray-100">



            {/* HEADER */}

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







            {/* MESSAGES */}


            <div className="flex-1 overflow-y-auto p-5 space-y-3">


                {

                    messages.map(msg=>(


                        <div

                        key={msg.id}

                        className={

                        `flex ${
                            msg.sender_id===user.id

                            ?

                            "justify-end"

                            :

                            "justify-start"

                        }`

                        }


                        >



                            <div

                            className={

                            `max-w-md px-4 py-3 rounded-2xl shadow

                            ${
                                msg.sender_id===user.id

                                ?

                                "bg-red-600 text-white"

                                :

                                "bg-white"

                            }`

                            }


                            >


                                <p>

                                    {msg.message}

                                </p>



                                <div className="text-xs opacity-70 mt-1">


                                    {

                                    new Date(
                                        msg.created_at
                                    )
                                    .toLocaleTimeString(
                                        [],
                                        {
                                            hour:"2-digit",
                                            minute:"2-digit"
                                        }
                                    )

                                    }


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








            {/* INPUT */}


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


                    if(e.key==="Enter"){

                        sendMessage();

                    }


                }}


                placeholder="Message admin..."


                className="
                flex-1
                border
                rounded-full
                px-5
                py-3
                outline-none
                "


                />





                <button

                onClick={sendMessage}


                className="
                bg-red-600
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