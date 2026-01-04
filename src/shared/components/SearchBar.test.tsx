import { describe, expect, test, vi } from "vitest";
import { SearchBar } from "./SearchBar";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

describe('SearchBar', ()=>{
    test('test render searchbar correctly',()=>{
        const {container} = render(<SearchBar onQuery={()=>{}}/>);

        expect(container).toMatchSnapshot();
        expect(screen.getByRole('textbox')).toBeDefined();
        expect(screen.getByRole('button')).toBeDefined();
    });

    test('should call onQuery with the correct value after 700ms',async() =>{
        const onQuery = vi.fn();
        render(<SearchBar onQuery={onQuery}/>);

        const input = screen.getByRole('textbox'); //toma el input
        fireEvent.change(input, {target: {value:'test'}}); // en el input y le coloca valor de test

        //await new Promise((resolve) => setTimeout(resolve, 701));

        await waitFor(()=>{
            expect(onQuery).toHaveBeenCalled();
            expect(onQuery).toHaveBeenCalledWith('test');
        });
    });

    test('should call only once with the last value(debounce)',async()=>{
        const onQuery = vi.fn();
        render(<SearchBar onQuery={onQuery}/>);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, {target: {value: 't'}});
        fireEvent.change(input, {target: {value: 'te'}});
        fireEvent.change(input, {target: {value: 'tes'}});
        fireEvent.change(input, {target: {value: 'test'}});

        await waitFor(()=>{
            expect(onQuery).toHaveBeenCalledTimes(1);
            expect(onQuery).toHaveBeenCalledWith('test');
        });
    });

    test('should call onQuery when button clicked with the input value',()=>{
        const onQuery = vi.fn();
        render(<SearchBar onQuery={onQuery}/>);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, {target: {value: 'test'}});//usuario escribe o selecciona algo Para inputs de texto, selects, textareas

        const button = screen.getByRole('button');//usuario hace clic con el mouse, botones, enlaces, checkboxes
        fireEvent.click(button);

        expect(onQuery).toHaveBeenCalledTimes(1);
        expect(onQuery).toHaveBeenCalledWith('test');
    });

    test('should the input has the correct placeholder value', ()=>{
        const value = 'Buscar gif';
        render(<SearchBar onQuery={()=>{}} placeholder={value}/>);

        screen.debug();

        expect(screen.getAllByPlaceholderText(value)).toBeDefined();
    })
});