<template>
  <div>
    <p>
      <font-awesome-icon :icon="['fas', 'user-ninja']" class="mr-3" />
      <small class="text-muted">{{ fullName() }} said: &nbsp;</small>
      <small class="text-muted">{{ commentBody }}</small>
    </p>
  </div>
</template>

<script>
export default {
  methods: {
    fullName() {
      return `${this.$props.commentOwner.firstName} ${this.$props.commentOwner.lastName}`;
    }
  },
  props: ['commentBody', 'commentOwner']
};
</script>
