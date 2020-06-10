import React from 'react';
import "@testing-library/jest-dom/extend-expect"
import SignIn from "./SignIn";
import {fireEvent, waitFor, screen} from '@testing-library/react';
import {renderWithRouter} from 'App/utils/tests';

test("Test signing without filled fields", async () => {
    const fakeLoginResponse = 'Email or password is wrong';
    jest.spyOn(window, 'fetch').mockImplementationOnce(() => {
        return Promise.resolve({
            text: () => Promise.resolve(fakeLoginResponse),
        })
    })
    renderWithRouter(<SignIn user={{createPopup: false}}/>)
    fireEvent.click(screen.getByText("Sign in"));
    await waitFor(() =>
        screen.getByText('Email or password is wrong')
    );
});
