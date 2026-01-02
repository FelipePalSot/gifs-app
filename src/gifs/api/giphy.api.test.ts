import { describe, expect, test } from "vitest";
import { giphyApi } from "./giphy.api";

describe('giphyApi',()=>{
    test('should be configured correctly',()=>{
        const params = giphyApi.defaults.params;

        console.log("Viva el Peru",giphyApi);

        expect(giphyApi.defaults.baseURL).toBe('https://api.giphy.com/v1/gifs');
        expect(params.lang).toBe('es');
        expect(params.api_key).toBe(import.meta.env.VITE_GIPHY_API_KEY);

        expect(params).toStrictEqual({ 
            lang: 'es',
             api_key: 'SQG5Lh7IdpJ4jvbOieTHg2BmTyWD9Lp3'
        });

        /**Cuando se compara datos primitivos se usa toBe
         * cuando se compara datos se usa toStrictEqual
         */
    });
});