export default {
  makeToast(
    message,
    title = 'Something went wrong!',
    variant = 'danger',
    position = 'b-toaster-top-center'
  ) {
    this.$bvToast.toast(`${message}`, {
      title: `${title}`,
      toaster: position,
      variant: variant,
      solid: true
    });
  }
};
