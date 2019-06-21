import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';

const newQuiz = [ {
  name:"Food Quiz",
  author:"me",
  questions:[
    {
      questionName: "What do you like most",
      answers:[
        {
          text:"Bananas"
        },
        {
          text:"Oranges"
        },
        {
          text:"Apples"
        }
      ],
      questionName: "What is your favorite vacation spot?",
      answers: [
        {
          text: "Hawaii"
        },
        {
          text: "Colorado"
        },
        {
          text: "Dayton"
        }
      ]
    }
  ]
}
]


class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      quizzes: newQuiz
    }
  }

  // componentDidMount(){
  //   fetch('http://localhost:8080/get-all-quizzes')
  //   .then(response => {
  //     return response.json();
  //   })
  //   .then(myJson => {
      
  //     this.setState({
  //       quizzes: myJson
  //     }, () => {
  //       console.log(this.state.quizzes)
  //     })
  //     //console.log(this.state.quizzes);
  //   });
  // }

  handleAddQuiz = (e) => {
    e.preventDefault();
    console.log(e);
    fetch('http://localhost:8080/add-quiz', {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json' 
    },
    method: 'POST',
    body: JSON.stringify(newQuiz),
    }) 
    .then(res => {
      if(res.status === 200){
        console.log("quiz added")
      } else {
        console.log("something died")
      }
    })
    .catch(err => {
      console.logg(err)
    })
  }
  
  render() {
    return (
      <div className = "App container">
        <nav class="navbar navbar-light bg-light">
          <span class="navbar-brand mb-0 h1">OpenQuiz</span>
          {/* <button onClick={(e => this.handleAddQuiz(e))}>Add Quiz</button> */}
          <i  onClick={(e => this.handleAddQuiz(e))} class="fas fa-plus-circle"></i>
        </nav>
        {this.state.quizzes.map((quiz, index) => {
          return (
            <div key={index}>
              <p>Quiz name: {quiz.name}</p>
              <p>Author: {quiz.author}</p>
              {quiz.questions.map((question, index) => {
                return (
                  <div key ={index}>
                    <p>Question {index + 1}: {question.questionName}</p>
                    {question.answers.map((answer, index) => {
                      return(
                        <p key={index}>
                          {answer.text}
                        </p>
                      )
                    })}
                  </div>
                )
              })}
              <hr></hr>
            </div>
          )
        })}
      </div>
    );
  }
}


export default App;
