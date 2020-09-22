<button {...$$props} on:click>
  <slot></slot>
</button>

<style>
  button {
    min-width: 56px;
    min-height: 36px;
    border: none;
    background: rgb(30, 30, 30);
    outline: none;
    font-size: 16px;
    font-weight: 500;
    text-transform: uppercase;
    padding: 0 16px;
    color: white;
    border-radius: 60px;
  }
</style>