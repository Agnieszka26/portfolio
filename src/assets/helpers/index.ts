export const isEven = (index: number) => {
  if (index % 2 === 0) {
    return true;
  } else return false;
};

export const directionAnimationOnScroll = (x: any) =>
  x ? "animate__fadeInLeft " : "animate__fadeInRight";
export const directionAnimationOnScrollSwap = (x: any) =>
  x ? "animate__fadeInRight" : "animate__fadeInLeft ";
