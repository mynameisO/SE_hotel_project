import React, { useState, useEffect } from "react"

export default function Bookingroom() {

    const [data,setData] = useState([]);

    const getData = ()=>{
        fetch('http://localhost:3050/roombooking',{headers : {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
        }}).then((res)=>{
            return res.json()
        }).then((myjson)=>{
            //console.log(data) 
            setData(myjson)
        })
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <div>
            {
                data && data.length > 0 && data.map((value)=>{
                    return(
                        <h1 key={value.id}>{value.title}</h1>
                    )
                })
            }
        </div>
    )
}