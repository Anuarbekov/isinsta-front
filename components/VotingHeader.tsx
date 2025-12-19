interface VotingHeaderProps {
  count: number;
}

const VotingHeader: React.FC<VotingHeaderProps> = ({ count }) => {
  return (
    <div className="flex-none pt-4 px-6 flex justify-between items-center z-20 pb-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 tracking-tight">
        Vote
      </h3>
      <h5 className="text-sm font-light text-gray-400 dark:text-slate-400">
        {count} left
      </h5>
    </div>
  );
};
export { VotingHeader };
