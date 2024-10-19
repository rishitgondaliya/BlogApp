/* eslint-disable react/prop-types */
import MuiButton from '@mui/material/Button';

const Button = ({
  children,
  type = 'button',
  bgColor = '',
  textColor = 'inherit',
  margin = 0,
  paddingX= 0,
  paddingY= 0,
  fontSize = 0,
  variant = 'contained',
  ...props
}) => {
  return (
    <MuiButton
      type={type}
      sx={{
        backgroundColor: bgColor === 'primary' ? undefined : bgColor,
        color: textColor,
        margin: margin,
        paddingX: paddingX,
        paddingY: paddingY,
        fontSize: fontSize,
      }}
      variant={variant}
      textColor={textColor}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
