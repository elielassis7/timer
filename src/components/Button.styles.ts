import styled, { css } from 'styled-components'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';

interface ButtonContainerProps{
  variant: ButtonVariant;
}

const buttonVariants = {
  primary: 'blue',
  secondary: 'orange',
  success: 'green',
  danger: 'red'
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;

  ${props => {
    return css`background-color: ${buttonVariants[props.variant]}`
  }}
`