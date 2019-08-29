import * as React from "react"
import { CSSProperties, ReactNode } from "react"


const boldRegex = /\*(\S.+?\S|\S\S|\S)\*(?!\*)/ig
const italicRegex = /_(\S.+?\S|\S\S|\S)_(?!_)/ig
const urlRegexp = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm

export function normalize(text) {
    return text
        .replace("\r\n", "\n")
        .replace("\\\\", "\n")
        .replace(boldRegex, (_, a) => `{fontWeight:bold}${a}{fontWeight}`)
        .replace(italicRegex, (_, a) => `{fontStyle:italic}${a}{fontStyle}`)
}

export function tokenize(text) {
    const tokens = []
    let state = "none"
    let tokenPosition = 0

    text = normalize(text)

    for (let i = 0; i < text.length; ++i) {
        const char = text.charAt(i)
        if (char === "\n") { // new line
            if (state === "none"
                || state === "endOfLine") {
                tokens.push({ type: "endOfLine", token: char, position: i })
            } else if (state === "space") {
                tokens.push({
                    type: "space",
                    token: text.substring(tokenPosition, i),
                    position: tokenPosition
                })
                tokens.push({ type: "endOfLine", token: char, position: i })
            }
            else if (state === "literal"
                || state === "markup") {
                tokens.push({
                    type: "literal",
                    token: text.substring(tokenPosition, i),
                    position: tokenPosition
                })
                tokens.push({ type: "endOfLine", token: char, position: i })
            }
            else {
                throw Error("unexpected token in the end of the string")
            }
            state = "endOfLine"
        } else if (/\s/.test(char)) { // space
            if (state === "none"
                || state === "endOfLine") {
                tokenPosition = i
            } else if (state === "literal"
                || state === "markup") {
                tokens.push({
                    type: "literal",
                    token: text.substring(tokenPosition, i),
                    position: tokenPosition
                })
                tokenPosition = i
            } else if (state === "space") {
            } else {
                throw Error("unexpected token while space parsing")
            }
            state = "space"
        } else if (char === "{") {
            if (state === "none"
                || state === "endOfLine") {
                tokenPosition = i
            } else if (state === "space") {
                tokens.push({
                    type: "space",
                    token: text.substring(tokenPosition, i),
                    position: tokenPosition
                })
                tokenPosition = i
            } else if (state === "literal"
                || state === "markup") {
                tokens.push({
                    type: "literal",
                    token: text.substring(tokenPosition, i),
                    position: tokenPosition
                })
                tokenPosition = i
            } else {
                throw Error("unexpected token while markup parsing")
            }
            state = "markup"
        } else if (char === "}") {
            if (state === "none" || state === "endOfLine") {
                tokenPosition = i
                state = "literal"
            } else if (state === "space") {
                tokens.push({
                    type: "space",
                    token: text.substring(tokenPosition, i),
                    position: tokenPosition
                })
                tokenPosition = i
                state = "literal"
            } else if (state === "literal") {
            } else if (state === "markup") {
                tokens.push({
                    type: "markup",
                    token: text.substring(tokenPosition, i + 1),
                    position: tokenPosition
                })
                state = "none"
                tokenPosition = i + 1
            } else {
                throw Error("unexpected token while markup parsing")
            }
        }
        else {
            if (state === "none" || state === "endOfLine") {
                tokenPosition = i
                state = "literal"
            } else if (state === "space") {
                tokens.push({
                    type: "space",
                    token: text.substring(tokenPosition, i),
                    position: tokenPosition
                })
                tokenPosition = i
                state = "literal"
            } else if (state === "literal" || state === "markup") {
            }
            else {
                throw Error("unexpected token while literal parsing")
            }
        }
    }
    if (state === "space") {
        tokens.push({
            type: "space",
            token: text.substring(tokenPosition),
            position: tokenPosition
        })
    } else if (state === "literal" || state === "markup") {
        tokens.push({
            type: "literal",
            token: text.substring(tokenPosition),
            position: tokenPosition
        })
    }
    return tokens
}
