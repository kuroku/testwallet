<script context="module">
  export async function preload(page) {
		const { id } = page.params;
		const res = await this.fetch(`/api/user/auth/${id}`);
		const user = await res.json();
		if (!user.name) this.redirect(302,'/')
		return { user, token: id };
	}
</script>
<script>
	import { onMount } from 'svelte' 
	import Appbar from '../../components/Appbar.svelte'
	import Button from '../../components/Button.svelte'
	import Recharger from '../../components/Recharger.svelte'
	import Pay from '../../components/Pay.svelte'
	let recharger = false
	let pay = false
	let user
	let token
	let amount = 0;
	$: total = user.amount + amount
	$: {
		console.log(amount)
	}
	onMount(() => {
		localStorage.token = token
	})
	let { transactions } = user
	export { user, token }
</script>
<main id="wallet">
	<Appbar title="Wallet" amount={total}/>
	<section>
		{#each transactions as {to, from, amount, status}}
			<article>
				<h1>Pago con un monto: ${amount}</h1>
				<h6>De: {from.email == user.email ? 'Mi' : from.email }</h6>
				<h6>A: {to.email == user.email ? 'Para ti' : to.email}</h6>
				<h6>estado: {status}</h6>
			</article>
		{:else}
			<h1>no ha realizado ninguna transferencia</h1>
		{/each}
		<menu>
			<Button on:click={() => pay = true}>Pagar</Button>
			<Button on:click={() => recharger = true}>recargar</Button>
		</menu>
	</section>
	<Recharger bind:open={recharger} on:success={e => amount+=e.detail}/>
	<Pay bind:open={pay} on:success={({detail}) => transactions.push({to: {email: detail.to}, from: {email: user.email}, amount: detail.amount, status: 'wait'})}/>
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
		flex-wrap: wrap;
		background: #f5f5f5;
	}
	article {
		border: 1px solid rgba(0,0,0,.10);
		padding: 16px;
		margin: 16px;
		background: white;
	}
	h6 {
		font-size: 14px;
	}
	menu {
		position: fixed;
		bottom: 16px;
		right: 16px;
	}
</style>