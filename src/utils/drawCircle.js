export function drawCircle(arr) {
    const calculation = Math.floor(360 / arr.length);
    const spaceBetween = 17.5;
    arr.reduce((accum, letter, i) => {
        document.querySelector(`.letter:nth-child(${i+1})`).style.cssText = `
                transform: rotate(${accum}deg) translate(calc(-${spaceBetween}% + -${calculation}px), calc(${spaceBetween}% + ${calculation / 2}px));
            `;
        document.querySelector(`.letter:nth-child(${i+1}) p`).style
            .cssText = `transform: rotate(-${accum}deg)`;
        return accum + calculation;
    }, 0);
}
