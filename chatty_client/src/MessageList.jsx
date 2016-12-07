import React, {Component} from 'react';
import Message from './Message.jsx';
import ReactDOM from 'react-dom';

class MessageList extends Component {
  render() {
    return (
      <div id="message-list">
        {this.props.messages.map((message, idx) => {
          return <Message
            type={message.type}
            key={message.id}
            colourScheme={message.colourScheme}
            username={message.username}
            content={message.content}
            ref={(ref) => this['_div' + idx] = ref}
          />
        })}
      </div>
    );
  }
  componentDidUpdate() {
    var len = this.props.messages.length - 1;
    const node = ReactDOM.findDOMNode(this['_div' + len]);
    if (node) {
      node.scrollIntoView();
    }
  }

}

export default MessageList;
