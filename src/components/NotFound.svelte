<script>
  let { pool } = $props();
</script>

<h2>{pool[Math.floor(Math.random() * pool.length)]}</h2>
