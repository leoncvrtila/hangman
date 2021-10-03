import { createSlice } from '@reduxjs/toolkit'
import { lowerCase, upperCase } from '../components/Letters/Data'
import { rgx, rgxWithSpace } from '../components/rgx'

const initialState = {

    quote: [], 
    letter: '', 
    errorNum: 0, 
    start: true, 
    numOfLetters: 0, 
    scoreNum: 0, 
    uniqueCharacters: 0,
    seconds: 0, 
    username: '' , 
    lowerCase: [...lowerCase], 
    upperCase: [...upperCase]

}

const quoteSlice = createSlice({
    name: 'quote',
    initialState: initialState,
    reducers: {
        setQuote(state, action) {

            if(action.payload.text) { // transform data

                console.log(action.payload.text)

                let wordsSplit = action.payload.text !== undefined ? action.payload.text.split('') : ''

                let charArray = []

                let uniqueCharacters = []
            
                for(let key in wordsSplit){
            
                    charArray.push(
                        {
                            value: wordsSplit[key],
                            status: wordsSplit[key].match(rgx) ? true : false
                        }
                    )

                    if(!wordsSplit[key].match(rgxWithSpace)){

                        state.numOfLetters += 1
        
                    }

                    if (
                        (uniqueCharacters.indexOf(wordsSplit[key]) === -1) && 
                        (!wordsSplit[key].match(rgxWithSpace))
                        ) {

                        uniqueCharacters.push(wordsSplit[key])
                        
                        state.uniqueCharacters = uniqueCharacters.length
                        
                    }
            
                }

                state.quote = charArray
            
            } else { // on clicking every letter

                let upperCase = []

                let lowerCase = []

                if(action.payload.lettersTransform) {

                    for(let key in state.upperCase){
    
                        upperCase.push({
                            letter: state.upperCase[key].letter,
                            disabled: state.upperCase[key].letter === state.letter || state.upperCase[key].disabled ? true : false
                        })
                       
                    }

                    state.upperCase = [...upperCase]

                } else {

                    for(let key in state.lowerCase){

                        lowerCase.push({
                            letter: state.lowerCase[key].letter,
                            disabled: state.lowerCase[key].letter === state.letter || state.lowerCase[key].disabled ? true : false
                        })
                       
                    }
    
                    state.lowerCase = [...lowerCase]

                }                

                state.quote = action.payload.array

            }


        },
        setClickedLetter(state, action){

            state.letter = action.payload

        },
        setStart(state, action){

            if(action.payload){

                state.start = false
                
                state.username = action.payload

            }
            
        },
        setScoreNum(state, action){

            state.scoreNum += action.payload

        },
        setErrorNum(state, action) {

            state.errorNum += action.payload

        },
        setSeconds(state, action) {

            
            state.seconds +=1 

        },
        setReset(state, action){

            state.numOfLetters = 0

            state.scoreNum = 0

            state.errorNum = 0

            state.seconds = 0

            state.lowerCase = [...lowerCase]

            state.upperCase = [...upperCase]

        }
    }
})

export const quoteActions = quoteSlice.actions

export default quoteSlice.reducer