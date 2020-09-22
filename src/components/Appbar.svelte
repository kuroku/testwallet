<script>
  let title = 'headline 6';
  let amount = 0
  export { title, amount }
</script>
<header id="appbar">
  <h6>{title}</h6>
  <menu>
    <h6>${amount}</h6>
    <button icon="account_circle"></button>
  </menu>
</header>
<style>
  #appbar {
    width: 100%;
    height: 56px;
    display: flex;
    align-items: center;
    padding: 0 16px;
  }
  h6 {
    font-size: 20px;
    font-weight: 500;
  }
  menu {
    margin-left: auto;
    display: flex;
    align-items: center;
  }
  menu button {
    border: none;
    background: none;
    font-size: 24px;
    margin-left: 24px;
  }
</style>