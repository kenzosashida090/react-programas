function FinishScreen({points, maxPossiblePoints, highScore,dispatch}) {
    const porcentage= (points / maxPossiblePoints) *100
    return (
        <div>
            <p className="result">

                You Scored : <strong>{points}</strong> out of {maxPossiblePoints} ({Math.ceil(porcentage)})
            </p>
            <p className="highscore">Your HighScore: {highScore}</p>

            <button className="btn btn-ui" onClick={()=> dispatch({type:'restart'})}>Restart Game</button>
        </div>
    )
}

export default FinishScreen
