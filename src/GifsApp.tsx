import React from 'react';
import  { mockGifs } from './mock-data/gifs.mock';
import  { CustomHeader } from './shared/components/CustomHeader';
import  { SearchBar } from './shared/components/SearchBar';
import  { PreviousSearches } from './gifs/PreviousSearches';
import  { GifList } from './gifs/GifList';

export const GifsApp = () => {
  return (
   <>
    {/**Header */}
    {/**CustomHeader */}
    <CustomHeader title='Buscador de Gifs' description='Descubre y comparte el gif perfecto'/>

    {/**Search */}
    {/**SearchBar */}
    <SearchBar placeholder='Busca lo que quieras' text='Buscar'/>

    {/**Busqquedas Previas */}
    {/**PreviousSearches*/}
    <PreviousSearches title='Busquedas Previas' searches={['Goku','Naruto']}/>

    {/**Gifs */}
    {/**GifList*/}
    <GifList gifs={mockGifs}/>
    
   </>
  )
}
