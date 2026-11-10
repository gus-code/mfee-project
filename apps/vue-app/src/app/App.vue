<template>
  <nav class="navbar bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img src="./assets/world.png" alt="Logo" width="30" height="30" class="d-inline-block align-text-top" />
      </a>
      <div>
        <button class="btn btn-outline-warning me-2">Categories</button>
        <button class="btn btn-outline-warning">Login</button>
      </div>
    </div>
  </nav>
  <router-view />
</template>

<script>
export default {};
</script>
