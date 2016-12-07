import React, {Component} from 'react';

class Message extends Component {
  render() {
    var style = { color: this.props.colourScheme };
    if (this.props.content.endsWith(".jpg") || this.props.content.endsWith(".png") || this.props.content.endsWith(".gif")) {
      return (
        <div className="image">
          <span className="username" style={style}>
            {this.props.username}
          </span><br/>
          <img className="img-responsive" src={this.props.content} alt="boohoo" />
        </div>
      )
    } else {
      switch(this.props.type) {
        case "incomingMessage":
          return (
          <div className="message">
            <span className="username" style={style}>
              {this.props.username}
            </span>
            <span className="content">
              {this.props.content}
            </span>
          </div>
          );
        case "incomingNotification":
          return (
            <div className="message system">
              {this.props.content}
            </div>
          );
      }
    }
  }
}

export default Message;
