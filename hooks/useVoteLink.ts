import { useMemo } from "react";

export function useVoteLink(sessionId?: string) {
  return useMemo(() => {
    if (!sessionId) return `${window.location.origin}/vote/`;
    return `${window.location.origin}/vote/${sessionId}`;
  }, [sessionId]);
}
