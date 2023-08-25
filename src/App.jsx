import React from "react"
import Container from "./components/Container"
import Die from "../src/components/Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import { parseExpressionAt } from "acorn"

export default function App(){
    function allnewDice(){
        const DiceArray = []
        for(let i=0 ; i<10 ; i++){
            const Dice = {
                value: Math.ceil(Math.random()*6),
                isHeld: false,
                id: nanoid()
            }
            DiceArray.push(Dice);
        }
        return DiceArray
    }
    function changeDice(){
        const newDices = allnewDice()
        const finalDices = []
        
        for(let i=0 ; i<10 ; i++){
            if(Dice[i].isHeld == true){
                finalDices[i] = Dice[i]
            }else{
                finalDices[i] = newDices[i]
            }
        }
        setDice(finalDices)
        if(!Tenzies){
            setCount(prev => prev+1)
        }
    }
    function holdDice(id){
        const updatedDice = Dice.map(x => {
            return (id == x.id) ? {...x, isHeld: !x.isHeld} : x
        })
        setDice(updatedDice)
    }
    function resetDice(){
        setDice(allnewDice)
        setTenzies(false)
        setCount(0)
    }

    const [Dice, setDice] = React.useState(allnewDice())
    const [Tenzies, setTenzies] = React.useState(false)
    const [count, setCount] = React.useState(0)

    const Dices = Dice.map(x => {
        return <Die key={x.id} value={x.value} id={x.id} holdDice={holdDice} isHeld={x.isHeld}/>
    })

    React.useEffect(() => {
        let impostor = false
        const val = Dice[0].value
        for(let i=0 ; i<10 ; i++){
            if(Dice[i].value != val || Dice[i].isHeld == false) impostor = true
        }
        setTenzies(!impostor)
    }, [Dice])

    return (
        <main className="main">
            {Tenzies && <Confetti />}
            {/* Main Heading */}
            <h1 className="main--heading">Tenzies Game</h1>
            {Tenzies ? <h2>You won the Game! in {count} chances 🥳🎉🎊</h2> : <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>}
            {/* Container Component */}
            <Container 
            Dices={Dices}/>
            {/* Roll Button */}
            <div className="btns">
                <button className="roll--btn" onClick={changeDice}>Roll Dices</button>
                <button className="reset--btn" onClick={resetDice}>🔄</button>
            </div>
        </main>
    )
}