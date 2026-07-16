const API = "http://127.0.0.1:5000";

const headers = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
});

// ======================================
// GET USERS
// ======================================

export async function getUsers() {
    const res = await fetch(`${API}/api/chat/users`, {
        headers: headers(),
    });

    return await res.json();
}

// ======================================
// CREATE / GET CONVERSATION
// ======================================

export async function createConversation(userId) {
    const res = await fetch(
        `${API}/api/chat/conversation/${userId}`,
        {
            method: "POST",
            headers: headers(),
        }
    );

    return await res.json();
}

// ======================================
// LOAD MESSAGES
// ======================================

export async function getMessages(conversationId) {
    const res = await fetch(
        `${API}/api/chat/messages/${conversationId}`,
        {
            headers: headers(),
        }
    );

    return await res.json();
}

// ======================================
// MY CONVERSATIONS
// ======================================

export async function getMyConversations() {
    const res = await fetch(
        `${API}/api/chat/my-conversations`,
        {
            headers: headers(),
        }
    );

    return await res.json();
}