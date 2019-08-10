import React from 'react'
import { render, cleanup, getByTestId } from '@testing-library/react'
import JIraFormattedReactElement from '../src/jiraFormattedReactElement'
import "@testing-library/jest-dom/extend-expect"

afterEach(cleanup)

test("renders", () => {
    const { asFragment } = render(<JIraFormattedReactElement />)
    expect(asFragment()).toMatchSnapshot
})

test("check text", () => {
    const { getByTestId } = render(<JIraFormattedReactElement />)
    expect(getByTestId("parentElement")).toHaveTextContent("Hi")
})