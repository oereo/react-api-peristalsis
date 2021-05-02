export const SEND_CHAT = "SEND_CHAT";
export const RECEIVE_CHAT = "RECEIVE_CHAT";
export const CLEAR_CHAT = "CLEAR_CHAT";
export const MY_SOCKET_ID = "MY_SOCKET_ID";

export const sendChat = () => {
    return {
        type: SEND_CHAT
    }
}

export const receiveChat = (data) => {
    return {
        type: RECEIVE_CHAT,
        data
    }
}