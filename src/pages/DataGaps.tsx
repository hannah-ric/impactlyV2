import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollAnimationWrapper } from "@/components/common/ScrollAnimationWrapper";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Download,
  FileText,
  Filter,
  HelpCircle,
  Info,
  Plus,
  Search,
  Settings,
  Upload,
  Sparkles,
} from "lucide-react";

interface DataGap {
  id: string;
  category: string;
  topic: string;
  description: string;
  impact: "high" | "medium" | "low";
  status: "identified" | "in-progress" | "resolved";
  completeness: number;
  source?: string;
  suggestedAction?: string;
}

const mockDataGaps: DataGap[] = [
  {
    id: "gap-1",
    category: "Environmental",
    topic: "Carbon Emissions",
    description: "Missing Scope 3 emissions data from supply chain",
    impact: "high",
    status: "identified",
    completeness: 0,
    suggestedAction: "Conduct supplier survey to collect emissions data",
  },
  {
    id: "gap-2",
    category: "Social",
    topic: "Diversity & Inclusion",
    description: "Incomplete demographic data for workforce diversity analysis",
    impact: "medium",
    status: "in-progress",
    completeness: 45,
    source: "HR System",
    suggestedAction:
      "Update HR system to collect additional demographic information",
  },
  {
    id: "gap-3",
    category: "Governance",
    topic: "Board Governance",
    description: "Missing board skills matrix and diversity information",
    impact: "medium",
    status: "in-progress",
    completeness: 60,
    source: "Board Records",
    suggestedAction: "Create board skills matrix template and collect data",
  },
  {
    id: "gap-4",
    category: "Environmental",
    topic: "Water Management",
    description: "Incomplete water usage data from manufacturing facilities",
    impact: "high",
    status: "identified",
    completeness: 0,
    suggestedAction: "Install water meters and implement tracking system",
  },
  {
    id: "gap-5",
    category: "Social",
    topic: "Employee Health",
    description: "Missing workplace safety incident data for 2022",
    impact: "high",
    status: "resolved",
    completeness: 100,
    source: "Safety Management System",
  },
  {
    id: "gap-6",
    category: "Governance",
    topic: "Data Privacy",
    description: "Incomplete data privacy impact assessments",
    impact: "high",
    status: "in-progress",
    completeness: 30,
    source: "Compliance System",
    suggestedAction:
      "Complete privacy impact assessments for all data processes",
  },
];

const DataGaps = () => {
  const [activeTab, setActiveTab] = useState("identified");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedImpact, setSelectedImpact] = useState<string | null>(null);
  const [expandedGap, setExpandedGap] = useState<string | null>(null);
  const [dataGaps, setDataGaps] = useState<DataGap[]>(mockDataGaps);

  // Filter data gaps based on search query, category, impact, and status
  const filteredGaps = dataGaps.filter((gap) => {
    const matchesSearch =
      searchQuery === "" ||
      gap.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gap.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === null || gap.category === selectedCategory;

    const matchesImpact =
      selectedImpact === null || gap.impact === selectedImpact;

    const matchesStatus =
      activeTab === "all" ||
      (activeTab === "identified" && gap.status === "identified") ||
      (activeTab === "in-progress" && gap.status === "in-progress") ||
      (activeTab === "resolved" && gap.status === "resolved");

    return matchesSearch && matchesCategory && matchesImpact && matchesStatus;
  });

  // Get unique categories for filtering
  const categories = Array.from(new Set(dataGaps.map((gap) => gap.category)));

  // Get counts for each status
  const identifiedCount = dataGaps.filter(
    (gap) => gap.status === "identified",
  ).length;
  const inProgressCount = dataGaps.filter(
    (gap) => gap.status === "in-progress",
  ).length;
  const resolvedCount = dataGaps.filter(
    (gap) => gap.status === "resolved",
  ).length;

  // Calculate overall data completeness
  const overallCompleteness =
    dataGaps.reduce((sum, gap) => sum + gap.completeness, 0) / dataGaps.length;

  const handleToggleExpand = (gapId: string) => {
    if (expandedGap === gapId) {
      setExpandedGap(null);
    } else {
      setExpandedGap(gapId);
    }
  };

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "high":
        return <Badge className="bg-red-500">High</Badge>;
      case "medium":
        return <Badge className="bg-yellow-500">Medium</Badge>;
      default:
        return <Badge className="bg-gray-500">Low</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "resolved":
        return <Badge className="bg-green-500">Resolved</Badge>;
      case "in-progress":
        return <Badge className="bg-blue-500">In Progress</Badge>;
      default:
        return <Badge variant="outline">Identified</Badge>;
    }
  };

  return (
    <div className="p-6 bg-background">
      <ScrollAnimationWrapper>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Data Gap Intelligence</h1>
            <p className="text-muted-foreground mt-1">
              Identify, analyze, and address missing ESG data
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="default" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Data Gap
            </Button>
          </div>
        </div>
      </ScrollAnimationWrapper>

      <ScrollAnimationWrapper effect="fade-up" delay={200}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Data Completeness
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">
                {Math.round(overallCompleteness)}%
              </div>
              <Progress value={overallCompleteness} className="h-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Identified Gaps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
                <span className="text-2xl font-bold">{identifiedCount}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Info className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-2xl font-bold">{inProgressCount}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-2xl font-bold">{resolvedCount}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollAnimationWrapper>

      <ScrollAnimationWrapper effect="fade-up" delay={300}>
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle>Data Gaps</CardTitle>
              <div className="flex flex-col md:flex-row gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search data gaps..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    className="border rounded-md px-3 py-2 text-sm"
                    value={selectedCategory || ""}
                    onChange={(e) =>
                      setSelectedCategory(
                        e.target.value === "" ? null : e.target.value,
                      )
                    }
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <select
                    className="border rounded-md px-3 py-2 text-sm"
                    value={selectedImpact || ""}
                    onChange={(e) =>
                      setSelectedImpact(
                        e.target.value === "" ? null : e.target.value,
                      )
                    }
                  >
                    <option value="">All Impacts</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="identified">
                  Identified ({identifiedCount})
                </TabsTrigger>
                <TabsTrigger value="in-progress">
                  In Progress ({inProgressCount})
                </TabsTrigger>
                <TabsTrigger value="resolved">
                  Resolved ({resolvedCount})
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Topic</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Impact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Completeness</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGaps.length > 0 ? (
                  filteredGaps.map((gap) => (
                    <React.Fragment key={gap.id}>
                      <TableRow>
                        <TableCell>
                          <div>
                            <div className="font-medium">{gap.topic}</div>
                            <div className="text-sm text-muted-foreground">
                              {gap.category}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-md">
                            <div className="line-clamp-2">
                              {gap.description}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getImpactBadge(gap.impact)}</TableCell>
                        <TableCell>{getStatusBadge(gap.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress
                              value={gap.completeness}
                              className="h-2 w-24"
                            />
                            <span className="text-sm">{gap.completeness}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleToggleExpand(gap.id)}
                            >
                              {expandedGap === gap.id ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </Button>
                            <Button variant="ghost" size="icon">
                              <ArrowRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      {expandedGap === gap.id && (
                        <TableRow>
                          <TableCell colSpan={6} className="bg-muted/30">
                            <div className="p-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-medium mb-2">Details</h4>
                                  <div className="space-y-2">
                                    <div>
                                      <span className="text-sm font-medium">
                                        Source:
                                      </span>
                                      <span className="text-sm ml-2">
                                        {gap.source || "Not specified"}
                                      </span>
                                    </div>
                                    <div>
                                      <span className="text-sm font-medium">
                                        Description:
                                      </span>
                                      <p className="text-sm mt-1">
                                        {gap.description}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-2">
                                    Suggested Action
                                  </h4>
                                  <p className="text-sm">
                                    {gap.suggestedAction ||
                                      "No action suggested yet"}
                                  </p>
                                  <div className="mt-4 flex gap-2">
                                    <Button variant="outline" size="sm">
                                      <Upload className="h-4 w-4 mr-2" />
                                      Upload Data
                                    </Button>
                                    <Button variant="default" size="sm">
                                      <FileText className="h-4 w-4 mr-2" />
                                      Create Collection Form
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <HelpCircle className="h-8 w-8 mb-2" />
                        <p>No data gaps found matching your filters</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </ScrollAnimationWrapper>

      <ScrollAnimationWrapper effect="fade-up" delay={400}>
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Gap Prediction</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-6">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="bg-primary/10 p-4 rounded-xl flex items-center justify-center">
                    <div className="relative w-24 h-24 flex items-center justify-center">
                      <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse"></div>
                      <Info className="h-12 w-12 text-primary relative z-10" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <h3 className="text-xl font-semibold">
                      AI-Powered Gap Analysis
                    </h3>
                    <p className="text-muted-foreground">
                      Our AI system can analyze your ESG data to identify gaps,
                      predict missing values, and suggest data collection
                      strategies.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">
                          Identify missing data points
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">
                          Predict values based on industry benchmarks
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">
                          Generate guided collection workflows
                        </span>
                      </div>
                    </div>
                    <Button className="bg-gradient-to-r from-primary to-accent text-white">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Enable AI Prediction
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollAnimationWrapper>
    </div>
  );
};

export default DataGaps;
