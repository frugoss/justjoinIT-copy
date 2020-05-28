import React from 'react';
import {Router} from 'react-router-dom';
import AddOffer from "./AddOffer";
import {fireEvent} from '@testing-library/react';
import {renderWithRouter} from '../../utils/tests';

jest.mock('react-trix',  () => ({TrixEditor : () => <div>Fajny trix</div> }))
test("Test AddOffer render errors", () => {
   const {container, getByText, getAllByText} = renderWithRouter(<AddOffer/>)
    expect(container).toMatchSnapshot()
    fireEvent.click(getByText("Next Step"))
    expect(getAllByText("Field is required").length).toEqual(9)
    expect(container).toMatchSnapshot()
} )




