<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  import Button from './Button.svelte'
  import axios from 'axios'
  let open = false
  let dni, doc, amount
  function submit() {
    axios.put(`/api/user/auth/${localStorage.token}/recharge`, {dni, doc, amount})
    .then(() => {
      alert('la recargar fue todo un exito')
      open = false
      dispatch('success', amount);
    })
    .catch(err => {
      alert('error al rechargar el saldo')
      open = false
    })
  }
  export { open }
</script>
{#if open}
  <div class="overflow" on:click={() => open = false}></div>
  <dialog {open}>
    <h1>Recargar</h1>
    <input type="text" placeholder="cedula" bind:value={dni}>
    <input type="text" placeholder="documento" bind:value={doc}>
    <input type="number" placeholder="cantidad" bind:value={amount}>
    <Button on:click={submit}>acceptar</Button>
  </dialog>
{/if}

<style>
  dialog {
    padding: 64px;
    margin: auto;
    display: flex;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    flex-direction: column;
    z-index: 99;
    border: 1px solid rgba(0,0,0,.10);
  }
  .overflow {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.25);
    z-index: 98;
  }
  h1 {
    text-align: center;
  }
  * {
    margin-bottom: 16px;
  }
</style>