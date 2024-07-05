import {words as level1} from "../lib/assets/data/level-1.json";
import {words as level2} from "../lib/assets/data/level-2.json";
import {words as level3} from "../lib/assets/data/level-3.json";

const mapLevel = (wordsArray) => wordsArray.sort((a, b) => a.length - b.length);

function* levelsListGen() {
    const levels = [
        mapLevel(level1),
        mapLevel(level2),
        mapLevel(level3),
    ];

    while (true) {
        yield* levels;
    }
}
export const levelsList = levelsListGen();
