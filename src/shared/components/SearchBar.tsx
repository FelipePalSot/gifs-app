import React from 'react'

interface Props {
    placeholder?: string
    text?: string,
}

export const SearchBar = ({placeholder='Buscar', text}: Props) => {
  return (
    <div className="search-container">
       <input type="text" placeholder={placeholder} />
       {text && <button>{text}</button>} 
    </div>
  )
}
