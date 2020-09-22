<script context="module">
  export async function preload(page) {
		const { id } = page.params;
		const res = await this.fetch(`/api/user/auth/${id}`);
		const user = await res.json();
		if (!user.name) this.redirect(302,'/')
		return { user };
	}
</script>
<script>
	import Appbar from '../../components/Appbar.svelte'
	import Fab from '../../components/Fab.svelte'
	import TranxOptions from '../../components/Tranxoptions.svelte'
	let user;
	let openTranx = true
	export { user }
</script>
<main id="wallet">
	<Appbar title="Wallet" amount={user.amount}/>
	<section>
		<h1>no ha realizado ninguna transferencia</h1>
		<Fab on:click={() => openTranx = true}/>
	</section>
	<TranxOptions bind:open={openTranx}></TranxOptions>
</main>

<style>
	#wallet {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}
	section {
		width: 100%;
		height: 100%;
		overflow: auto;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>