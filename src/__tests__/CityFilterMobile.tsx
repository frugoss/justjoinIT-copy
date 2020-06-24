import React from 'react'
import {renderWithRouter} from "../App/utils/tests";
import CityFilterMobile from "../App/views/Home/CityFilterMobile";
import {cities} from "../App/views/Home/constData";



test('Snapshot',async() => {
    const {container} = renderWithRouter(<CityFilterMobile cities={cities} filters={{city:"all", language:"all", experience:"all", salarymax: 50, salarymin:1}} updateFilters={() => {}}/>)
    await expect(container).toMatchSnapshot()
})
