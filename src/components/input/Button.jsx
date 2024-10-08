/* eslint-disable react/prop-types */

function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-300',
    textColor = 'text-white',
    className = '',
    ...props
}) {
  return (
    <button className={`px-4 py-2 rounded-full ${type} ${bgColor} ${textColor} ${className}`} {...props}>
        {children}
    </button>
  )
}

export default Button