import { writable, get } from "svelte/store";

//hold an array of tooltips
export const dictionary = writable([])


export function convert(string) {
    const dict = get(dictionary)
    const words = string.split(/\s/)

    for (const word of words) {
        const matchingObject = matchDictionary(dict, word)
        // console.log(matchingObject);
        if (matchingObject) {
            string = string.replace(word, `{{${word}}}`)
        }
    }
    return string
}

export function matchDictionary(dictionary, string) {
    return dictionary.find(obj => {
        if (Array.isArray(obj.name)) {
            const arr = obj.name.map(x => x.toLowerCase())
            const exists = arr.includes(string.toLowerCase())
            return exists
        } else {
            return obj.name.toLowerCase() === string.toLowerCase()
        }
    })
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

        const data = matchDictionary(dict, match[1])

        result.push({ type: "data", content: match[1], data: data });
        lastIndex = pattern.lastIndex;
    }

    if (lastIndex < inputString.length) {
        result.push({ type: "string", content: inputString.slice(lastIndex).trim() });
    }

    return result;
}

