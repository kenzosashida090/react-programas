
import { useEffect, useReducer } from 'react';
import './App.css';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error'
import StartScreen from './StartScreen';
const initialState = {
  questions:[],
  // loading, error, ready, active,, finished
  status:'loading',
}
function reducer(state, action){
  switch(action.type){
    case 'dataReceived':
      return{...state, questions:action.payload, status:'ready'}
    case 'dataFailed':
      return{...state,status:'error'}
      default:
        throw new Error('Action unknown')
  }


}
function App() {
  const [{questions, status},dispatch] = useReducer(reducer, initialState)


  const numQuestions = questions.length
  useEffect(function(){
    async function fetchQuiz(){
      try{
      const data = await fetch('http://localhost:8000/questions')
      const res = await data.json()
      dispatch({type:'dataReceived', payload:res})
      console.log(res)  
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
      /> }
      </Main>
   </div>
  );
}

export default App;
