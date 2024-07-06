<script>
    export let handleUpdate;
</script>

<style>
    h2 {
        font-size: 2rem;
        text-align: center;
    }

    .full-page {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .3);
        z-index: 1;
    }

    .center {
        position: relative;
        width: 25rem;
        height: 20rem;
        padding: .75rem;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: center;
        background-color: #FFFFFF;
        z-index: 2;
        border-radius: 20px;
    }

    .center h2,
    .center p {
        margin-bottom: 1rem;
        text-align: center;
    }


</style>

<div class="full-page">
    <div class="center">
        <h2>Две вкладки с игрой?</h2>
        <p>Похоже, игра открыта в нескольких вкладках браузера. Чтобы продолжить играть в этой вкладке, обновите страницу.</p>
        <button on:click={handleUpdate}>Обновить</button>
    </div>
</div>
