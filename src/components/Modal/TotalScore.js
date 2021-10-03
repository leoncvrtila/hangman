import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";

const TotalScore = () => {

    const errorNum = useSelector(state => state.quote.errorNum)

    const uniqueCharacters = useSelector(state => state.quote.uniqueCharacters)

    const seconds = useSelector(state => state.quote.seconds)

    const numOfLetters = useSelector(state => state.quote.numOfLetters)

    const scoreNum = useSelector(state => state.quote.scoreNum)

    const [playersData, setPlayersData] = useState([])

    const getPlayersDataUrl = 'https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task/highscores'
    
    let errorPoints = 0
    let uniqueLetterPoints = 0
    let timePoints = 0


        switch (errorNum) { // check errors
            case 0:
                errorPoints = 6
                break
            case 1:
                errorPoints = 5
                break
            case 2:
                errorPoints = 4
                break
            case 3:
                errorPoints = 3
                break
            case 4:
                errorPoints = 2
                break
            case 5: 
                errorPoints = 1
                break
            case 6:
                errorPoints = 0
                break
            default:
                errorPoints = 0
        }

        uniqueLetterPoints = uniqueCharacters // set unique letters

        switch (true) { // check seconds
            case (seconds <= 30):
                timePoints = 30
                break
            case (seconds <= 45):
                timePoints = 25
                break
            case (seconds <= 60):
                timePoints = 20
                break
            case (seconds <= 75):
                timePoints = 15
                break
            case (seconds <= 100):
                timePoints = 10
                break
            case (seconds <= 115): 
                timePoints = 5
                break
            case (seconds > 115):
                timePoints = 0
                break
            default:
                timePoints = 0
        }

        const totalScore = errorPoints + uniqueLetterPoints + timePoints
    
        const maxScore = 6 + 30 + uniqueLetterPoints


        
    if(
        (numOfLetters === scoreNum) && 
        (numOfLetters > 0)
    ){


        fetch(getPlayersDataUrl)
        .then(response => response.json())
        .then(data => {

            let newData = []

            for(let key in data){

                let time = (data[key].duration/1000)
                let timePoints = 0

                switch (true) { // check seconds
                    case (time <= 30):
                        timePoints = 30
                        break
                    case (time <= 45):
                        timePoints = 25
                        break
                    case (time <= 60):
                        timePoints = 20
                        break
                    case (time <= 75):
                        timePoints = 15
                        break
                    case (time <= 100):
                        timePoints = 10
                        break
                    case (time <= 115): 
                        timePoints = 5
                        break
                    case (time > 115):
                        timePoints = 0
                        break
                    default:
                        timePoints = 0
                }

                newData.push({
                    id: data[key].id,
                    userName: data[key].userName,
                    totalScore: Math.round(data[key].errors + data[key].uniqueCharacters + timePoints),
                    maxScore: 6 + 30 + data[key].uniqueCharacters
                })

                
            }

            setPlayersData([...newData])

        })
        .catch((error) => {
        console.error('Error:', error);
        });

    }
    

    return (
    
        <Fragment>

            <div className='TotalScore'>Your score is: {totalScore}/{maxScore}</div>
    
            {
                playersData.map(p => {

                    return (

                        <div key={p.id} className='Player'>
                            <p>Username: {p.userName}</p>
                            <p>Total Score: {p.totalScore}/{p.maxScore}</p>
                        </div>

                    )

                })
            }

        </Fragment>
    
    )

}

export default TotalScore