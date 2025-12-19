import React from "react";
import { Copy, Share } from "lucide-react";

type Props = {
  totalVotes: number;
  itemsCount: number;
  voteLink: string;
  copied: boolean;
  onCopy: () => void;
  onShare: () => void;
};

export const ResultsHeader: React.FC<Props> = React.memo(
  ({ totalVotes, itemsCount, voteLink, copied, onCopy, onShare }) => {
    return (
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div className="relative">
          <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-slate-100 dark:via-slate-300 dark:to-slate-100">
            Results
          </h1>

          <p className="text-slate-500 dark:text-slate-300 mt-2 font-light text-lg">
            {totalVotes === 0 ? (
              "Waiting for the first swipe..."
            ) : (
              <span className="flex items-center gap-2">
                <span className="font-semibold text-violet-600 dark:text-violet-400">
                  {totalVotes}
                </span>{" "}
                votes collected
                <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                <span className="text-slate-400 dark:text-slate-400">
                  {itemsCount} items
                </span>
              </span>
            )}
          </p>
        </div>

        <div className="w-full md:w-auto ">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">
              Share Link
            </span>

            <div className="flex items-center gap-2 w-full">
              <div className="flex-1 relative h-12 bg-white/60 dark:bg-slate-900/70 backdrop-blur-md border border-white/60 dark:border-slate-700 rounded-xl flex items-center px-2 shadow-sm hover:shadow-md transition-shadow min-w-0">
                <span className="text-xs text-slate-500 dark:text-slate-300 mr-2 truncate font-mono">
                  {voteLink}
                </span>

                <button
                  onClick={onCopy}
                  className="ml-auto shrink-0 px-3 py-2 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-100 dark:border-slate-600 text-xs font-semibold text-slate-700 dark:text-slate-100 transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  {copied ? "Copied" : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <button
                onClick={onShare}
                className="h-12 w-12 shrink-0 flex items-center justify-center bg-violet-600 text-white rounded-xl shadow-lg shadow-violet-500/20 hover:bg-violet-700 active:scale-95 transition-all md:hidden"
                title="Share"
              >
                <Share className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
