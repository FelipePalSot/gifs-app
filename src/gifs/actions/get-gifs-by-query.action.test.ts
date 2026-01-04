import { beforeEach, describe, expect, test, vi } from "vitest";
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

        beforeEach(()=>{
            mock.reset(); //Asi deberia funcionar 
            mock =  new AxiosMockAdapter(giphyApi);
            /*AxiosMockAdapter sirve para simular 
            (mockear) las respuestas de las peticiones 
            HTTP hechas con Axios */
        });
    /**Resetea para cada test */

    test('should return a list of gifs',async ()=>{
       
        mock.onGet('/search').reply(200, giphySearchRespondeMock); // (status, la data que quisiera retornar)
        const gifs = await getGifsByQuery('goku');

        expect(gifs.length).toBe(10);

        gifs.forEach((gif) => {
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
       
            const consoleErrorSpy = vi.spyOn(console, 'error')
                .mockImplementation(()=>{
                    console.log

                    /**Cuando lo dejamos en blanco ya no aparece
                     *  el console.error ( que es como .log)
                     *  pero si deseamos que aparezca algo lo colocamos 
                     *  aca o si deseamos que se ejecute un codigo lo
                     *  ejecutamos aca, es conveniente si queremos registrar
                     *  algo como un API
                     *  */
                })
            /**Se pone un espia cuando se quiere saber si algo ha sido llamado o 
             * en otras palabras para saber el compartamiento de algo
             * por otro lado es un objeto ficticio es algo que se esta creando
             */
            mock.onGet('/search').reply(400,{
                data:{
                    message: 'Bad Request',
                }
            });

            const gifs = await getGifsByQuery('goku');
            expect(gifs.length).toBe(0);
            expect(consoleErrorSpy).toHaveBeenCalled();
            expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
            expect(consoleErrorSpy).toHaveBeenCalledWith(expect.anything());
            
    });
});
