import React from "react";

const GuessLines = (props) => {

    const mapWords = props.charArray.map(wordObj => {

        let char = []

        for(let key in wordObj){

            char.push({
                char: wordObj[key]
            })

        }

        return (

            <div className='WordChar' key={Math.random()}>

                {      
                    wordObj.value !== ' ' ?

                        <div className='CharWrapp' >

                            <div className='Char'>
                                {
                                    wordObj.status ? wordObj.value : ''
                                }
                            </div>

                        <div className='CharLine'></div>

                        </div>

                    : 
                                    
                        <div className='CharSpace'></div>

                }

            </div>    

        )

    })

    return (

        <div className='GuessLines'>

            {mapWords}

        </div>

    )

}

export default GuessLines