import React, {Component} from 'react';


class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "Anonymous",
      content: ""
    }
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangeMessage = this.handleChangeMessage.bind(this);
    this.enterMessage = this.enterMessage.bind(this);

  }

  handleChangeUsername(event) {
    this.setState({username: event.target.value})
  }

  handleChangeMessage(event) {
    this.setState({content: event.target.value})
  }

  enterMessage(event) {
    if (event.charCode==13) {
      this.props.composeNewMessage(this.state);
      event.target.value = "";
    }
  }

  render() {
    return (
      <footer>
        <form onKeyPress={this.enterMessage}>
          <input onChange={this.handleChangeUsername}
            id="username"
            type="text"
            placeholder="Your Name (Optional)"
          />
          <input onChange={this.handleChangeMessage}
          id="new-message"
          type="text"
          placeholder="Type a message and hit ENTER"
          />
        </form>
      </footer>
    );
  }
}
export default ChatBar;
