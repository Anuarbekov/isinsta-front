import { VoteType, ImageData } from "@/types";
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimation,
} from "framer-motion";
import { X, Heart } from "lucide-react";

interface SwipeCardProps {
  image: ImageData;
  onVote: (type: VoteType) => void;
  index: number;
}

export const SwipeCard = ({ image, onVote, index }: SwipeCardProps) => {
  const controls = useAnimation();
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

  const rightOpacity = useTransform(x, [0, 150], [0, 1]);
  const leftOpacity = useTransform(x, [-150, 0], [1, 0]);

  const handleDragEnd = async (_: any, info: any) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset > 100 || velocity > 500) {
      await controls.start({ x: 500, opacity: 0 });
      onVote(VoteType.YES);
    } else if (offset < -100 || velocity < -500) {
      await controls.start({ x: -500, opacity: 0 });
      onVote(VoteType.NO);
    } else {
      controls.start({ x: 0 });
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={controls}
      style={{ x, rotate, opacity, zIndex: 100 - index }}
      className="absolute top-0 w-full max-w-sm md:max-w-md h-full rounded-3xl overflow-hidden shadow-2xl bg-black cursor-grab active:cursor-grabbing touch-none"
    >
      <img
        src={image.url}
        alt="Rate me"
        className="w-full h-full object-cover pointer-events-none"
      />

      <motion.div
        style={{ opacity: rightOpacity }}
        className="absolute inset-0 bg-green-500/30 flex items-center justify-center pointer-events-none"
      >
        <Heart className="w-24 h-24 text-white fill-current" />
      </motion.div>
      <motion.div
        style={{ opacity: leftOpacity }}
        className="absolute inset-0 bg-red-500/30 flex items-center justify-center pointer-events-none"
      >
        <X className="w-24 h-24 text-white" />
      </motion.div>
    </motion.div>
  );
};
