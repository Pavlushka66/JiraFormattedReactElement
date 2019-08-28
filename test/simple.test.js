import React from 'react'
import { render, cleanup, getByTestId } from '@testing-library/react'
import JIraFormattedReactElement from '../src/jiraFormattedReactElement'
import "@testing-library/jest-dom/extend-expect"


afterEach(cleanup)

test("renders", () => {
    const { asFragment } = render(<JIraFormattedReactElement />)
    expect(asFragment()).toMatchSnapshot
})

test("Say hi", () => {
    const { getByTestId } = render(<JIraFormattedReactElement content = "Hi"/>)
    expect(getByTestId("parentElement")).toHaveTextContent("Hi")
})

// test("just bold word", () => {
//     const { getByTestId } = render(<JIraFormattedReactElement content = "*bold*"/>)
//     expect(getByTestId("parentElement")).toHaveTextContent("bold")
//     expect(getByClass("jira-formatted-bold")).toBeInTheDocument()
// })