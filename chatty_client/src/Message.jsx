import React, {Component} from 'react';

class Message extends Component {
  render() {
    var style = {
      color: this.props.colourScheme
    };
    return (
    <div
      className="message">
      <span
      className="username" style={style}>
        {this.props.username}</span>
      <span
      className="content">
        {this.props.content}</span>
    </div>
    );
  }
}
export default Message;






