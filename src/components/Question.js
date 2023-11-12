import Option from "./Option"

function Question({question, dispatch, answer,index}) {
    
    console.log(question)
    
    return (
        <div>
            <h4>{question.question}</h4>
            <div className="options">
                <Option question={question} dispatch={dispatch} answer={answer} index= {index}/>
            </div>

           
        </div>
    )
}

export default Question
