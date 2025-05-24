import React, { useState, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollAnimationWrapper } from "@/components/common/ScrollAnimationWrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Info,
  Download,
  Filter,
  Settings,
  HelpCircle,
  LineChart,
} from "lucide-react";

import MaterialityMatrix from "@/components/materiality/MaterialityMatrix";
import AssessmentWizard from "@/components/materiality/AssessmentWizard";
import ExplainabilityPanel from "@/components/materiality/ExplainabilityPanel";
import TopicActionPlan from "@/components/materiality/TopicActionPlan";

const MaterialityAssessment = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showWizard, setShowWizard] = useState(false);
  const [showActionPlan, setShowActionPlan] = useState(false);
  const [activeTab, setActiveTab] = useState("matrix");

  // Mock data for industry filters
  const industries = [
    "All Industries",
    "Technology",
    "Healthcare",
    "Financial Services",
    "Manufacturing",
    "Retail",
  ];

  // Mock data for framework filters
  const frameworks = ["All Frameworks", "GRI", "SASB", "TCFD", "ESRS"];

  const handleTopicSelect = (topic: any) => {
    setSelectedTopic(topic.id || topic);
  };

  const handleStartAssessment = () => {
    setShowWizard(true);
  };

  const handleCloseWizard = () => {
    setShowWizard(false);
  };

  const handleCreateActionPlan = () => {
    setShowActionPlan(true);
  };

  const handleCloseActionPlan = useCallback(() => {
    setShowActionPlan(false);
  }, []);

  return (
    <div className="space-y-xl animate-fade-in-up">
      {/* Header */}
      <ScrollAnimationWrapper effect="zoom-rotate" delay={100}>
        <div className="relative bg-gradient-to-br from-primary/90 to-accent/90 rounded-2xl p-lg mb-xl overflow-hidden text-white animate-hero-glow">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-[300px] h-[300px] bg-white/20 rounded-full top-[-100px] right-[-100px] filter blur-[40px] opacity-50 animate-orb-float"></div>
            <div className="absolute w-[200px] h-[200px] bg-accent/30 rounded-full bottom-[-50px] left-[10%] filter blur-[40px] opacity-50 animate-orb-float animation-delay-[-5s]"></div>
          </div>

          <div className="relative z-1 flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-extrabold mb-sm animate-fade-in-up">
                Materiality Assessment
              </h1>
              <p className="text-lg opacity-90 mb-lg animate-fade-in-up animation-delay-[0.1s] max-w-2xl">
                Identify and prioritize ESG topics that matter most to your
                business and stakeholders using our AI-powered assessment tools
              </p>
            </div>
            <div className="flex gap-sm animate-fade-in-up animation-delay-[0.2s]">
              <Button
                className="bg-white text-primary shadow-md hover:translate-y-[-2px] hover:shadow-lg transition-all duration-normal ease-out"
                onClick={handleStartAssessment}
              >
                <LineChart className="h-4 w-4 mr-2" />
                Start Assessment
              </Button>
              <Button
                variant="outline"
                className="bg-white/15 backdrop-blur-md text-white border border-white/20 hover:bg-white/25 hover:border-white/30"
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                Guide
              </Button>
            </div>
          </div>
        </div>
      </ScrollAnimationWrapper>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        {/* Left column - Matrix and controls */}
        <div className="lg:col-span-2 space-y-lg">
          <ScrollAnimationWrapper effect="fade-up" delay={200}>
            <Card className="border-2 border-[var(--border-secondary)] shadow-md overflow-hidden transition-all duration-normal ease-out hover:shadow-lg hover:border-primary/10">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent pb-md">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-sm">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 grid place-items-center text-primary">
                      <LineChart className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle>Materiality Matrix</CardTitle>
                      <CardDescription>
                        Visualize the importance of ESG topics based on business
                        impact and stakeholder interest
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:bg-primary/5"
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:bg-primary/5"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-md">
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="mb-4 bg-[var(--bg-secondary)]">
                    <TabsTrigger
                      value="matrix"
                      className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                    >
                      Matrix View
                    </TabsTrigger>
                    <TabsTrigger
                      value="list"
                      className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                    >
                      List View
                    </TabsTrigger>
                    <TabsTrigger
                      value="comparison"
                      className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                    >
                      Comparison
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent
                    value="matrix"
                    className="space-y-4 animate-fade-in-up"
                  >
                    <div className="h-[500px]">
                      <MaterialityMatrix onTopicSelect={handleTopicSelect} />
                    </div>
                  </TabsContent>

                  <TabsContent value="list" className="animate-fade-in-up">
                    <div className="text-center py-12 text-muted-foreground">
                      <Info className="h-12 w-12 mx-auto mb-4 text-primary/50" />
                      <h3 className="text-lg font-medium mb-2">
                        List View Coming Soon
                      </h3>
                      <p>
                        The list view of material topics will be available in
                        the next update.
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent
                    value="comparison"
                    className="animate-fade-in-up"
                  >
                    <div className="text-center py-12 text-muted-foreground">
                      <Info className="h-12 w-12 mx-auto mb-4 text-primary/50" />
                      <h3 className="text-lg font-medium mb-2">
                        Comparison View Coming Soon
                      </h3>
                      <p>
                        Industry comparison view will be available in the next
                        update.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </ScrollAnimationWrapper>

          {showActionPlan && (
            <ScrollAnimationWrapper effect="fade-up" delay={300}>
              <Card className="border-2 border-primary/10 shadow-md overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent pb-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Topic Action Plan</CardTitle>
                      <CardDescription>
                        Create and manage action plans for material ESG topics
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCloseActionPlan}
                      className="hover:bg-primary/5"
                    >
                      Close
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-md">
                  <TopicActionPlan topicId={selectedTopic || ""} />
                </CardContent>
              </Card>
            </ScrollAnimationWrapper>
          )}
        </div>

        {/* Right column - Explainability panel */}
        <div>
          <ScrollAnimationWrapper effect="fade-left" delay={300}>
            <Card className="border-2 border-[var(--border-secondary)] shadow-md overflow-hidden transition-all duration-normal ease-out hover:shadow-lg hover:border-primary/10">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent pb-md">
                <div className="flex items-center gap-sm">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 grid place-items-center text-primary">
                    <Info className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle>Topic Insights</CardTitle>
                    <CardDescription>
                      Understand why topics are material to your business
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-md">
                {selectedTopic ? (
                  <>
                    <div className="mb-4 animate-fade-in-up">
                      <h3 className="text-lg font-bold mb-2 gradient-text">
                        Climate Change
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge className="bg-gradient-to-r from-primary to-accent text-white border-none animate-badge-bounce">
                          High Materiality
                        </Badge>
                        <Badge
                          variant="outline"
                          className="border-primary/20 text-primary"
                        >
                          TCFD
                        </Badge>
                        <Badge
                          variant="outline"
                          className="border-primary/20 text-primary"
                        >
                          GRI 305
                        </Badge>
                      </div>
                      <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
                        This topic has high materiality based on your industry,
                        regulatory requirements, and stakeholder feedback.
                      </p>
                      <Button
                        className="bg-gradient-to-r from-primary to-accent text-white border-none shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all duration-normal ease-out"
                        size="sm"
                        onClick={handleCreateActionPlan}
                      >
                        Create Action Plan
                      </Button>
                    </div>

                    <Separator className="my-4" />

                    <ExplainabilityPanel topicId={selectedTopic} />
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-20 h-20 mx-auto mb-lg bg-[var(--bg-secondary)] rounded-full grid place-items-center text-3xl animate-empty-bounce">
                      <Info className="h-10 w-10 text-primary/50" />
                    </div>
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-sm">
                      No Topic Selected
                    </h3>
                    <p className="text-base text-[var(--text-secondary)] max-w-md mx-auto">
                      Click on a topic in the materiality matrix to see detailed
                      information and insights about its importance to your
                      business.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </ScrollAnimationWrapper>
        </div>
      </div>

      {/* Assessment Wizard Modal */}
      {showWizard && (
        <div className="fixed inset-0 bg-[var(--bg-overlay)] backdrop-blur-md flex items-center justify-center z-modal animate-fade-in-up">
          <div className="bg-[var(--bg-elevated)] rounded-xl w-full max-w-4xl max-h-[90vh] overflow-auto shadow-2xl border border-[var(--border-primary)]">
            <div className="p-lg">
              <div className="flex justify-between items-center mb-lg">
                <h2 className="text-2xl font-bold gradient-text">
                  Materiality Assessment Wizard
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCloseWizard}
                  className="rounded-full hover:bg-primary/10 hover:text-primary"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                  >
                    <path
                      d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </Button>
              </div>
              <AssessmentWizard onComplete={handleCloseWizard} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaterialityAssessment;
