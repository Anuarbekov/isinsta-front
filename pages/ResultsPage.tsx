import React, { useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/layouts/Layout";
import { Button } from "@/components/Button";

import { useSession } from "@/hooks/useSession";
import { useVoteLink } from "@/hooks/useVoteLink";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

import { ResultsHeader } from "@/components/ResultsHeader";
import { ResultsGrid } from "@/components/ResultsGrid";

export const ResultsPage: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();

  const session = useSession(sessionId);
  const voteLink = useVoteLink(sessionId);

  const { copied, copy } = useCopyToClipboard(2000);

  const totalVotes = useMemo(() => {
    if (!session) return 0;
    return session.images.reduce(
      (acc, img) => acc + img.votesYes + img.votesNo,
      0
    );
  }, [session]);

  const handleCopyLink = useCallback(() => {
    copy(voteLink);
  }, [copy, voteLink]);

  const handleShare = useCallback(async () => {
    const shareData = {
      title: "Help me choose!",
      text: "Help me choose my next post! Vote here:",
      url: voteLink,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Share canceled or failed", err);
      }
    } else {
      handleCopyLink();
    }
  }, [handleCopyLink, voteLink]);

  if (!session) {
    return (
      <Layout>
        <div className="p-12 text-center text-slate-400 dark:text-slate-500 animate-pulse">
          Syncing results...
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="w-full max-w-5xl px-6 py-12">
        <ResultsHeader
          totalVotes={totalVotes}
          itemsCount={session.images.length}
          voteLink={voteLink}
          copied={copied}
          onCopy={handleCopyLink}
          onShare={handleShare}
        />

        <ResultsGrid images={session.images} />

        <div className="pt-4 text-center">
          <Button variant="secondary" onClick={() => navigate("/upload")}>
            Start a new session
          </Button>
        </div>
      </div>
    </Layout>
  );
};
