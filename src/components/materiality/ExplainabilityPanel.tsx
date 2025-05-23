import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Info as InfoIcon,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  BarChart3,
  LineChart,
  FileText,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FactorProps {
  name: string;
  value: number;
  description?: string;
}

const Factor = ({ name, value, description = "" }: FactorProps) => {
  return (
    <div className="mb-4 animate-fade-in-up">
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center">
          <span className="text-sm font-medium">{name}</span>
          {description && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon className="h-4 w-4 ml-1 text-[var(--text-tertiary)] cursor-help transition-transform duration-fast hover:scale-110" />
                </TooltipTrigger>
                <TooltipContent className="bg-[var(--bg-elevated)] border-[var(--border-primary)] shadow-md">
                  <p className="max-w-xs">{description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <span className="text-sm font-semibold">{value.toFixed(2)}</span>
      </div>
      <div className="relative">
        <Progress value={value * 100} className="h-2 overflow-hidden" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shimmer"></div>
      </div>
    </div>
  );
};

interface BenchmarkProps {
  industry: string;
  average: number;
  yourScore: number;
}

const IndustryBenchmark = ({
  industry,
  average,
  yourScore,
}: BenchmarkProps) => {
  return (
    <div className="p-md border rounded-lg mb-sm bg-[var(--bg-secondary)] transition-all duration-normal ease-out hover:translate-x-1 hover:shadow-sm animate-fade-in-up">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{industry}</span>
        <div>
          <span className="text-xs text-[var(--text-tertiary)] mr-2">
            Industry avg: {average.toFixed(2)}
          </span>
          <span className="text-xs font-semibold text-primary">
            Your score: {yourScore.toFixed(2)}
          </span>
        </div>
      </div>
      <div className="relative h-2 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
        <div
          className="absolute h-full bg-primary/30 rounded-full"
          style={{ width: `${average * 100}%` }}
        />
        <div
          className="absolute h-full w-1 bg-primary animate-pulse"
          style={{ left: `${yourScore * 100}%` }}
        />
      </div>
    </div>
  );
};

interface RegulatoryItemProps {
  name: string;
  relevance: "high" | "medium" | "low";
  description: string;
}

const RegulatoryItem = ({
  name,
  relevance,
  description,
}: RegulatoryItemProps) => {
  const relevanceColor = {
    high: "bg-danger/10 text-danger border-danger/20",
    medium: "bg-warning/10 text-warning border-warning/20",
    low: "bg-success/10 text-success border-success/20",
  }[relevance];

  const relevanceIcon = {
    high: <AlertTriangle className="h-4 w-4 mr-1" />,
    medium: <InfoIcon className="h-4 w-4 mr-1" />,
    low: <CheckCircle className="h-4 w-4 mr-1" />,
  }[relevance];

  return (
    <div className="p-md border rounded-lg mb-sm transition-all duration-normal ease-out hover:translate-x-1 hover:shadow-sm animate-fade-in-up">
      <div className="flex justify-between items-start">
        <div className="font-medium">{name}</div>
        <Badge
          variant="outline"
          className={`${relevanceColor} flex items-center`}
        >
          {relevanceIcon}
          {relevance.charAt(0).toUpperCase() + relevance.slice(1)}
        </Badge>
      </div>
      <p className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

interface RecommendationProps {
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
}

const Recommendation = ({
  title,
  description,
  impact,
}: RecommendationProps) => {
  const impactColor = {
    high: "bg-success/10 text-success border-success/20",
    medium: "bg-primary/10 text-primary border-primary/20",
    low: "bg-neutral-500/10 text-neutral-500 border-neutral-500/20",
  }[impact];

  return (
    <div className="p-md border rounded-lg mb-sm transition-all duration-normal ease-out hover:translate-x-1 hover:shadow-sm animate-fade-in-up">
      <div className="flex justify-between items-start">
        <div className="font-medium">{title}</div>
        <Badge variant="outline" className={impactColor}>
          {impact.charAt(0).toUpperCase() + impact.slice(1)} Impact
        </Badge>
      </div>
      <p className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

interface ExplainabilityPanelProps {
  topic?: {
    id: string;
    name: string;
    description: string;
    materialityScore: number;
    impactScore: number;
    financialScore: number;
    contributingFactors: {
      name: string;
      value: number;
      description?: string;
    }[];
    industryBenchmarks: {
      industry: string;
      average: number;
      yourScore: number;
    }[];
    regulatoryRequirements: {
      name: string;
      relevance: "high" | "medium" | "low";
      description: string;
    }[];
    recommendations: {
      title: string;
      description: string;
      impact: "high" | "medium" | "low";
    }[];
  };
  topicId?: string;
}

const ExplainabilityPanel = ({ topic, topicId }: ExplainabilityPanelProps) => {
  // Here we could add a hook to fetch topic data by ID if needed
  // const { topic: fetchedTopic, isLoading } = useTopic(topicId);
  // Default topic if none is provided
  const defaultTopic = {
    id: "climate-change",
    name: "Climate Change",
    description:
      "Climate change refers to long-term shifts in temperatures and weather patterns, mainly caused by human activities, especially the burning of fossil fuels.",
    materialityScore: 0.85,
    impactScore: 0.78,
    financialScore: 0.92,
    contributingFactors: [
      {
        name: "Regulatory Pressure",
        value: 0.95,
        description:
          "Increasing global regulations on carbon emissions and climate disclosures",
      },
      {
        name: "Stakeholder Interest",
        value: 0.87,
        description:
          "Growing investor and customer concern about climate impacts",
      },
      {
        name: "Industry Exposure",
        value: 0.76,
        description:
          "Your industry has significant exposure to climate transition risks",
      },
      {
        name: "Physical Risk",
        value: 0.65,
        description:
          "Potential impacts from extreme weather events on operations",
      },
      {
        name: "Market Opportunity",
        value: 0.82,
        description:
          "Potential for new products and services in a low-carbon economy",
      },
    ],
    industryBenchmarks: [
      { industry: "Energy", average: 0.92, yourScore: 0.85 },
      { industry: "Manufacturing", average: 0.78, yourScore: 0.85 },
      { industry: "Technology", average: 0.65, yourScore: 0.85 },
    ],
    regulatoryRequirements: [
      {
        name: "TCFD Reporting",
        relevance: "high",
        description:
          "Task Force on Climate-related Financial Disclosures requires reporting on governance, strategy, risk management, and metrics related to climate change.",
      },
      {
        name: "EU CSRD",
        relevance: "medium",
        description:
          "Corporate Sustainability Reporting Directive requires detailed reporting on environmental impacts including climate change.",
      },
      {
        name: "Carbon Pricing",
        relevance: "high",
        description:
          "Various carbon pricing mechanisms may apply to your operations, potentially increasing costs.",
      },
    ],
    recommendations: [
      {
        title: "Develop Climate Strategy",
        impact: "high",
        description:
          "Create a comprehensive climate strategy with clear targets for emissions reduction and climate resilience.",
      },
      {
        title: "Conduct Scenario Analysis",
        impact: "medium",
        description:
          "Perform climate scenario analysis to understand potential business impacts under different climate futures.",
      },
      {
        title: "Enhance Disclosures",
        impact: "high",
        description:
          "Improve climate-related disclosures aligned with TCFD recommendations and other relevant frameworks.",
      },
    ],
  };

  const displayTopic = topic || defaultTopic;

  return (
    <div className="w-full h-full animate-fade-in-up">
      <Tabs defaultValue="factors" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4 bg-[var(--bg-secondary)]">
          <TabsTrigger
            value="factors"
            className="flex items-center gap-1 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
          >
            <BarChart3 className="h-3.5 w-3.5" />
            <span>Factors</span>
          </TabsTrigger>
          <TabsTrigger
            value="benchmarks"
            className="flex items-center gap-1 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
          >
            <LineChart className="h-3.5 w-3.5" />
            <span>Benchmarks</span>
          </TabsTrigger>
          <TabsTrigger
            value="regulatory"
            className="flex items-center gap-1 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Regulatory</span>
          </TabsTrigger>
          <TabsTrigger
            value="recommendations"
            className="flex items-center gap-1 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
          >
            <Lightbulb className="h-3.5 w-3.5" />
            <span>Actions</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="factors" className="space-y-4 animate-fade-in-up">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-md border rounded-lg bg-[var(--bg-secondary)] transition-all duration-normal ease-out hover:translate-y-[-2px] hover:shadow-md">
              <div className="text-sm font-medium mb-1 text-[var(--text-secondary)]">
                Impact Score
              </div>
              <div className="text-2xl font-bold gradient-text">
                {(displayTopic.impactScore * 100).toFixed(0)}%
              </div>
            </div>
            <div className="p-md border rounded-lg bg-[var(--bg-secondary)] transition-all duration-normal ease-out hover:translate-y-[-2px] hover:shadow-md">
              <div className="text-sm font-medium mb-1 text-[var(--text-secondary)]">
                Financial Score
              </div>
              <div className="text-2xl font-bold gradient-text">
                {(displayTopic.financialScore * 100).toFixed(0)}%
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary" />
              <span>Contributing Factors</span>
            </h4>
            {displayTopic.contributingFactors.map((factor, index) => (
              <Factor
                key={index}
                name={factor.name}
                value={factor.value}
                description={factor.description}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="benchmarks" className="animate-fade-in-up">
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <LineChart className="h-4 w-4 text-primary" />
            <span>Industry Benchmarks</span>
          </h4>
          {displayTopic.industryBenchmarks.map((benchmark, index) => (
            <IndustryBenchmark
              key={index}
              industry={benchmark.industry}
              average={benchmark.average}
              yourScore={benchmark.yourScore}
            />
          ))}
          <div className="mt-4 p-sm bg-primary/5 rounded-lg border border-primary/10">
            <p className="text-sm text-[var(--text-secondary)] flex items-start gap-2">
              <InfoIcon className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>
                Benchmark data is based on analysis of public disclosures from
                companies in your industry and region.
              </span>
            </p>
          </div>
        </TabsContent>

        <TabsContent value="regulatory" className="animate-fade-in-up">
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            <span>Regulatory Requirements</span>
          </h4>
          {displayTopic.regulatoryRequirements.map((req, index) => (
            <RegulatoryItem
              key={index}
              name={req.name}
              relevance={req.relevance}
              description={req.description}
            />
          ))}
          <Button
            variant="outline"
            className="w-full mt-2 border-primary/20 text-primary hover:bg-primary/5 hover:translate-y-[-2px] transition-all duration-normal ease-out"
            size="sm"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View Regulatory Database
          </Button>
        </TabsContent>

        <TabsContent value="recommendations" className="animate-fade-in-up">
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-primary" />
            <span>Recommended Actions</span>
          </h4>
          {displayTopic.recommendations.map((rec, index) => (
            <Recommendation
              key={index}
              title={rec.title}
              description={rec.description}
              impact={rec.impact}
            />
          ))}
          <Button
            className="w-full mt-2 bg-gradient-to-r from-primary to-accent text-white border-none shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all duration-normal ease-out"
            size="sm"
          >
            Create Action Plan
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExplainabilityPanel;
