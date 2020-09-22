<script>
  import Button from '../components/Button.svelte'
  import { goto } from '@sapper/app'
  import axios from 'axios'
  let name, dni, doc, email, password
  function submit() {
    axios.post('/api/user', { name, dni, doc, email, password })
    .then(res => {
      session.set({...res.data.doc})
      goto(`/wallet/${res.data.token}`)
    })
    .catch((err) => {
      alert('error al rellenar los campos')
    })
  }
</script>
<main id="register">
  <h1>Registrarser</h1>
  <input type="text" placeholder="Nombre" bind:value={name} required>
  <input type="text" placeholder="cedula" bind:value={dni} required>
  <input type="text" placeholder="doc" bind:value={doc} required>
  <input type="email" placeholder="email" bind:value={email} required>
  <input type="password" placeholder="clave" bind:value={password} required>
  <Button on:click={submit}>Enter</Button>
  <p>Aun no se ha registrado? <a href="/login">INICIAR SESION</a></p>
</main>
<style>
  #register {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  h1 {
    font-size: 36px;
    margin-bottom: 16px;
  }
  :global(#register input) {
    margin-bottom: 16px;
  }
  :global(#register button) {
    margin-bottom: 16px;
  }
</style>