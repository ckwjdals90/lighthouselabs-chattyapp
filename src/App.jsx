import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ],
      newMessage: ""
    };
      this.composeNewMessage = this.composeNewMessage.bind(this)
  }

  composeNewMessage(message) {
    // debugger;

    this.setState({
      messages: this.state.messages.concat({
        id: (this.state.messages.length + 1),
        username: message.username,
        content: message.content
      })
    })
  }

  componentDidMount() {
    console.log("comnponentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // const newMessage = { id: 3, username: "Michelle", content: "Hello there"};
      // const messages = this.state.messages.concat(newMessage)

      // this.setState({ messages: messages})
    }, 3000);
  }

  render() {
    return (
      <div>
        <nav>
          <h1>Chatty</h1>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar composeNewMessage={this.composeNewMessage} currentUser={this.state.currentUser} />
      </div>
    );
  }
}
export default App;

