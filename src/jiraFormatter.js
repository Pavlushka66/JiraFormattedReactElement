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
