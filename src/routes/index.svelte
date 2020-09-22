<script>
  import { goto } from '@sapper/app'
  import Button from "../components/Button.svelte";
</script>
<main id="homepage">
  <h1>homepage</h1>
  <menu>
    <Button on:click={() => goto('/login')}>iniciar sesion</Button>
    <Button on:click={() => goto('/register')}>registrarse</Button>
  </menu>
</main>

<style>
  #homepage {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  h1 {
    font-size: 48px;
    text-transform: uppercase;
  }
  menu {
    width: calc(100% - 32px);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
  :global(#homepage button) {
    max-width: 250px;
    width: 100%;
    margin-bottom: 16px;
  }
  @media screen and (min-width: 516px) {
    :global(#homepage button:nth-child(1)) {
      margin-right: 16px;
    }
  }
</style>