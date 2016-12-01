import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return (

      <div id="message-list">
        {this.props.messages.map((message) => {
          return <Message key={message.id} colourScheme={message.colourScheme} username={message.username} content={message.content} />
        }
        )}
        <div className="message system">
          {this.props.notification}
        </div>
      </div>
    );
  }
}
export default MessageList;
