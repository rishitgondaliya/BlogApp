/* eslint-disable react/prop-types */
import logo from '../../assets/icon.png'

function Logo({width = '100px'}) {
  return (
    <div>
      <img src={logo} alt="" width={width}/>
    </div>
  )
}

export default Logo