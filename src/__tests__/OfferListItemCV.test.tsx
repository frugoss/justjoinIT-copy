import React from 'react'
import {renderWithRouter} from "../App/utils/tests";
import OfferListItemCV from "../App/views/Home/OfferListItemCV";
import {CV} from '../App/utils/mockData'
import {screen, waitFor} from "@testing-library/react";



test('Check CVs',async() => {

    const {container} = renderWithRouter(<OfferListItemCV title={"Python developer"} setOpen={() => {}} open={true} showCvs={CV}/>)
    await waitFor( () => expect(screen.getAllByText(/show cv/i).length).toEqual(2))
})
