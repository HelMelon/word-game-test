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
         height: 25rem;
         padding: .75rem;
         display: flex;
         flex-flow: column nowrap;
         align-items: center;
         justify-content: center;
         background-color: #FFFFFF;
         z-index: 2;
     }

     .center h2,
     .center p {
         margin-bottom: 1rem;
     }


</style>

<div class="full-page">
    <div class="center">
        <h2>Popup</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis ducimus ipsum obcaecati!</p>
        <button on:click={handleUpdate}> Reload </button>
    </div>
</div>
