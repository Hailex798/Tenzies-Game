import React from "react"

export default function Die(prop){
    return (
        <div className={prop.isHeld ? "die is--green" : "die"} onClick={() => prop.holdDice(prop.id)}>
            <h1>{prop.value}</h1>
        </div>
    )
}