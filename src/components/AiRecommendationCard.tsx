import { Sparkles, Brain, Target, TrendingUp } from "lucide-react";

const AiRecommendationCard = () => {
  const features = [
    {
      icon: Brain,
      title: "Smart Matching",
      description: "Our AI analyzes your preferences, budget, and lifestyle to find properties that truly fit you."
    },
    {
      icon: Target,
      title: "Precision Search",
      description: "Beyond basic filters—we understand context like commute times, neighborhood vibes, and more."
    },
    {
      icon: TrendingUp,
      title: "Market Insights",
      description: "Get real-time pricing trends and investment potential for every property."
    }
  ];

  return (
    <div className="relative overflow-hidden rounded-none bg-red-950/20 border border-white/10 p-8 md:p-12 card-3d">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-none bg-primary border border-primary">
            <Sparkles className="h-6 w-6 text-black" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">AI-Powered Discovery</h3>
            <p className="text-gray-400">Find your perfect home, intelligently</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-black/30 backdrop-blur-sm rounded-none p-6 border border-white/10 card-3d hover:border-primary/50 transition-colors">
              <feature.icon className="h-8 w-8 text-primary mb-4" />
              <h4 className="font-semibold text-white mb-2">{feature.title}</h4>
              <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AiRecommendationCard;
