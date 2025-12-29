import React, { useState } from 'react';
import  { mockGifs } from './mock-data/gifs.mock';
import  { CustomHeader } from './shared/components/CustomHeader';
import  { SearchBar } from './shared/components/SearchBar';
import  { PreviousSearches } from './gifs/components/PreviousSearches';
import  { GifList } from './gifs/components/GifList';
import { getGifsByQuery } from './gifs/actions/get-gifs-by-query.action';
import type { Gif } from './gifs/interfaces/gif.interface';



export const GifsApp = () => {
    const [gifs, setGifs] = useState<Gif[]>([]);
    const [previousTerms, setPreviousTerms] = useState<string[]>([]);

    const handleTermClicked = (term: string) =>{
        console.log({term});
    }

    const handleSearch = async (query:string = ' ') =>{
        query = query.trim().toLowerCase();

        if(query.length === 0) return;

        if(previousTerms.includes(query)) return;

        setPreviousTerms([query, ...previousTerms].splice(0,7));

        const gifs = await getGifsByQuery(query);

        console.log({gifs});

        setGifs(gifs);

        // console.log({query})
    }

  return (
   <>
    {/**Header */}
    {/**CustomHeader */}
    <CustomHeader title='Buscador de Gifs' description='Descubre y comparte el gif perfecto'/>

    {/**Search */}
    {/**SearchBar */}
    <SearchBar 
        placeholder='Busca lo que quieras' 
        text='Buscar'
        onQuery={handleSearch} // pasado por referencia, lo mismo**
    />

    {/**Busqquedas Previas */}
    {/**PreviousSearches*/}
    <PreviousSearches 
        title='Busquedas Previas' 
        searches={previousTerms} 
        onLabelClicked={(term: string)=>handleTermClicked(term)} // pasa como funcion, lo mismo**
    />

    {/**Gifs */}
    {/**GifList*/}
    <GifList gifs={gifs}/>
    
   </>
  )
}
