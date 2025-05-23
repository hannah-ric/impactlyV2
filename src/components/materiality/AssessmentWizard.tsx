import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  Check,
  Info,
  HelpCircle,
  Building2,
  LineChart,
  Users,
  FileText,
  ClipboardCheck,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface AssessmentWizardProps {
  onComplete?: (data: AssessmentData) => void;
  initialData?: AssessmentData;
  industryType?: string;
}

interface AssessmentData {
  companyProfile: {
    industry: string;
    size: string;
    region: string;
    maturityLevel: string;
  };
  materialTopics: Record<
    string,
    {
      impact: number;
      financialMateriality: number;
      notes: string;
    }
  >;
  stakeholderFeedback: string;
  regulatoryConsiderations: string[];
}

const defaultAssessmentData: AssessmentData = {
  companyProfile: {
    industry: "Technology",
    size: "Medium",
    region: "North America",
    maturityLevel: "Intermediate",
  },
  materialTopics: {
    "Climate Change": { impact: 4, financialMateriality: 5, notes: "" },
    "Data Privacy": { impact: 5, financialMateriality: 4, notes: "" },
    "Diversity & Inclusion": { impact: 3, financialMateriality: 3, notes: "" },
    "Energy Management": { impact: 3, financialMateriality: 4, notes: "" },
    "Talent Management": { impact: 4, financialMateriality: 3, notes: "" },
  },
  stakeholderFeedback: "",
  regulatoryConsiderations: ["GDPR", "CCPA"],
};

const steps = [
  {
    id: "company-profile",
    title: "Company Profile",
    icon: <Building2 className="h-5 w-5" />,
  },
  {
    id: "material-topics",
    title: "Material Topics",
    icon: <LineChart className="h-5 w-5" />,
  },
  {
    id: "stakeholder-feedback",
    title: "Stakeholder Feedback",
    icon: <Users className="h-5 w-5" />,
  },
  {
    id: "regulatory-considerations",
    title: "Regulatory Considerations",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    id: "review",
    title: "Review & Submit",
    icon: <ClipboardCheck className="h-5 w-5" />,
  },
];

const industries = [
  "Technology",
  "Finance",
  "Healthcare",
  "Manufacturing",
  "Retail",
  "Energy",
];
const companySizes = ["Small", "Medium", "Large", "Enterprise"];
const regions = [
  "North America",
  "Europe",
  "Asia Pacific",
  "Latin America",
  "Middle East & Africa",
];
const maturityLevels = ["Beginner", "Intermediate", "Advanced"];

const regulations = [
  {
    id: "GDPR",
    name: "GDPR",
    description: "General Data Protection Regulation",
  },
  { id: "CCPA", name: "CCPA", description: "California Consumer Privacy Act" },
  {
    id: "SFDR",
    name: "SFDR",
    description: "Sustainable Finance Disclosure Regulation",
  },
  {
    id: "CSRD",
    name: "CSRD",
    description: "Corporate Sustainability Reporting Directive",
  },
  {
    id: "TCFD",
    name: "TCFD",
    description: "Task Force on Climate-related Financial Disclosures",
  },
];

const AssessmentWizard: React.FC<AssessmentWizardProps> = ({
  onComplete = () => {},
  initialData = defaultAssessmentData,
  industryType = "Technology",
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [assessmentData, setAssessmentData] =
    useState<AssessmentData>(initialData);
  const [activeTopicTab, setActiveTopicTab] = useState<string>(
    Object.keys(initialData.materialTopics)[0] || "",
  );

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(assessmentData);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateCompanyProfile = (
    field: keyof AssessmentData["companyProfile"],
    value: string,
  ) => {
    setAssessmentData({
      ...assessmentData,
      companyProfile: {
        ...assessmentData.companyProfile,
        [field]: value,
      },
    });
  };

  const updateMaterialTopic = (
    topic: string,
    field: keyof AssessmentData["materialTopics"][string],
    value: any,
  ) => {
    setAssessmentData({
      ...assessmentData,
      materialTopics: {
        ...assessmentData.materialTopics,
        [topic]: {
          ...assessmentData.materialTopics[topic],
          [field]: value,
        },
      },
    });
  };

  const toggleRegulation = (regulationId: string) => {
    const currentRegs = [...assessmentData.regulatoryConsiderations];
    const index = currentRegs.indexOf(regulationId);

    if (index > -1) {
      currentRegs.splice(index, 1);
    } else {
      currentRegs.push(regulationId);
    }

    setAssessmentData({
      ...assessmentData,
      regulatoryConsiderations: currentRegs,
    });
  };

  const renderStepContent = () => {
    switch (steps[currentStep].id) {
      case "company-profile":
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label
                  htmlFor="industry"
                  className="text-base font-medium mb-sm block"
                >
                  Industry
                </Label>
                <div className="grid grid-cols-2 gap-sm mt-sm">
                  {industries.map((industry) => (
                    <Button
                      key={industry}
                      type="button"
                      variant={
                        assessmentData.companyProfile.industry === industry
                          ? "default"
                          : "outline"
                      }
                      className={`justify-start transition-all duration-normal ease-out ${assessmentData.companyProfile.industry === industry ? "bg-primary text-white shadow-sm hover:shadow-md hover:translate-y-[-2px]" : "hover:bg-primary/5 hover:text-primary hover:border-primary/20"}`}
                      onClick={() => updateCompanyProfile("industry", industry)}
                    >
                      {industry}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label
                  htmlFor="size"
                  className="text-base font-medium mb-sm block"
                >
                  Company Size
                </Label>
                <div className="grid grid-cols-2 gap-sm mt-sm">
                  {companySizes.map((size) => (
                    <Button
                      key={size}
                      type="button"
                      variant={
                        assessmentData.companyProfile.size === size
                          ? "default"
                          : "outline"
                      }
                      className={`justify-start transition-all duration-normal ease-out ${assessmentData.companyProfile.size === size ? "bg-primary text-white shadow-sm hover:shadow-md hover:translate-y-[-2px]" : "hover:bg-primary/5 hover:text-primary hover:border-primary/20"}`}
                      onClick={() => updateCompanyProfile("size", size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label
                  htmlFor="region"
                  className="text-base font-medium mb-sm block"
                >
                  Primary Region
                </Label>
                <div className="grid grid-cols-2 gap-sm mt-sm">
                  {regions.map((region) => (
                    <Button
                      key={region}
                      type="button"
                      variant={
                        assessmentData.companyProfile.region === region
                          ? "default"
                          : "outline"
                      }
                      className={`justify-start transition-all duration-normal ease-out ${assessmentData.companyProfile.region === region ? "bg-primary text-white shadow-sm hover:shadow-md hover:translate-y-[-2px]" : "hover:bg-primary/5 hover:text-primary hover:border-primary/20"}`}
                      onClick={() => updateCompanyProfile("region", region)}
                    >
                      {region}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label
                  htmlFor="maturity"
                  className="text-base font-medium mb-sm block"
                >
                  ESG Maturity Level
                </Label>
                <div className="grid grid-cols-3 gap-sm mt-sm">
                  {maturityLevels.map((level) => (
                    <Button
                      key={level}
                      type="button"
                      variant={
                        assessmentData.companyProfile.maturityLevel === level
                          ? "default"
                          : "outline"
                      }
                      className={`justify-start transition-all duration-normal ease-out ${assessmentData.companyProfile.maturityLevel === level ? "bg-primary text-white shadow-sm hover:shadow-md hover:translate-y-[-2px]" : "hover:bg-primary/5 hover:text-primary hover:border-primary/20"}`}
                      onClick={() =>
                        updateCompanyProfile("maturityLevel", level)
                      }
                    >
                      {level}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-md rounded-lg bg-primary/5 border border-primary/10 shadow-sm">
              <div className="flex items-start gap-sm">
                <div className="w-8 h-8 rounded-full bg-primary/10 grid place-items-center text-primary flex-shrink-0">
                  <Info className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-xs">
                    AI-Suggested Profile
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    Based on your company data, we've pre-selected the most
                    likely profile. You can adjust if needed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case "material-topics":
        return (
          <div className="space-y-6">
            <Tabs value={activeTopicTab} onValueChange={setActiveTopicTab}>
              <TabsList className="w-full grid grid-cols-3 mb-md bg-[var(--bg-secondary)]">
                {Object.keys(assessmentData.materialTopics).map((topic) => (
                  <TabsTrigger
                    key={topic}
                    value={topic}
                    className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all duration-normal ease-out"
                  >
                    {topic}
                  </TabsTrigger>
                ))}
              </TabsList>

              {Object.keys(assessmentData.materialTopics).map((topic) => (
                <TabsContent key={topic} value={topic} className="space-y-4">
                  <div className="flex items-center justify-between mb-md">
                    <div className="flex items-center gap-sm">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 grid place-items-center text-primary">
                        <LineChart className="h-5 w-5" />
                      </div>
                      <h3 className="text-lg font-bold gradient-text">
                        {topic}
                      </h3>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full border-primary/20 text-primary hover:bg-primary/5 hover:text-primary"
                          >
                            <HelpCircle className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="bg-[var(--bg-elevated)] border-[var(--border-primary)] shadow-md">
                          <p>
                            Rate the impact and financial materiality of this
                            topic for your organization
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-base font-medium mb-sm block">
                        Impact on Environment & Society (1-5)
                      </Label>
                      <RadioGroup
                        className="flex space-x-md mt-sm"
                        value={assessmentData.materialTopics[
                          topic
                        ].impact.toString()}
                        onValueChange={(value) =>
                          updateMaterialTopic(topic, "impact", parseInt(value))
                        }
                      >
                        {[1, 2, 3, 4, 5].map((value) => (
                          <div
                            key={value}
                            className="flex flex-col items-center transition-all duration-normal ease-out hover:transform hover:scale-110"
                          >
                            <RadioGroupItem
                              value={value.toString()}
                              id={`impact-${topic}-${value}`}
                              className="border-primary text-primary"
                            />
                            <Label
                              htmlFor={`impact-${topic}-${value}`}
                              className="mt-1 font-medium"
                            >
                              {value}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <div>
                      <Label className="text-base font-medium mb-sm block">
                        Financial Materiality (1-5)
                      </Label>
                      <RadioGroup
                        className="flex space-x-md mt-sm"
                        value={assessmentData.materialTopics[
                          topic
                        ].financialMateriality.toString()}
                        onValueChange={(value) =>
                          updateMaterialTopic(
                            topic,
                            "financialMateriality",
                            parseInt(value),
                          )
                        }
                      >
                        {[1, 2, 3, 4, 5].map((value) => (
                          <div
                            key={value}
                            className="flex flex-col items-center transition-all duration-normal ease-out hover:transform hover:scale-110"
                          >
                            <RadioGroupItem
                              value={value.toString()}
                              id={`financial-${topic}-${value}`}
                              className="border-primary text-primary"
                            />
                            <Label
                              htmlFor={`financial-${topic}-${value}`}
                              className="mt-1 font-medium"
                            >
                              {value}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <div>
                      <Label
                        htmlFor={`notes-${topic}`}
                        className="text-base font-medium mb-sm block"
                      >
                        Notes
                      </Label>
                      <Textarea
                        id={`notes-${topic}`}
                        placeholder="Add any specific notes about this topic..."
                        value={assessmentData.materialTopics[topic].notes}
                        onChange={(e) =>
                          updateMaterialTopic(topic, "notes", e.target.value)
                        }
                        className="mt-sm border-[var(--border-secondary)] focus:border-primary/30 focus:ring-primary/20 transition-all duration-normal ease-out"
                      />
                    </div>
                  </div>

                  <div className="p-md rounded-lg bg-primary/5 border border-primary/10 shadow-sm">
                    <div className="flex items-start gap-sm">
                      <div className="w-8 h-8 rounded-full bg-primary/10 grid place-items-center text-primary flex-shrink-0">
                        <Info className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-primary mb-xs">
                          AI Insight
                        </h4>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                          {topic === "Climate Change" &&
                            "Companies in your industry typically rate Climate Change as highly material (4-5) due to increasing regulatory pressure and investor focus."}
                          {topic === "Data Privacy" &&
                            "For technology companies, Data Privacy is often rated as critical (5) due to regulatory requirements and customer trust implications."}
                          {topic === "Diversity & Inclusion" &&
                            "Medium-sized companies in North America are increasingly focusing on Diversity & Inclusion as stakeholder expectations rise."}
                          {topic === "Energy Management" &&
                            "Energy Management is becoming more financially material as energy costs rise and efficiency regulations increase."}
                          {topic === "Talent Management" &&
                            "Talent Management is particularly material for knowledge-based industries where human capital is a primary asset."}
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        );

      case "stakeholder-feedback":
        return (
          <div className="space-y-6">
            <div>
              <Label
                htmlFor="stakeholder-feedback"
                className="text-base font-medium mb-sm block"
              >
                Stakeholder Feedback
              </Label>
              <Textarea
                id="stakeholder-feedback"
                placeholder="Enter any feedback from stakeholders that should be considered in your materiality assessment..."
                value={assessmentData.stakeholderFeedback}
                onChange={(e) =>
                  setAssessmentData({
                    ...assessmentData,
                    stakeholderFeedback: e.target.value,
                  })
                }
                className="mt-sm min-h-[200px] border-[var(--border-secondary)] focus:border-primary/30 focus:ring-primary/20 transition-all duration-normal ease-out"
              />
            </div>

            <div className="p-md rounded-lg bg-primary/5 border border-primary/10 shadow-sm">
              <div className="flex items-start gap-sm">
                <div className="w-8 h-8 rounded-full bg-primary/10 grid place-items-center text-primary flex-shrink-0">
                  <Info className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-xs">
                    Stakeholder Engagement Tips
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    Consider feedback from key stakeholder groups: employees,
                    customers, investors, suppliers, regulators, and community
                    members. Include both positive and negative feedback to get
                    a balanced view.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case "regulatory-considerations":
        return (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-sm mb-sm">
                <div className="w-8 h-8 rounded-lg bg-primary/10 grid place-items-center text-primary">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <Label className="text-lg font-bold gradient-text block">
                    Select Applicable Regulations
                  </Label>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Choose the regulations that apply to your organization
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-sm mt-md">
                {regulations.map((regulation) => (
                  <div
                    key={regulation.id}
                    className={`p-md rounded-lg border cursor-pointer transition-all duration-normal ease-out hover:shadow-sm ${assessmentData.regulatoryConsiderations.includes(regulation.id) ? "border-primary bg-primary/5 shadow-sm" : "border-[var(--border-secondary)] hover:border-primary/20"}`}
                    onClick={() => toggleRegulation(regulation.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold">{regulation.name}</h4>
                        <p className="text-sm text-[var(--text-secondary)]">
                          {regulation.description}
                        </p>
                      </div>
                      {assessmentData.regulatoryConsiderations.includes(
                        regulation.id,
                      ) && (
                        <Check className="h-5 w-5 text-primary animate-fade-in-up" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-md rounded-lg bg-primary/5 border border-primary/10 shadow-sm mt-lg">
              <div className="flex items-start gap-sm">
                <div className="w-8 h-8 rounded-full bg-primary/10 grid place-items-center text-primary flex-shrink-0">
                  <Info className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-xs">
                    AI-Suggested Regulations
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    Based on your industry and region, we've highlighted
                    regulations that likely apply to your organization. Review
                    and adjust as needed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case "review":
        return (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-sm mb-lg">
                <div className="w-8 h-8 rounded-lg bg-primary/10 grid place-items-center text-primary">
                  <ClipboardCheck className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold gradient-text">
                  Assessment Summary
                </h3>
              </div>

              <div className="space-y-md">
                <Card className="border-[var(--border-secondary)] shadow-sm overflow-hidden transition-all duration-normal ease-out hover:shadow-md hover:border-primary/10">
                  <CardHeader className="pb-sm bg-gradient-to-r from-primary/5 to-transparent">
                    <div className="flex items-center gap-sm">
                      <div className="w-6 h-6 rounded-md bg-primary/10 grid place-items-center text-primary">
                        <Building2 className="h-4 w-4" />
                      </div>
                      <CardTitle className="text-base font-bold">
                        Company Profile
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-md">
                    <dl className="grid grid-cols-2 gap-sm text-sm">
                      <div className="p-sm rounded-md bg-[var(--bg-secondary)] transition-all duration-normal ease-out hover:translate-y-[-2px] hover:shadow-sm">
                        <dt className="text-[var(--text-tertiary)] mb-xs">
                          Industry
                        </dt>
                        <dd className="font-medium">
                          {assessmentData.companyProfile.industry}
                        </dd>
                      </div>
                      <div className="p-sm rounded-md bg-[var(--bg-secondary)] transition-all duration-normal ease-out hover:translate-y-[-2px] hover:shadow-sm">
                        <dt className="text-[var(--text-tertiary)] mb-xs">
                          Size
                        </dt>
                        <dd className="font-medium">
                          {assessmentData.companyProfile.size}
                        </dd>
                      </div>
                      <div className="p-sm rounded-md bg-[var(--bg-secondary)] transition-all duration-normal ease-out hover:translate-y-[-2px] hover:shadow-sm">
                        <dt className="text-[var(--text-tertiary)] mb-xs">
                          Region
                        </dt>
                        <dd className="font-medium">
                          {assessmentData.companyProfile.region}
                        </dd>
                      </div>
                      <div className="p-sm rounded-md bg-[var(--bg-secondary)] transition-all duration-normal ease-out hover:translate-y-[-2px] hover:shadow-sm">
                        <dt className="text-[var(--text-tertiary)] mb-xs">
                          ESG Maturity
                        </dt>
                        <dd className="font-medium">
                          {assessmentData.companyProfile.maturityLevel}
                        </dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>

                <Card className="border-[var(--border-secondary)] shadow-sm overflow-hidden transition-all duration-normal ease-out hover:shadow-md hover:border-primary/10">
                  <CardHeader className="pb-sm bg-gradient-to-r from-primary/5 to-transparent">
                    <div className="flex items-center gap-sm">
                      <div className="w-6 h-6 rounded-md bg-primary/10 grid place-items-center text-primary">
                        <LineChart className="h-4 w-4" />
                      </div>
                      <CardTitle className="text-base font-bold">
                        Material Topics
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-md">
                    <div className="space-y-sm">
                      {Object.entries(assessmentData.materialTopics).map(
                        ([topic, data]) => (
                          <div
                            key={topic}
                            className="flex items-center justify-between p-sm rounded-md bg-[var(--bg-secondary)] transition-all duration-normal ease-out hover:translate-y-[-2px] hover:shadow-sm"
                          >
                            <span className="font-medium">{topic}</span>
                            <div className="flex items-center gap-sm">
                              <Badge
                                variant="outline"
                                className="border-primary/20 text-primary"
                              >
                                Impact: {data.impact}/5
                              </Badge>
                              <Badge
                                variant="outline"
                                className="border-primary/20 text-primary"
                              >
                                Financial: {data.financialMateriality}/5
                              </Badge>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-[var(--border-secondary)] shadow-sm overflow-hidden transition-all duration-normal ease-out hover:shadow-md hover:border-primary/10">
                  <CardHeader className="pb-sm bg-gradient-to-r from-primary/5 to-transparent">
                    <div className="flex items-center gap-sm">
                      <div className="w-6 h-6 rounded-md bg-primary/10 grid place-items-center text-primary">
                        <FileText className="h-4 w-4" />
                      </div>
                      <CardTitle className="text-base font-bold">
                        Regulatory Considerations
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-md">
                    <div className="flex flex-wrap gap-sm p-sm rounded-md bg-[var(--bg-secondary)]">
                      {assessmentData.regulatoryConsiderations.length > 0 ? (
                        assessmentData.regulatoryConsiderations.map((reg) => (
                          <Badge
                            key={reg}
                            className="bg-gradient-to-r from-primary to-accent text-white border-none animate-badge-bounce"
                          >
                            {reg}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-[var(--text-tertiary)] italic">
                          No regulations selected
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="p-md rounded-lg bg-primary/5 border border-primary/10 shadow-sm mt-lg">
              <div className="flex items-start gap-sm">
                <div className="w-8 h-8 rounded-full bg-primary/10 grid place-items-center text-primary flex-shrink-0">
                  <Info className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-xs">Next Steps</h4>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    After submitting your assessment, you'll receive a detailed
                    materiality matrix and recommended action plans for your
                    most material topics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="w-full bg-[var(--bg-elevated)] border-2 border-[var(--border-secondary)] shadow-md overflow-hidden transition-all duration-normal ease-out hover:shadow-lg hover:border-primary/10">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent pb-md">
        <div className="flex items-center gap-sm mb-sm">
          <div className="w-8 h-8 rounded-lg bg-primary/10 grid place-items-center text-primary">
            <LineChart className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold gradient-text">
              Materiality Assessment Wizard
            </CardTitle>
            <CardDescription className="text-[var(--text-secondary)]">
              Complete this step-by-step assessment to identify your
              organization's most material ESG topics
            </CardDescription>
          </div>
        </div>
        <Progress
          value={progress}
          className="h-2 overflow-hidden bg-[var(--bg-secondary)]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer"></div>
      </CardHeader>

      <CardContent className="p-lg">
        <div className="mb-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-sm">
              <div className="w-10 h-10 rounded-full bg-primary/10 grid place-items-center text-primary">
                {steps[currentStep].icon}
              </div>
              <h2 className="text-xl font-bold gradient-text">
                {steps[currentStep].title}
              </h2>
            </div>
            <div className="text-sm font-medium px-sm py-xs rounded-full bg-[var(--bg-secondary)] text-[var(--text-secondary)]">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>
        </div>

        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="animate-fade-in-up"
        >
          {renderStepContent()}
        </motion.div>
      </CardContent>

      <CardFooter className="flex justify-between p-lg border-t border-[var(--border-secondary)] bg-[var(--bg-secondary)]">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className={`border-primary/20 text-primary hover:bg-primary/5 hover:translate-y-[-2px] transition-all duration-normal ease-out ${currentStep === 0 ? "opacity-50" : ""}`}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>

        <Button
          onClick={handleNext}
          className="bg-gradient-to-r from-primary to-accent text-white border-none shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all duration-normal ease-out"
        >
          {currentStep === steps.length - 1 ? (
            "Complete Assessment"
          ) : (
            <>
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AssessmentWizard;
