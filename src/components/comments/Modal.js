import React, {Fragment} from 'react'
import ReactDOM from "react-dom";
import './Modal.css'
const BackDrop = () => {
    return (
        <div className='backdrop'></div>
    )
}

const Overlay = ({children}) => {
    return (
        <div className='overlay'>
            {children}
        </div>
    )
}
const Modal = ({children}) => {
    const modalDiv = document.getElementById('modal');

  return (
    <Fragment>
        {ReactDOM.createPortal(<BackDrop />, modalDiv)}
        {ReactDOM.createPortal(<Overlay>{children}</Overlay>, modalDiv)}
    </Fragment>
  )
}

export default Modal