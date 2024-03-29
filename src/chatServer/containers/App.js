import { connect } from  'react-redux';
import * as action from '../redux/action/actions';
import io from 'socket.io-client';
import App from '../../../src/App';

const socket = io.connect("http://localhost:3005");

const socketSubscribe = dispatch => {
    socket.on('my socket id', (data) => {
        console.log('mySocketID : ' , data);
        dispatch(action.mySocketId(data.socketId));
    });
    socket.on('receive chat', (data) => {
        console.log("App.js Socket(receive chat) ", data);
        dispatch(action.receiveChat(data));
    });
}

const mapStateToProps = state => {
    console.log("containers/App.js mapStateToProps ", state);
    return state;
};

const mapDispatchToProps = dispatch => {
    socketSubscribe(dispatch);
    return {
        enterChatroom: () => {
            socket.emit('enter chatroom');
        },
        leaveChatroom: () => {
            socket.emit('leave chatroom');
        },
        sendChat: (chat) => {
            socket.emit('send chat', {type: "msg", socketId: socket.id, chat: chat, regDate: Date.now()});
        },
        clearChat: () => {
            dispatch(action.clearChat());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
