import { render, screen,fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dropdown from './DropDown';
import React from 'react';
import {VALIDATOR_REQUIRE} from '../../util/validators';
import '@testing-library/jest-dom';

const place_types = ['', 'Pub', 'Hospital', 'Restaurant', 'Cafe', 'other'];
const inputHandler = () =>{}

describe('test DropDown component', ()=>{
    test('renders "select text" as a text', () => {
        render(<Dropdown 
            id="place_type"
            place_types={place_types}
            label="Place Types"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="invalid type"
            onInput={inputHandler}/>);

        const labletext = screen.getByText('Place Types');
        expect(labletext).toBeInTheDocument();

        const pub_text = screen.getByText('Pub');
        expect(pub_text).toBeInTheDocument();

        const selectItem = screen.getByTestId("select");
        expect(selectItem).not.toBeNull();
    });
    test('renders select and select-option', () => {
        render(<Dropdown 
            id="place_type"
            place_types={place_types}
            label="Place Types"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="invalid type"
            onInput={inputHandler}/>);

        const selectItem = screen.getByTestId("select");
        expect(selectItem).not.toBeNull();

        const optionItems = screen.getAllByTestId("select-option");
        expect(optionItems).toHaveLength(6);
    });

    test('select option', () => {
        render(<Dropdown 
            id="place_type"
            place_types={place_types}
            label="Place Types"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="invalid type"
            onInput={inputHandler}/>);
            

            const optionItems = screen.getAllByTestId("select-option");
            fireEvent.change(screen.getByTestId('select'), { target: { value: 'Pub' } })

            expect(optionItems[1].selected).toBe(true)
    });


})