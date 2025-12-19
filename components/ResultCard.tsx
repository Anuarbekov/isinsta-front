import React, { useMemo } from "react";
import { Heart, X } from "lucide-react";
import { Session } from "../types";

type ImageItem = Session["images"][number];

type Props = {
  img: ImageItem;
};

export const ResultCard: React.FC<Props> = React.memo(({ img }) => {
  const { total, percentage } = useMemo(() => {
    const totalVotes = img.votesYes + img.votesNo;
    const pct =
      totalVotes > 0 ? Math.round((img.votesYes / totalVotes) * 100) : 0;
    return { total: totalVotes, percentage: pct };
  }, [img.votesNo, img.votesYes]);

  const isApproved = percentage >= 50;

  return (
    <div className="bg-white/40 dark:bg-slate-900/70 backdrop-blur-md rounded-2xl shadow-sm border border-white/50 dark:border-slate-700 overflow-hidden group hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-square relative bg-slate-100 dark:bg-slate-900">
        <img
          src={img.url}
          alt={img.name}
          className="w-full h-full object-cover transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="text-white text-sm font-medium truncate w-full">
            {img.name}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-end mb-3">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-400 uppercase tracking-wider mb-1">
              Approval
            </span>
            <span
              className={`text-3xl font-light tracking-tight ${
                isApproved
                  ? "text-slate-800 dark:text-slate-100"
                  : "text-slate-400 dark:text-slate-500"
              }`}
            >
              {percentage}%
            </span>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-400 dark:text-slate-300 font-medium bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
              {total} votes
            </span>
          </div>
        </div>

        <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-5 border border-slate-50 dark:border-slate-700">
          <div
            className={`h-full transition-all duration-1000 ease-out ${
              isApproved
                ? "bg-linear-to-r from-violet-500 to-fuchsia-500"
                : "bg-slate-300 dark:bg-slate-600"
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        <div className="flex justify-between text-sm border-t border-slate-100 dark:border-slate-700 pt-4">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-200">
            <div className="p-1.5 bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 rounded-full">
              <Heart className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold">{img.votesYes}</span>
          </div>

          <div className="flex items-center gap-2 text-slate-400 dark:text-slate-400">
            <div className="p-1.5 bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-400 rounded-full">
              <X className="w-3.5 h-3.5" />
            </div>
            <span className="font-medium">{img.votesNo}</span>
          </div>
        </div>
      </div>
    </div>
  );
});
