import { useEffect, useState } from "react";
import { storageService } from "@/services/storageService";

import { Session, ImageData, VoteType } from "../types";
export const useVotingSession = (sessionId: string | undefined) => {
  const [state, setState] = useState({
    session: null as Session | null,
    queue: [] as ImageData[],
    loading: true,
  });

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      if (!sessionId) return;
      const data = await storageService.getSession(sessionId);
      if (isMounted && data) {
        setState({ session: data, queue: data.images, loading: false });
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, [sessionId]);

  const handleVote = async (type: VoteType) => {
    if (!sessionId || state.queue.length === 0) return;

    const currentImage = state.queue[0];
    setState((prev) => ({ ...prev, queue: prev.queue.slice(1) }));

    await storageService.submitVote(sessionId, currentImage.id, type);
  };

  return {
    ...state,
    handleVote,
    isCompleted: state.queue.length === 0 && !state.loading,
  };
};
