import {normalize} from '../src/jiraFormatter'

test("do not normalize text", () => {
    expect(normalize("some text for example")).toBe("some text for example")
})

test("normalize replaces \\n\\r to \\n", () => {
    expect(normalize("\r\n")).toBe("\n")
})

test("normalize replaces \\\\ to \\n", () => {
    expect(normalize("\\\\")).toBe("\n")
})

test("simple normalize bold", () => {
    expect(normalize("*wow*")).toBe("{fontWeight:bold}wow{fontWeight}")
})

test("normalize bold two symbols", () => {
    expect(normalize("*hi*")).toBe("{fontWeight:bold}hi{fontWeight}")
})

test("normalize bold one symbol", () => {
    expect(normalize("*I*")).toBe("{fontWeight:bold}I{fontWeight}")
})

test("simple normalize italic", () => {
    expect(normalize("_wow_")).toBe("{fontStyle:italic}wow{fontStyle}")
})

test("normalize italic two symbols", () => {
    expect(normalize("_hi_")).toBe("{fontStyle:italic}hi{fontStyle}")
})

test("normalize italic one symbol", () => {
    expect(normalize("_I_")).toBe("{fontStyle:italic}I{fontStyle}")
})

test("normalize embeded bold and italic", () => {
    expect(normalize("_*wow*_")).toBe("{fontStyle:italic}{fontWeight:bold}wow{fontWeight}{fontStyle}")
})