import "react";
import Lottie from "react-lottie-player";
import lottieJson from "../../assets/LottieAnimation.json";

const LottieAnimation = () => {
  return (
    <Lottie
      loop
      animationData={lottieJson}
      play
      style={{ width: 350, height: 350 }}
    />
  );
};

export default LottieAnimation;
