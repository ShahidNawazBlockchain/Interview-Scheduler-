"use client"
import React from 'react'
import { useState , useEffect } from 'react'
import axios from 'axios'
const Zoom = () => {
    const {userName , setUserName} = useState("shahid")

    const meeting=()=>{
     const   data={
        email:"shahidnawaz.edu.pk@gmail.com"
        }
        axios.post("http://localhost:5000/meeting",data)
        .then((response)=> {
            let URL=
            response.data.join_url.replacerAll(
                "https://us04web.zoom.us/j/",
                "http://localhost:9998/?"
            )+ `?role=1?name=${userName}`
            console.log(URL)
            window.location.replace(`${URL}`)
        }).catch((error)=>{
            console.log(error)
        })
    }

  return (
    <div>
    <button onClick={()=>meeting()}>
    create meeting
    </button>
    </div>
  )
}

export default Zoom