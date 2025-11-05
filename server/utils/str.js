

export function capitalizeText(str) {
    if (typeof str !== "string" || !str) return str;

    const cleanedStr = str.replace(/\s+/g, ' ').trim();

    return cleanedStr
        .split(' ')
        .map(word => {
            return `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`;
        })
        .join(' ');
}