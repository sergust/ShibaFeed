<template>
  <div>
    <p>
      <font-awesome-icon :icon="['fas', 'user-ninja']" class="mr-3" />
      <small class="text-muted">{{commentOwner}} said: &nbsp;</small>
      <small class="text-muted">{{commentBody}}</small>
    </p>
  </div>
</template>

<script>
export default {
  props: ['commentBody', 'commentOwner']
};
</script>