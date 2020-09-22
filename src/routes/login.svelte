<script>
  import { goto, stores } from '@sapper/app'
  const { session } = stores();
  import Button from '../components/Button.svelte'
  import axios from 'axios'
  let email = '';
  let password = '';
  function submit() {
    axios.get(`/api/user/${email}&${password}`)
    .then(res => {
      session.set({...res.data.doc})
      goto(`/wallet/${res.data.token}`)
    })
    .catch(err => {
      alert('autenticacion invalida')
    })
  }
</script>
<main id="login">
  <h1>Iniciar Sesion</h1>
  <input type="email" placeholder="Email" bind:value={email} required>
  <input type="password" placeholder="Clave" bind:value={password} required>
  <Button on:click={submit}>Entrar</Button>
  <p>Aun no se ha registrado? <a href="register">REGISTRARSE</a></p>
</main>

<style>
  #login {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  h1 {
    font-size: 36px;
    margin-bottom: 16px;
  }
  :global(#login input) {
    margin-bottom: 16px;
  }
  :global(#login button) {
    margin-bottom: 16px;
  }
</style>