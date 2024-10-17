/* eslint-disable react/prop-types */

function Button({
  children,
  type = 'button',
  bgColor = 'bg-blue-600',
  textColor = 'text-white',
  className = '',
  ...props
}) {
  return (
    <button className={`py-1 px-2 rounded-lg ${type} ${bgColor} ${textColor} ${className}`} {...props}>
      {children}
    </button>
  )
}

export default Button