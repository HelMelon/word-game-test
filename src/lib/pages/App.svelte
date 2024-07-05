<script>
    import {onMount} from "svelte";
    import GamePage from "./GamePage.svelte";
    import WinPage from "./WinPage.svelte";
    import Popup from "../../lib/elements/Popup.svelte";
    import {levelsList} from "../../utils/levelsCounter.js";


    let levelCount = 1;
    let tabHash = Math.random().toString(16).slice(2);
    let storedTabHash = localStorage.getItem('tabHash') || tabHash;
    let level = levelsList.next().value.map(i => i);
    let wordsList = JSON.parse(JSON.stringify(level));
    let isWinStep = false;
    let anotherTab = tabHash === storedTabHash;

    function handleGetLevel() {
        level = JSON.parse(localStorage.getItem('levelStg'));
        wordsList = JSON.parse(JSON.stringify(level));
    }

    function handleWinState(event) {
        isWinStep = event.detail.winState;
    }

    function onUnloadHandler () {
        debugger;
        if (!anotherTab) {
            localStorage.removeItem('tabHash');
        }
    }

    function handleTabDuplicate() {
        localStorage.setItem('tabHash', tabHash);
        storedTabHash = tabHash;
        anotherTab = false;
        localStorage.setItem('levelStg', JSON.stringify(level));
    }

    function handleActivity() {
        anotherTab = tabHash === localStorage.getItem('tabHash');
    }

    onMount(() => {
        localStorage.setItem('tabHash', anotherTab ? tabHash : storedTabHash);
        return onUnloadHandler
    });

</script>

<svelte:window on:unload={onUnloadHandler} on:click={handleActivity} />
<div>
    {#if (!isWinStep) }
        <GamePage {level} {wordsList} {levelCount} on:winStateChange={handleWinState}/>
    {:else}
        <WinPage bind:count={levelCount} on:getLevel={handleGetLevel} on:winStateChange={handleWinState}/>
    {/if}
    {#if !anotherTab}
        <Popup handleUpdate={handleTabDuplicate} />
    {/if}
</div>