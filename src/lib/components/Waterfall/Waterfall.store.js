import { writable, get } from "svelte/store";

//hold an array of tooltips
export const dictionary = writable([])


export function convert(string) {
    const dict = get(dictionary)
    const words = string.split(/\s/)

    for (const word of words) {
        const matchingObject = dict.find(obj => obj.name.toLowerCase() === word.toLowerCase());
        if (matchingObject) {
            string = string.replace(word, `{{${word}}}`)
        }
    }
    return string
}



export function convertStringToArray(inputString) {
    const pattern = /\{\{([^}]+)\}\}/gi;
    let match;
    const result = [];
    let lastIndex = 0;
    const dict = get(dictionary)


    while ((match = pattern.exec(inputString))) {
        if (match.index > lastIndex) {
            result.push({ type: "string", content: inputString.slice(lastIndex, match.index).trim() });
        }

        const data = dict.find(obj => obj.name.toLowerCase() === match[1].toLowerCase())
        result.push({ type: "data", content: match[1], data: data });
        lastIndex = pattern.lastIndex;
    }

    if (lastIndex < inputString.length) {
        result.push({ type: "string", content: inputString.slice(lastIndex).trim() });
    }

    return result;
}

