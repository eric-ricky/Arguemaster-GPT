import React from 'react'

interface IProps {
    size:string
}

const LoadingSpinner:React.FC<IProps> = ({size}) => {
  return (
    <div className={`rounded-full border border-l-0 animate-spin ${size}`}></div>
  )
}

export default LoadingSpinner