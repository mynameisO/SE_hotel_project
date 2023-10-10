import React, { useState, useEffect } from "react"

export default function Bookingroom() {

    const getData = ()=>{
        fetch('http://localhost:3050/roombooking',{headers : {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
        }}).then((res)=>{
            return res.json()
        }).then((data)=>{
            console.log(data)  
        })
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <div>

        </div>
    )
}