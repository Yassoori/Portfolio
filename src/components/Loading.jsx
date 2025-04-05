import React from 'react'
import { TailSpin } from "react-loader-spinner";


const Loading = () => {
  return (
    <>
    <div id="loader-box">
      <div id="loader">
      <TailSpin
        color="#303030"
        height={100}
        width={100}
      />
      </div>
      </div>
    </>
  )
}

export default Loading
