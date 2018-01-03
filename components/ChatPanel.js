import { Component } from 'react';
import ChatBubble from '/components/ChatBubble';
import ChatInput from '/components/ChatInput';

export default class ChatPanel extends Component {

  state = {
    field: ''
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  onSubmit = event => {
    event.preventDefault();
    this.setState({
      field: ''
    });
    this.props.submit(this.state.field)
  }

  onChange = event => {
    this.setState({
      field: event.target.value
    });
  }

  scrollToBottom() {
    this.endOfMessage.scrollIntoView({ behaviour: 'smooth' });
  }

  render() {
    const { field } = this.state;
    const { messages, users, currentUsername } = this.props;
    return (
      <div className="chat">
        <div className="chat-history">
          <ul className="chat-ul">
            {messages.length > 0 && messages.map(message => (
              <ChatBubble 
                key={message.id}
                message={message.text}
                timestamp={message.timestamp}
                username={message.username}
                isOther={message.username !== currentUsername}
              />
            ))}
            {messages.length === 0 && <p>Be the first to say hello..</p>}
            <li ref={el => { this.endOfMessage = el; }}></li>
            <ChatInput
              onChange={this.onChange}
              onSubmit={this.onSubmit}
              field={field}
              users={users}
            />
           </ul>
        </div>
      </div>
    );
  }
}