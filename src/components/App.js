
import { useEffect, useReducer } from 'react';
import '../App.css';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error'
import StartScreen from './StartScreen';
import Question from './Question';
import NextQuestion from './NextQuestion';
import Progress from './Progress';
import FinishScreen from './FinishScreen';
import Footer from './Footer';
import Timer from './Timer';
const initialState = {
  questions:[],
  // loading, error, ready, active,, finished
  status:'loading',
  index:0,
  answer:null,
  points:0,
  highScore: 0,
  secondsRemaning: null
  
}
const SEC_PER_QUESTION = 30
function reducer(state, action){
  switch(action.type){
    case 'dataReceived':
      return{...state, questions:action.payload, status:'ready'}
    case 'dataFailed':
      return{...state,status:'error'}
    case 'start':
      return{...state, status:'active', secondsRemaning: state.questions.length * SEC_PER_QUESTION}
    case 'newAnswer':
      const question = state.questions.at(state.index)
      return{...state, answer: action.payload,
        points: action.payload === question.correctOption ? state.points + question.points : state.points,
      }
    case 'nextQuestion': 
      return {...state, index: state.index + 1, answer: null}
    
    case 'finished':
      return {...state, status:'finished', highScore: state.highScore > state.points ? state.highScore : state.points }
    case "restart":
     return {...initialState, questions: state.questions, status:'ready'}
    case "tick":
      return{...state, secondsRemaning: state.secondsRemaning - 1, status: state.secondsRemaning === 0 ? "finished": state.status}
    default:
        throw new Error('Action unknown')
  }
}
function App() {
  const [{questions, status, index, answer, points, highScore, secondsRemaning},dispatch] = useReducer(reducer, initialState)

  
  const numQuestions = questions.length
  const maxPossiblePoints = questions.reduce((prev, cur) => prev + cur.points, 0)

  console.log("Num points", maxPossiblePoints)
  useEffect(function(){
    async function fetchQuiz(){
      try{
      const data = await fetch('http://localhost:8000/questions')
      const res = await data.json()
      dispatch({type:'dataReceived', payload:res})
      
      }catch (err){
          console.log(err)

          dispatch({type:'dataFailed'})
      }
    }
    fetchQuiz()
  },[])
  return (
   <div className='app'>
      <Header/>
      <Main>
      {status === 'loading' && <Loader/>}
      {status === 'error' && <Error/>}
      {status === 'ready' && <StartScreen numQuestions={numQuestions}
      dispatch={dispatch}
      /> }
      {status === 'active' && 
        <>
      <Progress index={index} answer={answer} numQuestions={numQuestions} points={points} maxPossiblePoints={maxPossiblePoints}/>
      <Question question={questions[index]} dispatch={dispatch} answer={answer} index = {index} /> 
      <Footer>
      <Timer dispatch={dispatch} secondsRemaning={secondsRemaning}/>
      <NextQuestion dispatch={dispatch} answer={answer} points={points} numQuestions={numQuestions} index={index}/>
      </Footer>
        </>
      }
      {status === 'finished' && 
        <FinishScreen maxPossiblePoints={maxPossiblePoints} points={points} highScore={highScore} dispatch={dispatch}/>
      }
      </Main>
   </div>
  );
}
export default App;
