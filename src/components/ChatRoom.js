import React, { Component } from 'react'

class ChatRoom extends Component {

    constructor(props, context){
      super(props, context)
      this.updateMessage = this.updateMessage.bind(this)
      this.submitMessage = this.submitMessage.bind(this)
      this.state = {
          message: '',
          messages: []
      }
  }

  componentDidMount(){
      console.log('componentDidMount')
      firebase.database().ref('messages/').on('value', (snapshot)=> {

          const currentMessages = snapshot.val()

          if (currentMessages != null){
              this.setState({
                  messages: currentMessages
              })
          }
      })

  }

  updateMessage(event){
      console.log('updateMessage: '+event.target.value)
      this.setState({
          message: event.target.value
      })
  }

  submitMessage(event){
        console.log('submitMessage: '+this.state.message)
        const nextMessage = {
            id: this.state.messages.length,
            text: this.state.message
        }

        firebase.database().ref('messages/'+nextMessage.id).set(nextMessage)

          // var list = Object.assign([],  this.state.messages)
          // list.push(nextMessage)
          // this.setState({
          //    messages: list
          // })
    }

    render(){
      //looping through the messages array inside the state and we're returning a list item for each one.
      //where the message itself is being passed into the map function and we're rendering the text of the
      //message inside the list item. That would concatentate the message in "currentMessage" into all list items.
      const currentMessage = this.state.messages.map((message, i) => {
          return (
              <li key={message.id}>{message.text}</li>
          )
      })
        return (
            <div>
              <ol>
                {currentMessage}
              </ol>
              <input onChange={this.updateMessage} placeholder="Message" />
              <br />
              <button onClick={this.submitMessage}>Submit Message</button>
            </div>

        )
    }
  }

export default ChatRoom
