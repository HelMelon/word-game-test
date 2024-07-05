<script>
    import {levelsList} from './../../utils/levelsCounter.js';
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();

    export let count;

    function chooseLevel() {
        count += 1;
        const newLevel = levelsList.next().value;
        localStorage.setItem('levelStg', JSON.stringify(newLevel));

        dispatch('getLevel');
        dispatch('winStateChange', {
            winState: false
        });
    }
</script>

<div class="win-screen">
    <h2>Уровнь {count} пройден </h2>
    <p>Изумительно</p>
    <button on:click={chooseLevel}>{`Уровень ${count + 1}`}</button>
</div>

<style>
    .win-screen {
        margin: 50px auto;
        text-align: center;
    }

    h2, p {
        font-family: "VAG World", Arial, sans-serif;
        color: #fff;
    }

    p {
        margin-bottom: 5rem;
    }
</style>
