import { Component } from 'react';

export default class ChatBubble extends Component {
  formatDate(d) {
    const date = new Date(d);
    const h = date.getHours().toString(), m = date.getMinutes().toString();
    const hours = h.length === 1? `0${h}` : h;
    const minutes = m.length === 1? `0${m}` : m;
    const month = date.getMonth() + 1;
    return `${hours}:${minutes} ${date.getDate()}/${month}/${date.getUTCFullYear()}`;    
  }
    
  render() {
    const { message, timestamp, username, isOther } = this.props;
    const timestampFormatted = this.formatDate(timestamp);

    if(username === 'system') {
      return (
        <li>
          <p className="chat-system text-center">
            {message} at {timestampFormatted}
          </p>
        </li>
      );
    }

    return (
      <li className={isOther? "clearfix" : null}>
        <div className={isOther? "message-data align-right" : "message-data"}>
          <span className="message-data-name">
            {!isOther? <i className="fa fa-circle you"></i> : null} 
            {" "}
            {isOther? `${timestampFormatted} - ` : null}
            {isOther? username : "You"} 
            {" "}
            {isOther? <i className="fa fa-circle me"></i> : null}</span>
            {!isOther? ` - ${timestampFormatted}` : null}
        </div>
        <div className={isOther? "message me-message float-right" : "message you-message"}>
          {message}
        </div>
      </li>
    );
  }
}