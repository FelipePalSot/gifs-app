import { useEffect, useState, type KeyboardEvent } from 'react';

interface Props {
    placeholder?: string
    text?: string,

    onQuery: (query: string) => void;
}

export const SearchBar = ({placeholder='Buscar', text, onQuery}: Props) => {
    const [query, setQuery] = useState('');

    useEffect(()=>{
        const timeoutId = setTimeout(()=>{
                onQuery(query);
        }, 700);

        

        return () =>{
            // console.log('funcion de limpienza');
            clearTimeout(timeoutId);
        };

    },[query, onQuery]);

    const handleSearch = () =>{
        onQuery(query);
        setQuery('');
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>)=>{
        if(event.key === 'Enter'){
            handleSearch();
        }
    }

  return (
    <div className="search-container">
       <input 
       type="text" 
       placeholder={placeholder}
       value={query} // con esto se manipula el valor del input
       onChange={(event) => setQuery(event.target.value)}
       onKeyDown={handleKeyDown}
       />
        <button 
        onClick={handleSearch}
        >{text}</button> 
    </div>
  )
}
