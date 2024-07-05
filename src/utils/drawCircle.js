export function drawCircle(arr) {
    const calculation = Math.floor(360 / arr.length);
    for (let i = 0, j = calculation; i <= arr.length; i++, j = j + calculation) {
        document.querySelectorAll(`.letter:nth-child(${i})`).forEach((elem) => {
            elem.style.cssText = `
                transform: rotate(${j}deg) translate(-${calculation}px, ${calculation / 2}px);
            `;

            document.querySelectorAll(`.letter:nth-child(${i}) p`).forEach(elem => {
                elem.style.cssText = `transform: rotate(-${j}deg)`
            })
        });
    }
}
