import { useEffect, useState } from "react";
import { storageService } from "../services/storageService";
import { Session } from "../types";

export function useSession(sessionId?: string) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      if (!sessionId) return;
      const data = await storageService.getSession(sessionId);
      if (data) setSession(data);
    };

    fetchSession();
  }, [sessionId]);

  return session;
}
