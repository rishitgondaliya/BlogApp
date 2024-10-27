/* eslint-disable react/prop-types */
import logo from '../../assets/logo/logo.png'

function Logo({width = '120px'}) {
  return (
    <div>
      <img src={logo} alt="" width={width}/>
    </div>
  )
}

export default Logo