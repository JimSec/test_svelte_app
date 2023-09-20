<script>
    import { enhance } from '$app/forms';
	
    const _types    = ["thing_one","thing_two","thing_three","will fail","surprise"];
    export let form;    
    let files;
    let type;
        

    const initializeParty = () => {
        party.settings.debug = false;

        document.body.addEventListener("click", function (e) {
            e.preventDefault();
            party.confetti(e);
        });
        document.body.addEventListener("contextmenu", function (e) {
            e.preventDefault();
            party.sparkles(e);
        });
    }

</script> 

<html lang="english">

    <title>Fun lil test app</title>
    <h1>Arbitrary upload and Server side script runner</h1>
    <br/> <br/>

    <form method="POST"
        action="?/run"
        enctype="multipart/form-data"
        use:enhance
    >

        <select name="type" bind:value={type}>
            {#each _types as val}
                <option value="{val}">{val}</option>
            {/each}
        </select>

        <label for="file">Upload a zip!</label>
        <input
            accept="zip,application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed"
            bind:files
            id="file"
            name="file"
            type="file"
        />

        <br/> <br/>

        <button type="submit"> Run Script </button>
        
    </form>


    {#if form?.surprise}
        <br/>
        <div class="party">
            <script src="https://cdn.jsdelivr.net/npm/party-js@latest/bundle/party.min.js" on:load={initializeParty}></script>
            <p>Party!!!!! Left and Right Click me!!!</p>
            <img src="party_cat.gif" alt="party cat"/>
            <img src="party_cat.gif" alt="party cat"/>
            <img src="party_cat.gif" alt="you'll never guess what this third one also is..."/>
            <br/>
            {form.message}
        </div>
    {:else if form?.success}
        <div class="p-4 bg-slate-100 w-3/6 mt-4">
            <p>Successful execution of {type}:</p>
            {form.message}
        </div>
    {:else if form?.message}
        <div class="p-4 bg-slate-100 w-3/6 mt-4">
            <p>Failed execution of {type}:</p>
            {form.message}
        </div>
    {/if}


</html>


<style type="text/css">

    * {
       font-size: 16px;
    }

    .party {
      font-family: fabfont,  monospace;
      max-width: fit-content;
      padding-left: 2%;
      padding-top: 1%;
      padding-right: 1%;
      margin: 0;
      background: #c74cb4;
  	} 
    html {
      font-family: fabfont,  monospace;
      width: 100%;
      height: 100vh;
      padding-left: 2%;
      padding-right: 5%;
      margin: 0;
      background: #d8d8bd;
  	} 
    
</style>