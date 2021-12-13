import React, {useState, useEffect} from 'react'
import './styles.scss'
const Spinner = (props) => {
  const [spin, setSpin] = useState(true);

  useEffect(() => {
    const { duration } = props;
    showSpinner(duration).then(() => {
      setTimeout(() => {
        document.getElementById('spinner').remove()
      }, 500)
    })
   
}, []);

  const showSpinner = (duration) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        setSpin(false);
        document.body.classList.remove('no-overflow')
        resolve()
      }, duration)
    })
  }

  return (
    <div
      className={`spinner-container ${spin ? 'show' : ''}`}
      id="spinner"
    >
      <div className="spinner">
        <div className="ring"></div>
        <div className="ring"></div>
        <div className="dot"></div>
      </div>
    </div>
  )
}

export default Spinner;
