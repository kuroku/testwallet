<script context="module">
  export async function preload(page) {
    const { payload } = page.params
    const res = await this.fetch(`/api/user/transaction/${payload}`, { method: 'PUT' })
		const tranx = await res.json();
    return { hash: tranx }
  }
</script>
<script>
  import Button from '../../components/Button.svelte'
  import { goto } from '@sapper/app'
  let hash
  export { hash }
</script>
<main id="tranx">
  <h1>{hash.message}</h1>
  <p>inicie sesion para comprobar su balance</p>
  <Button on:click={() => goto('/login')}>Iniciar sesin</Button>
</main>

<style>
  #tranx {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>