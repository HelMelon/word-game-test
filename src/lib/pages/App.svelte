<script>
    import {onMount} from "svelte";
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

    function handleTabDuplicate() {
        localStorage.setItem('tabHash', tabHash);
        anotherTab = true;
        level = JSON.parse(localStorage.getItem('levelStg'));
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
    <GamePage {level} {wordsList} {levelCount} on:winStateChange={handleWinState}/>
{:else}
    <WinPage bind:count={levelCount} on:getLevel={handleGetLevel} on:winStateChange={handleWinState}/>
{/if}
{#if !anotherTab}
    <Popup handleUpdate={handleTabDuplicate} />
{/if}
