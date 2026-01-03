import { beforeEach, describe, expect, test } from "vitest";
import { getGifsByQuery } from "./get-gifs-by-query.action";
import AxiosMockAdapter from 'axios-mock-adapter'; /**npm install axios-mock-adapter 
--save-dev (--save-dev, esto es para que sea dependecia de desarrollo nomas) */
import { giphyApi } from '../api/giphy.api';
import {giphySearchRespondeMock} from '../../../test/mocks/giphy.response.data';


describe('getGifsByQuery',()=>{
    // test('should return a list of gifs', async ()=>{
    //     const gifs = await getGifsByQuery('goku'); // 'goku' es el query
    //     const [gifs1] = gifs;

    //     expect(gifs.length).toBe(10);

    //     expect(gifs1).toStrictEqual({
    //         id: expect.any(String),
    //         height: expect.any(Number),
    //         width: expect.any(Number),
    //         title: expect.any(String),
    //         url: expect.any(String),
    //     });
    // });

    let mock = new AxiosMockAdapter(giphyApi);

    describe('getGifsByQuery'), ()=>{
        let mock = new AxiosMockAdapter(giphyApi);
        beforeEach(()=>{
            // mock.restore(); //Asi deberia funcionar 
            mock =  new AxiosMockAdapter(giphyApi);
        })
    }/**Resetea para cada test */

    test('should return a list of gifs',async ()=>{
       
        mock.onGet('/search').reply(200, giphySearchRespondeMock); // (status, la data que quisiera retornar)
        const gifs = await getGifsByQuery('goku');

        expect (gifs.length).toBe(10);

        gifs. forEach((gif) => {
            expect(typeof gif.id). toBe('string');
            expect(typeof gif.title).toBe('string');
            expect(typeof gif.url). toBe('string');
            expect (typeof gif.width).toBe('number');
            expect (typeof gif.height).toBe('number');
        });
    });

    test('should return an empty list of gifs if query is empty',async ()=>{
       
        //mock.onGet('/search').reply(200, {data: []}); // (status, la data que quisiera retornar)
        mock.restore();/**Resetea en este test */
        const gifs = await getGifsByQuery('');

        expect (gifs.length).toBe(0);
    });

    test('should handle error when the API returns an error', async ()=>{
       
        mock.onGet('/search').reply(400,{
            data:{
                message: 'Bad Request',
            }
        });

        const gifs = await getGifsByQuery('goku');
        expect(gifs.length).toBe(0);
        
    });
});