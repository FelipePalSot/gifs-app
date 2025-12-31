import  { CustomHeader } from './shared/components/CustomHeader';
import  { SearchBar } from './shared/components/SearchBar';
import  { PreviousSearches } from './gifs/components/PreviousSearches';
import  { GifList } from './gifs/components/GifList';
import { useGifs } from './gifs/hooks/useGifs';



export const GifsApp = () => {
        const {gifs, previousTerms , handleTermClicked, handleSearch}    = useGifs();
        // console.log({query})
    

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
