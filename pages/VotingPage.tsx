import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Layout } from "@/layouts/Layout";
import { Button } from "@/components/Button";

import { useVotingSession } from "@/hooks/useVotingSession";
import { VotingHeader } from "@/components/VotingHeader";
import { VotingControls } from "@/components/VotingControls";
import { SwipeCard } from "@/components/SwipeCard";
import { Check } from "lucide-react";
const MAX_VISIBLE_CARDS = 1;

export const VotingPage: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const { session, queue, loading, handleVote, isCompleted } =
    useVotingSession(sessionId);

  const visibleCards = useMemo(() => {
    return queue.slice(0, MAX_VISIBLE_CARDS).reverse();
  }, [queue]);

  if (loading) {
    return (
      <Layout fullHeight>
        <div className="flex items-center justify-center h-full">
          <div className="w-8 h-8 border-2 border-gray-200 dark:border-slate-700 border-t-gray-800 dark:border-t-slate-100 rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!session) {
    return (
      <Layout>
        <div className="mt-32 text-center">
          <h2 className="text-xl font-light text-slate-900 dark:text-slate-100">
            Session not found.
          </h2>
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mt-4"
          >
            Go Home
          </Button>
        </div>
      </Layout>
    );
  }

  if (isCompleted) {
    return (
      <Layout fullHeight>
        <div className="flex flex-col items-center justify-center h-full px-6 text-center animate-slide-up">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
            <Check className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-light text-gray-900 mb-2 dark:text-white">
            All done!
          </h2>
          <p className="text-gray-500 font-light mb-8 max-w-xs mx-auto">
            You've voted on all images. Your friend appreciates the help.
          </p>
          <Button onClick={() => navigate("/upload")} variant="secondary">
            Make my own IsInsta
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout fullHeight>
      <div className="flex flex-col h-full w-full max-w-md mx-auto relative">
        <VotingHeader count={queue.length} />
        <div className="relative w-full flex-1 flex flex-col items-center justify-center min-h-[65vh] max-h-[600px]">
          <AnimatePresence>
            {visibleCards.map((image, index) => (
              <SwipeCard
                key={image.id}
                image={image}
                onVote={handleVote}
                index={index}
              />
            ))}
          </AnimatePresence>
        </div>
        <VotingControls handleVote={handleVote} />
      </div>
    </Layout>
  );
};
