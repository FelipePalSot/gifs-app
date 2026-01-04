import { act, renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { useGifs } from "./useGifs";
import type { Gif } from "../interfaces/gif.interface";
import * as gifActions from "../actions/get-gifs-by-query.action"; 
// artificio que se hace para tener ese metodo como si fuera un
//  metodo de un objeto, ya que vi.spyOn( solo acepta como primer
//  parametro un objeto y su metodo) 



// mirar videos pasados de como hacer test de custom hooks,
//  videos 97 y 98, no hacer mocks que es video 100
describe('useGifs',()=>{
    test('should return default values and methods',()=>{
        const gifs: Array<Gif> = [];
        const previousTerms: Array<Gif> = [];
        const { result } = renderHook( ()=>useGifs());

        console.log("Desde useGifs.test.tsx",result.current);

        expect(result.current.gifs).toStrictEqual(gifs);
        expect(result.current.previousTerms).toStrictEqual(previousTerms);
        expect(result.current.handleTermClicked).toBeDefined();
        expect(result.current.handleSearch).toBeDefined();
    });

    test('should return a list of gifs',async ()=>{
        //handleSearch
        const {result} = renderHook(() => useGifs());

        await act(async()=>{
            await result.current.handleSearch('naruto');
        })

        expect(result.current.gifs.length).toBe(10);
    });

    test('should return a list of gifs when handleTermClicked is called',async ()=>{
        const {result} = renderHook(() => useGifs());

        //console.log("----> antes del await: ", result.current );
        await act(async ()=>{
            await result.current.handleTermClicked('naruto');
        });
        //console.log("----> despues del await: ", result.current );
        expect(result.current.gifs.length).toBe(10);
    });

    test('should return a list of gifs from cache',async ()=>{
        const {result} = renderHook(() => useGifs());

        
        await act(async ()=>{
            await result.current.handleTermClicked('naruto');
        });
        
        expect(result.current.gifs.length).toBe(10);

        vi.spyOn(gifActions, 'getGifsByQuery').mockRejectedValue(
            new Error('This is my custom error')
        );/*aca se sobrescribe el metodo (getGifsByQuery) para que lance el error */
        /* querer ver cuando se va ejecutar ese metodo ( para eso sirve spyOn) */
        /* mockResolvedValue: es la contra-parte del metodo para sobreescribirlo 
         correctamente*/

        await act(async ()=>{
            await result.current.handleTermClicked('naruto');
        });
        
        expect(result.current.gifs.length).toBe(10);
    });

    test('should return no more than 8 previous terms',async ()=>{
        const {result} = renderHook(() => useGifs());

       vi.spyOn(gifActions, 'getGifsByQuery').mockResolvedValue([]);
       /*se puede mandar lo que sea, lo que importa es la llamada a ese metodo*/
       await act(async ()=>{
            await result.current.handleSearch('scooby 1');
        });
        await act(async ()=>{
            await result.current.handleSearch('scooby 2');
        });
        await act(async ()=>{
            await result.current.handleSearch('scooby 3');
        });
        await act(async ()=>{
            await result.current.handleSearch('scooby 4');
        });
        await act(async ()=>{
            await result.current.handleSearch('scooby 5');
        });
        await act(async ()=>{
            await result.current.handleSearch('scooby 6');
        });
        await act(async ()=>{
            await result.current.handleSearch('scooby 7');
        });
        await act(async ()=>{
            await result.current.handleSearch('scooby 8');
        });
         await act(async ()=>{
            await result.current.handleSearch('scooby 9');
        }); /** A partir de ahora, cada vez que alguien llame a 
        getGifsByQuery, no hagas la petición real a la API, sino 
        devuelve inmediatamente un arreglo vacío []" */

        //console.log("desde el test en cuestion",result.current.previousTerms);
        expect(result.current.previousTerms.length).toBe(8);
        expect(result.current.previousTerms).toStrictEqual([
        'scooby 9',
        'scooby 8',
        'scooby 7',
        'scooby 6',
        'scooby 5',
        'scooby 4',
        'scooby 3',
        'scooby 2'
        ]);
    });
});