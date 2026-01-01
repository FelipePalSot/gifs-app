import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { MyCounterApp } from "./MyCounterApp";
// import { useCounter } from '../hooks/useCounter';

const handleAddMock = vi.fn();
const handleSubstractMock = vi.fn();
const handleResetMock = vi.fn();

vi.mock('../hooks/useCounter',()=>({
    useCounter: ()=>({
      counter:20,
      //handleAdd:vi.fn(),/**Esto esta declarado como funcion anonima */
      //handleSubstract:vi.fn(),/**Esto esta declarado como funcion anonima */
      //handleReset: vi.fn(),/**Esto esta declarado como funcion anonima */

      handleAdd:handleAddMock,/**Esto esta con una referencia afuera  */
      handleSubstract:handleSubstractMock,/**Esto esta con una referencia afuera  */
      handleReset: handleResetMock,/**Esto esta con una referencia afuera  */
    })
})); /**Esto sirve para mockear la funcion llamando desde su ruta (../hooks/useCounter) */

describe('MyCounterApp',()=>{
    test('should render the component', ()=>{
        render(<MyCounterApp/>);

        screen.debug();
        expect(screen.getByRole('heading',{ level:1 }).innerHTML).toContain(`counter: 20`);
        expect(screen.getByRole('button',{name:'+1'})).toBeDefined();
        expect(screen.getByRole('button',{name:'-1'})).toBeDefined();
        expect(screen.getByRole('button',{name:'Reset'})).toBeDefined();
    });

    test('should call handleAdd if button is clicked', ()=>{
        render(<MyCounterApp/>);

        const button =  screen.getByRole('button', {name:'+1'});
        fireEvent.click(button);
        /**Un test esta completo cuando se tiene un expect */
        expect(handleAddMock).toHaveBeenCalled();
        expect(handleAddMock).toHaveBeenCalledTimes(1);
        expect(handleSubstractMock).not.toHaveBeenCalled();
        expect(handleResetMock).not.toHaveBeenCalled();
    });
})