export function collectLetters(level) {
    const lettersList = {};
    level.forEach(word => {
        if(!word) return;
        const letterEntity = {};
        word.split('').forEach(letter => {
            letterEntity[letter] = letterEntity[letter] ? letterEntity[letter] + 1 : 1;
            lettersList[letter] = lettersList[letter] > letterEntity[letter]
                ? lettersList[letter]
                : letterEntity[letter]
        });
    });
    return Object.keys(lettersList)
        .map(letter => Array(lettersList[letter])
        .fill(letter))
        .flat();
}
