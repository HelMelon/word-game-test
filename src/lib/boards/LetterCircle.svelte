<script>
    import {createEventDispatcher, onMount, tick} from "svelte";
    import {drawCircle} from "../../utils/drawCircle.js";
    import {collectLetters} from "../../utils/collectLetters.js";

    let buttons = [];
    let device = '';

    export let connectedLetters = '';
    export let level;
    export let wordsList;

    const dispatch = createEventDispatcher();

    function connectLetters(event) {
        event.target.classList.add('focus');

        connectedLetters += event.target.innerHTML;
        event.target.removeEventListener("mouseenter", connectLetters, {once: true});
    }


    function wordguesed(event) {
        buttons.forEach(button => button.removeEventListener("mouseenter", connectLetters));
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
        connectedLetters = event.target.innerHTML;
        buttons.forEach(elem => elem.addEventListener("mouseenter", connectLetters, {once: true}));
        buttons.forEach(elem => elem.addEventListener('mouseup', wordguesed));
    }

    onMount(async () => {
        const lettersList = collectLetters(wordsList);
        drawCircle(lettersList);
        buttons = [].slice.call(document.querySelectorAll('#letter'));
        // device = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i
        //         .test(navigator.userAgent))
        //         ? 'mobile' : 'desktop';
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
            <li on:mousedown={addingListeners}
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
    }

    .letter p {
        display: block;
        border-radius: 50%;
        text-align: center;
        line-height: 3rem;
        font-family: "VAG World", serif;
        text-transform: uppercase;
        width: 3rem;
        height: 3rem;
    }

    .letters-circle {
        display: flex;
        position: relative;
        height: 160px;
    }

    :global(.focus) {
        background-color: mediumvioletred;
        color: #fff;
    }
</style>
