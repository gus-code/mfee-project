export const alerts = {
  methods: {
    showAlert(icon, title) {
      this.$swal({
        position: 'top-end',
        icon,
        title,
        showConfirmButton: false,
        timer: 1500
      });
    }
  }
};
