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
    if (this.state.username !== event.target.value) {
      if (event.target.value) {
        this.props.changeUsername(this.state.username + " has changed their name to " + event.target.value);
      }
      if (!event.target.value && this.state.username !== "Anonymous") {
        this.props.changeUsername(this.state.username + " has changed their name to " + "Anonymous");
      }
    }
    this.setState({username: event.target.value ? event.target.value : "Anonymous"}) 
    // suggestion: store the username in the state of App and pass it down as a prop,
    // thus avoiding having to manage state in two places.
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
        <input
          onBlur={this.handleChangeUsername}
          id="username"
          type="text"
          placeholder="Your Name (Optional)"
        />
        <input
          onChange={this.handleChangeMessage}
          onKeyPress={this.enterMessage}
          id="new-message"
          type="text"
          placeholder="Type a message and hit ENTER"
        />
      </footer>
    );
  }
}

export default ChatBar;
