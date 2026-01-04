import { describe, expect, test } from "vitest";
import { SearchBar } from "./SearchBar";
import { render, screen } from "@testing-library/react";

describe('SearchBar', ()=>{
    test('test render searchbar correctly',()=>{
        const {container} = render(<SearchBar onQuery={()=>{}}/>);

        expect(container).toMatchSnapshot();
        expect(screen.getByRole('textbox')).toBeDefined();
        expect(screen.getByRole('button')).toBeDefined();
    });

    //2.55
})