import React from "react";
import { Session } from "../types";
import { ResultCard } from "./ResultCard";

type Props = {
  images: Session["images"];
};

export const ResultsGrid: React.FC<Props> = React.memo(({ images }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {images.map((img) => (
        <ResultCard key={img.id} img={img} />
      ))}
    </div>
  );
});
