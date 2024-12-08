export const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-10, 0, -10],
    transition: {
      duration: 4,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

export const staggeredFloat = (index: number) => ({
  initial: { y: 0 },
  animate: {
    y: [-8, 0, -8],
    transition: {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity,
      delay: index * 0.2,
    },
  },
});