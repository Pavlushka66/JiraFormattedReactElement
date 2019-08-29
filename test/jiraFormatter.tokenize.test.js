import { tokenize } from '../src/jiraFormatter'

test("tokenize a char", () => {
    expect(tokenize("I"))
        .toStrictEqual([{ "position": 0, "token": "I", "type": "literal" }])
})

test("tokenize a word", () => {
    expect(tokenize("hello"))
        .toStrictEqual([{ "position": 0, "token": "hello", "type": "literal" }])
})

test("tokenize a new line", () => {
    expect(tokenize("\n"))
        .toStrictEqual([{ "position": 0, "token": "\n", "type": "endOfLine" }])
})

test("tokenize a new line after space", () => {
    expect(tokenize(" \n"))
        .toStrictEqual(
            [{ "position": 0, "token": " ", "type": "space" },
            { "position": 1, "token": "\n", "type": "endOfLine" }])
})

test("tokenize two words separated by new line", () => {
    expect(tokenize("hello\nworld"))
        .toStrictEqual(
            [{ "position": 0, "token": "hello", "type": "literal" },
            { "position": 5, "token": "\n", "type": "endOfLine" },
            { "position": 6, "token": "world", "type": "literal" }])
})

test("tokenize a space", () => {
    expect(tokenize(" "))
        .toStrictEqual([{ "position": 0, "token": " ", "type": "space" }])
})

test("tokenize a space after new line", () => {
    expect(tokenize("\n "))
    .toStrictEqual(
        [{ "position": 0, "token": "\n", "type": "endOfLine" },
        { "position": 1, "token": " ", "type": "space" }])
})

test("tokenize two words separated by space", () => {
    expect(tokenize("hello world"))
        .toStrictEqual(
            [{ "position": 0, "token": "hello", "type": "literal" },
            { "position": 5, "token": " ", "type": "space" },
            { "position": 6, "token": "world", "type": "literal" }])
})

test("tokenize a markup", () => {
    expect(tokenize("{a}"))
        .toStrictEqual([{ "position": 0, "token": "{a}", "type": "markup" }])
})

test("tokenize a markup after space", () => {
    expect(tokenize(" {a}"))
        .toStrictEqual(
            [{ "position": 0, "token": " ", "type": "space" },
            { "position": 1, "token": "{a}", "type": "markup" }])
})

test("tokenize a markup after new line", () => {
    expect(tokenize("\n{a}"))
        .toStrictEqual(
            [{ "position": 0, "token": "\n", "type": "endOfLine" },
            { "position": 1, "token": "{a}", "type": "markup" }])
})

test("tokenize a markup after literal", () => {
    expect(tokenize("b{a}"))
        .toStrictEqual(
            [{ "position": 0, "token": "b", "type": "literal" },
            { "position": 1, "token": "{a}", "type": "markup" }])
})



