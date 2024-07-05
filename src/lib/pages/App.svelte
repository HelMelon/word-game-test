<script>
    import {onMount, tick} from "svelte";
    import GamePage from "./GamePage.svelte";
    import WinPage from "./WinPage.svelte";
    import Popup from "../../lib/elements/Popup.svelte";
    import {levelsList} from "../../utils/levelsCounter.js";


    let tabHash = Math.random().toString(16).slice(2);
    localStorage.setItem('tabHash', tabHash);
    let storedTabHash = localStorage.getItem('tabHash');
    let anotherTab = tabHash === storedTabHash;

    let levelCount = 1;
    let level = levelsList.next().value;
    let wordsList = JSON.parse(JSON.stringify(level));

    let isWinStep = false;

    let repaintGamePage = true;

    function handleGetLevel() {
        level = JSON.parse(localStorage.getItem('levelStg'));
        wordsList = JSON.parse(JSON.stringify(level));
    }

    function handleWinState(event) {
        isWinStep = event.detail.winState;
    }

    function onUnloadHandler () {
        localStorage.removeItem('tabHash');
        return false;
    }

    async function handleTabDuplicate() {
        localStorage.setItem('tabHash', tabHash);
        anotherTab = true;
        repaintGamePage = false;
        level = JSON.parse(localStorage.getItem('levelStg'));
        await tick();
        repaintGamePage = true;
    }

    function handleActivity() {
        anotherTab = tabHash === localStorage.getItem('tabHash');
    }

    onMount(() => {
        level = JSON.parse(localStorage.getItem('levelStg')) || level;
        return onUnloadHandler
    });

</script>

<svelte:window on:beforeunload|preventDefault={onUnloadHandler} on:focus|preventDefault={handleActivity} />

{#if (!isWinStep) }
    {#if repaintGamePage}
        <GamePage {level} {wordsList} {levelCount} on:winStateChange={handleWinState}/>
    {/if}
{:else}
    <WinPage bind:count={levelCount} on:getLevel={handleGetLevel} on:winStateChange={handleWinState}/>
{/if}
{#if !anotherTab}
    <Popup handleUpdate={handleTabDuplicate} />
{/if}
