import React from 'react';
import "@testing-library/jest-dom/extend-expect"
import Tab, {TabProps} from "../App/components/Header/Tab/Tab";
import {render} from '@testing-library/react';
import {BrowserRouter} from "react-router-dom";


function renderTab(props: Partial<TabProps> = {}) {
    const defaultProps: TabProps = {
        text: "test text",
        img: "img",
        isActive: true,
        to: "test"

    };
    return render(<BrowserRouter><Tab {...defaultProps} {...props} /></BrowserRouter>);
}
describe("<Tab />", () => {
    it("snapshot",  () => {
        const {container} = renderTab();
        expect(container).toMatchSnapshot();

    })
})
