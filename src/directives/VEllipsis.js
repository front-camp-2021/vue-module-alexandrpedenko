export default {
  name: "Ellipsis",
  mounted(el) {
    el.style.textOverflow = 'ellipsis';
    el.style.overflow = 'hidden';
    el.style.whiteSpace = 'nowrap';
  }
};
