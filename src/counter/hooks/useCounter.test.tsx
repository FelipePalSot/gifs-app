/*Problema es que los hooks solo pueden 
 ser llamados dentro de otro hook o 
 function component, eso se soluciona usando 'renderHook' */

import { describe, expect, test } from "vitest";
import { useCounter } from "./useCounter";
import { act, renderHook } from "@testing-library/react";


 describe('useCounter', ()=>{
    // const { result } = renderHook( ()=>useCounter());

    // beforeEach(()=> {

    // })

    test('should initialize with default value of 10', () =>{
        const { result } = renderHook( ()=>useCounter());

        expect(result.current.counter).toBe(10);
    });

    test('should initialize with any value', () =>{
        const initialValue = 20;

        const { result } = renderHook( ()=>useCounter(initialValue));

        expect(result.current.counter).toBe(initialValue);
    });

    test('should increment counter when handledAdd is called', ()=>{
        const{ result } = renderHook(()=>useCounter()); // ctrl + espaciadora

        act(()=>{
            result.current.handleAdd(); /*act(), asegura que las aserciones se ejecuten despues de que se haya re-renderizado */
        })

        expect(result.current.counter).toBe(11);
    });

    

    test('should decrease counter when handleSubstract is called', ()=>{
        const{ result } = renderHook(()=>useCounter()); // ctrl + espaciadora

        act(()=>{
            result.current.handleSubstract();
        })

        expect(result.current.counter).toBe(9);
    });

    test('should change value of counter in initialValue when handleReset is called', ()=>{
        
        const{ result } = renderHook(()=>useCounter()); // ctrl + espaciadora

        act(()=>{
            result.current.handleSubstract();
            result.current.handleSubstract();
            result.current.handleSubstract();
            result.current.handleSubstract();
            result.current.handleSubstract();
        })

        expect(result.current.counter).toBe(5); 
        /*Esto se realiza con la idea de tener una prueba 
        fiel donde se modifica el valor del counter y se
        verifica parcialmente para despues corroborar que
        si se funciona la prueba de  handleReset()*/

        act(()=>{
            result.current.handleReset();
        })

        expect(result.current.counter).toBe(10);
    });
 })