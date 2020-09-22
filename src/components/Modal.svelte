<script>
  let open = true
  export { open }
</script>
<dialog {open}>
  <div class="overflow" on:click={() => open = false}></div>
  <section>
    <slot></slot>
  </section>
</dialog>

<style>
  dialog {
    max-width: 860px;
    width: calc(100% - 64px);
    max-height: 560px;
    height: calc(100% - 64px);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 99;
    border: none;
  }
  .overflow {
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.25);
    position: fixed;
    top: 0;
    left: 0;
  }
  section {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 2;
    background: white;
  }
</style>