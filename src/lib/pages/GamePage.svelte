<script>
    import LetterCircle from "../boards/LetterCircle.svelte";

    export let level;
    export let wordsList;
    export let levelCount;
    $: connected = '';

</script>

<div class="screen">
    <h1>Уровень {levelCount}</h1>
    <div class="board">
        {#each wordsList.sort((a, b) => a.length - b.length) as word, i}
                <div id={i} class="line">
                    {#each word as letter}
                        <div class="cell big">
                            <p>{letter}</p>
                        </div>
                    {/each}
                </div>
        {/each}
    </div>

    <div class="word-in-progress" id="current-word">
        {#each connected as letter}
            <div class="cell small">
                <p>{letter}</p>
            </div>
        {/each}
    </div>

    <LetterCircle bind:connectedLetters={connected} {wordsList} level={level} on:winStateChange />
</div>
<style>
    @import url("$lib/styles/css_reset.css");
    @import url("$lib/styles/styles.css");

    .screen {
        background-color: #2b344b;
        max-width: 640px;
        height: 100%;
        margin: 0 auto;
        box-sizing: border-box;
    }

    .line {
        display: flex;
        gap: 5px;
        margin: 5px auto;
    }

    .cell {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .cell p {
        font-family: "VAG World", serif;
        font-weight: 700;
        text-align: center;
        text-transform: uppercase;
    }

    .board {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .small {
        width: 1.5rem;
        height: 1.5rem;
    }

    .big {
        width: 2rem;
        height: 2rem;
        color: #fff;
    }

    .word-in-progress {
        display: flex;
        justify-content: center;
        margin-block: 1rem;
        height: 30px;
        gap: 5px;

    }
</style>
