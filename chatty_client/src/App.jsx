import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      receivedMessage: ""
    };
    this.composeNewMessage = this.composeNewMessage.bind(this)
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://localhost:4000");
    console.log("Connected to Server: ", this.socket);

    this.socket.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      this.setState({
        messages: this.state.messages.concat({
          id: receivedMessage.id,
          username: receivedMessage.username,
          content: receivedMessage.content
        })
      })
    }

  }

  // composeNewMessage = message => {
  //   this.setState({
  //     messages: this.state.messages.concat({
  //       id: (this.state.messages.length + 1),
  //       username: message.username,
  //       content: message.content
  //     })
  //   });
  //   this.socket.send(JSON.stringify({ id: uuid.v1(), username: message.username, content: message.content }));
  // }

  composeNewMessage = message => {
    // const receivedMessage =
    // this.setState({messages: this.state.messages.concat(receivedMessage)})
    this.socket.send(JSON.stringify({
      username: message.username,
      content: message.content
    }));


  }

  render() {
    return (
      <div>
        <nav>
          <h1>Chatty</h1>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar composeNewMessage={this.composeNewMessage} />
      </div>
    );
  }
}

export default App;
