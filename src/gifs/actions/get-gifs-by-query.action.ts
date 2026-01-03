
import type { Gif } from '../interfaces/gif.interface';
import type { GiphyResponse } from '../interfaces/giphy.response';
import { giphyApi } from '../api/giphy.api';

export const getGifsByQuery = async(query:string): Promise<Gif[]>=> {

    if(query.trim().length === 0){
        return[];
    }

    try {
        const response = await giphyApi<GiphyResponse>('/search',{
        params: {
            q:query,
            limit:10,
        }
    });

    // console.log(response.data);

    return response.data.data.map((gif)=>({
        id: gif.id,
        title: gif.title,
        url: gif.images.original.url,
        width: Number(gif.images.original.width),
        height: Number(gif.images.original.height),
    }))

    // responsee.data.data[0];


    // fetch(`
    //     https://api.giphy.com/v1/gifs/search?api_key=SQG5Lh7IdpJ4jvbOieTHg2BmTyWD9Lp3&q=${query}&limit=10&rating=g&lang=es
    // `);
    }catch(error){
        console.error(error);
        return []; //ante un error se manda un arreglo vacio
    }
  
};