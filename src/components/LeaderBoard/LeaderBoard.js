import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { quoteActions } from "../../store/quote";

const LeaderBoard = () => {

    const errorNum = useSelector(state => state.quote.errorNum)

    const numOfLetters = useSelector(state => state.quote.numOfLetters)

    const uniqueCharacters = useSelector(state => state.quote.uniqueCharacters)

    const scoreNum = useSelector(state => state.quote.scoreNum)

    const username = useSelector(state => state.quote.username)

    const seconds = useSelector(state => state.quote.seconds)

    const sendPlayerDataUrl = 'https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task/highscores'

    const dispatch = useDispatch()

    let duration = Math.round(performance.now()/1000)

    let effectFunction = () => {}

        if(
            (username !== '') &&
            (errorNum < 6) &&
            (numOfLetters !== scoreNum) && 
            (numOfLetters > 0)
        ){

            effectFunction = () => {
                setTimeout(()=>{
    
                    dispatch(quoteActions.setSeconds())
        
                }, 1000)
            }
        }


    useEffect(
        effectFunction,
        [dispatch, duration]
    )

    const data = {
        quoteId: Math.random(),
        length: numOfLetters,
        uniqueCharacters: uniqueCharacters,
        userName: username,
        errors: errorNum,
        duration: seconds
    }

    if(
        (numOfLetters === scoreNum) && 
        (numOfLetters > 0)
    ){

        console.log(data)

        fetch(sendPlayerDataUrl, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        })
        .catch((error) => {
        console.error('Error:', error);
        });

    }

    const calcHour = (seconds / 3600) // 5000sec / 3600sec
    const hours = parseInt(calcHour, 10) // 1h

    const calcMin = (seconds / 60) // 5000sec / 60sec
    const minRemainder = ((calcHour - parseInt(calcHour)) * 100) // 33
    const mins = ((minRemainder * 60) / 100) // 19
    const minutes = parseInt(mins, 10) // 23 min

    const secRemainder = Math.round((calcMin - parseInt(calcMin)) * 100) // 30
    const sec = Math.round((secRemainder * 60) / 100) // 18

    return (

        <div className='LeaderBoard'>

            <div>Username: {username}</div>
            
            <div>Attempts: {errorNum}/6</div>

            <div>

                Duration:  

                {
                        ' ' +

                    (hours > 9 ? hours : '0' + hours) 

                        + ':' + 

                    (minutes > 9 ? minutes : '0' + minutes) 

                        + ':' + 

                    (sec > 9 ? sec : '0' + sec)

                }


            </div>

        </div>

    )

}

export default LeaderBoard