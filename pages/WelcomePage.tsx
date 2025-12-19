import React from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/layouts/Layout";
import { Button } from "@/components/Button";
import { Sparkles, Users, TrendingUp, ArrowRight } from "lucide-react";

export const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Users,
      title: "Crowdsource Decisions",
      description: "Let your friends vote on your next Instagram post",
    },
    {
      icon: TrendingUp,
      title: "Real-time Results",
      description: "Watch votes come in and see which photos win",
    },
    {
      icon: Sparkles,
      title: "Simple & Fast",
      description: "Upload, share, and get instant feedback",
    },
  ];

  return (
    <Layout>
      <div className="w-full max-w-4xl px-6 py-12 md:py-24 flex flex-col items-center text-center">
        <div className="mb-6 relative animate-slide-up pt-10">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter bg-linear-to-r from-purple-400 via-violet-400 to-blue-400 dark:from-violet-300 dark:via-purple-300 dark:to-sky-300 bg-clip-text text-transparent">
            IsInsta?
          </h1>
        </div>

        <p
          className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-light mb-4 max-w-2xl animate-slide-up "
          style={{ animationDelay: "100ms" }}
        >
          Let your friends decide your next post
        </p>

        <p
          className="text-lg text-slate-500 dark:text-slate-400 font-light mb-12 max-w-xl animate-slide-up"
          style={{ animationDelay: "200ms" }}
        >
          Upload your photos, share the link, and let the crowd choose.{" "}
          <span className="bg-linear-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent font-medium truncate ">
            No sign-up required.
          </span>
        </p>

        <div
          className="mb-16 animate-slide-up"
          style={{ animationDelay: "300ms" }}
        >
          <Button
            onClick={() => navigate("/upload")}
            className="text-base px-8 py-4 group"
          >
            Get Started
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>

        <div
          className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up"
          style={{ animationDelay: "400ms" }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative p-6 rounded-2xl bg-white/40 dark:bg-slate-900/50 backdrop-blur-md border border-white/50 dark:border-slate-700 hover:border-violet-300 dark:hover:border-violet-600 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-violet-500 to-fuchsia-600 text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-violet-500/20">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-light leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};
