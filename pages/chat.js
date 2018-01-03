import { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import io from 'socket.io-client'
import Layout from '/components/Layout';
import ChatPanel from '/components/ChatPanel';
import { pageWithAuth } from '/hocs';
import { initStore } from '/store';
import { loadMessage, loadOnlineUser, addMessage, addMessageSocket, joinChat, joinChatSocket, leaveChat, leaveChatSocket } from '/actions/chat';

class ChatPage extends Component {
  constructor(props) {
    super(props);

    props.dispatch(loadMessage());
    props.dispatch(loadOnlineUser());
  }

  componentDidMount() {
    this.socket = io();
    this.props.dispatch(joinChatSocket(this.socket, this.props.session.user.username));
    this.socket.on('messageAdded', (message) => {
      this.props.dispatch(addMessage(message));
    });
    this.socket.on('userJoined', (data) => {
      this.props.dispatch(joinChat(data));
    });
  }

  // close socket connection
  componentWillUnmount () {
    this.props.dispatch(leaveChatSocket(this.socket, this.props.session.user.username));
    this.socket.disconnect();
  }

  // send messages to server and add them to the state
  handleSubmit = field => {
    // create message object
    const message = {
      id: (new Date()).getTime(),
      text: field,
      username: this.props.session.user.username,
      timestamp: new Date()
    }
    // dispatch actions to emit event from socket
    this.props.dispatch(addMessageSocket(this.socket, message));
  }

  render() {
    const { messages, users, session, isLoading } = this.props;
    console.log(users);
    return (
      <Layout title="Chat">
        {isLoading && <p>Now loading..</p>}
        {!isLoading && messages && 
        <ChatPanel 
          messages={messages}
          users={users}
          currentUsername={session.user.username}
          submit={this.handleSubmit}
        />
        }
      </Layout>
    );
  }
}

const mapStateToProps = ({ authReducer, chatReducer }) => {
  return {
    session: authReducer.session,
    isLoading: chatReducer.isLoading,
    message: chatReducer.message,
    messages: chatReducer.messages,
    users: chatReducer.users
  }
};


export default withRedux(initStore, mapStateToProps, null)(pageWithAuth(ChatPage));