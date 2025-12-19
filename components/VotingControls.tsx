import { VoteType } from "@/types";
import { Heart, X } from "lucide-react";

interface VotingControlsProps {
  handleVote: (type: VoteType) => Promise<void>;
}

export const VotingControls: React.FC<VotingControlsProps> = ({
  handleVote,
}) => {
  return (
    <div className="flex-none px-6 pb-12 pt-4 flex justify-center gap-8 z-20">
      <button
        onClick={() => handleVote(VoteType.NO)}
        className="w-14 h-14 rounded-full bg-white dark:bg-slate-900 shadow-lg border border-gray-100 dark:border-slate-700 flex items-center justify-center text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 hover:scale-110 transition-all duration-200"
      >
        <X className="w-6 h-6" />
      </button>
      <button
        onClick={() => handleVote(VoteType.YES)}
        className="w-14 h-14 rounded-full bg-gray-900 dark:bg-violet-600 shadow-lg border border-gray-900 dark:border-violet-600 flex items-center justify-center text-white hover:bg-gray-800 dark:hover:bg-violet-500 hover:scale-110 transition-all duration-200"
      >
        <Heart className="w-6 h-6 fill-current" />
      </button>
    </div>
  );
};
