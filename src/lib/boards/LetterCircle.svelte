<script>
    import {createEventDispatcher, onMount, tick} from "svelte";
    import {drawCircle} from "../../utils/drawCircle.js";
    import {collectLetters} from "../../utils/collectLetters.js";

    let buttons = [];

    export let connectedLetters = '';
    export let level;
    export let wordsList;

    const dispatch = createEventDispatcher();

    function connectLetters(event) {
        event.target.releasePointerCapture(event.pointerId);
        event.target.classList.add('focus');

        connectedLetters += event.target.innerHTML;
        event.target.removeEventListener("pointermove", connectLetters);
    }


    function wordguesed() {
        buttons.forEach(button => button.removeEventListener("pointermove", connectLetters));
        setTimeout(() => {
            buttons.forEach(button => button.classList.remove('focus'))
        }, 1000)
        let guessedIndex = level.findIndex(word => word === connectedLetters);
        if (guessedIndex === -1) {
            document.getElementById('current-word').classList.add('wrong');
            setTimeout(() => {
                connectedLetters = '';
                document.getElementById('current-word').classList.remove('wrong');
            }, 1000);
        } else {
            document.getElementById(guessedIndex).classList.add('guesed');

            connectedLetters = '';
            delete level[guessedIndex];

            if (!level.join('')) {
                dispatch('winStateChange', {
                    winState: true
                });
            }
        }

        localStorage.setItem('levelStg', JSON.stringify(level));
    }

    function addingListeners(event) {
            event.target.classList.add('focus');
            buttons.forEach(elem => elem.addEventListener("pointermove", connectLetters));
            buttons.forEach(elem => elem.addEventListener('pointerup', wordguesed));
    }

    onMount(async () => {
        const lettersList = collectLetters(wordsList);
        drawCircle(lettersList);
        buttons = [].slice.call(document.querySelectorAll('#letter'));
        await tick();
        level.forEach((word, index) => {
            if(!word) {
                document.getElementById(index).classList.add('guesed');
            }
        });
    })
</script>

<div class="letters-circle">
    <ul>
        {#each collectLetters(wordsList) as letter}
            <li on:pointerdown={addingListeners}
                class="letter">
                <p id="letter">{letter}</p>
            </li>
        {/each}
    </ul>
</div>

<style>
    ul {
        position: relative;
        margin: 0 auto;
        touch-action: none;
        pointer-events: auto;
    }

    .letter {
        background-color: #fff;
        border-radius: 50%;
        list-style-type: none;
        position: absolute;
        top: 60px;

        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        touch-action: none;
        pointer-events: auto;
    }

    .letter p {
        display: block;
        border-radius: 50%;
        text-align: center;
        line-height: 3rem;
        font-family: "VAG World", Arial, sans-serif;
        text-transform: uppercase;
        width: 3rem;
        height: 3rem;
    }

    .letters-circle {
        display: flex;
        position: relative;
        height: 160px;
        touch-action: none;
    }

    :global(.focus) {
        background-color: mediumvioletred;
        color: #fff;
    }
</style>
