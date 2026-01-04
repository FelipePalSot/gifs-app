import { useRef, useState } from 'react'
import { getGifsByQuery } from '../actions/get-gifs-by-query.action';
import type { Gif } from '../interfaces/gif.interface';

// const gifsCache: Record<string, Gif[]> = {};  usaremos el hook useRef (1)

export const useGifs = () => {
        const [gifs, setGifs] = useState<Gif[]>([]);
        const [previousTerms, setPreviousTerms] = useState<string[]>([]);

        const gifsCache = useRef<Record<string, Gif[]>>({});
    
        const handleTermClicked = async(term: string) =>{
            // if(gifsCache[term]){
            //     setGifs(gifsCache[term]);
            //     return;
            // }

            //usaremos el hook useRef (2)

            if(gifsCache.current[term]){
                setGifs(gifsCache.current[term]);
                return;
            }

            //console.log({term});
            const gifs = await getGifsByQuery(term);
            setGifs(gifs);
            gifsCache.current[term]=gifs;
        }
    
        const handleSearch = async (query:string = ' ') =>{
            query = query.trim().toLowerCase();
    
            if(query.length === 0) return;
    
            if(previousTerms.includes(query)) return;
    
            setPreviousTerms([query, ...previousTerms].splice(0,8));
    
            const gifs = await getGifsByQuery(query);
    
            // console.log({gifs});
            /* lo comente para que cuando se
            haga pasar el test no haga mucho ruido*/
    
            setGifs(gifs);
            
            // gifsCache[query]=gifs;
            //usaremos el hook useRef (3)

            gifsCache.current[query]=gifs;
        }

        return {
                //Values 
                gifs,
                previousTerms,

                //Actions/Methods
                handleTermClicked,
                handleSearch,
            }
}
