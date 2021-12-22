import React from "react"
import ModalContainer from "../ModalContainer/ModalContainer"
// import MiniLoader from "./MiniLoader"

const FullLoader = () => {
  return (
    <ModalContainer>
      <div className="loading-spinner loading-spinner-big"></div>
    </ModalContainer>
  )
}

export default FullLoader
