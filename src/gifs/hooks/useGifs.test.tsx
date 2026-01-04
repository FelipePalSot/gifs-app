import { act, renderHook } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { useGifs } from "./useGifs";
import type { Gif } from "../interfaces/gif.interface";

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

        console.log("----> antes del await: ", result.current );
        await act(async ()=>{
            await result.current.handleTermClicked('goku');
        });
         console.log("----> despues del await: ", result.current );
        expect(result.current.gifs.length).toBe(10);
    });
});