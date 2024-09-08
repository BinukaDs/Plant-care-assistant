import { Button } from "./button";
import { tailspin } from 'ldrs'
tailspin.register()

interface ButtonProps {
  isLoading: boolean;
  text: string;
  onClick?: VoidFunction 
}
const button = ({ text, isLoading, onClick }: ButtonProps) => {
  return (
    <Button onClick={onClick}>{
      isLoading ?
        <l-tailspin
          size="32"
          stroke="5"
          speed="0.9"
          color="white"
        ></l-tailspin> : text
    }</Button>
  )
}

export default button