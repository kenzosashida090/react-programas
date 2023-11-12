function NextQuestion( {dispatch, answer, numQuestions, index}) {
    if(answer === null){
        return null
    }
   
    if(index  < numQuestions -1) {
    return (
        <div>
            <button className="btn" onClick={()=>dispatch({type:"nextQuestion"})}>Next Question</button>
        </div>
    )
    }
    if(index  === numQuestions -1) {
        return (
            <div>
                <button className="btn" onClick={()=> dispatch({type: 'finished'})}>Check Results</button>
            </div>
        )
        }


}
 

export default NextQuestion