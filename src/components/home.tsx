import React from "react";
import { Link } from "react-router-dom";
import { HeroSection } from "@/components/ui/hero-section";
import { StatCard } from "@/components/ui/stat-card";
import { AiInsight } from "@/components/ui/ai-insight";
import { ActivityItem } from "@/components/ui/activity-item";
import { TaskCard } from "@/components/ui/task-card";
import { ScrollAnimationWrapper } from "@/components/common/ScrollAnimationWrapper";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BarChart3,
  Bolt,
  Calendar,
  CheckCircle,
  ClipboardList,
  Clock,
  LineChart,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";

function Home() {
  return (
    <div className="space-y-xl animate-fade-in-up">
      {/* Hero Section */}
      <HeroSection
        title="Welcome to your ESG Dashboard"
        subtitle="Track, manage, and improve your environmental, social, and governance initiatives all in one place."
        emoji="🌱"
        primaryAction={{
          label: "Start Assessment",
          onClick: () => console.log("Start assessment clicked"),
        }}
        secondaryAction={{
          label: "View Tutorial",
          onClick: () => console.log("View tutorial clicked"),
        }}
      />

      {/* Stats Grid */}
      <ScrollAnimationWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
          <StatCard
            label="Materiality Assessment"
            value="60%"
            icon={<LineChart className="h-5 w-5" />}
            progress={60}
          />

          <StatCard
            label="Implementation Progress"
            value="42%"
            icon={<ClipboardList className="h-5 w-5" />}
            progress={42}
            variant="warning"
          />

          <StatCard
            label="Data Completeness"
            value="28%"
            icon={<BarChart3 className="h-5 w-5" />}
            progress={28}
            variant="danger"
          />
        </div>
      </ScrollAnimationWrapper>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        {/* AI Insights */}
        <div className="lg:col-span-2">
          <ScrollAnimationWrapper>
            <Card className="border-2 border-primary/10 shadow-md overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent pb-md">
                <div className="flex items-center gap-sm">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 grid place-items-center text-primary">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <CardTitle>AI-Powered Insights</CardTitle>
                </div>
                <CardDescription>
                  Intelligent recommendations based on your ESG data
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-md space-y-md">
                <AiInsight
                  title="Complete Your Materiality Assessment"
                  description="Identify which ESG topics are most material to your business to focus your sustainability efforts effectively."
                  icon={<Target className="h-5 w-5" />}
                />

                <AiInsight
                  title="Address Data Gaps in Carbon Emissions"
                  description="Your Scope 3 emissions data is incomplete. Adding this information could improve your ESG score by up to 15%."
                  icon={<Zap className="h-5 w-5" />}
                />

                <AiInsight
                  title="Upcoming Regulatory Deadline"
                  description="CSRD reporting deadline is approaching in 45 days. Start preparing your documentation now."
                  icon={<Clock className="h-5 w-5" />}
                />

                <div className="text-center pt-sm">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-primary border-primary/20 hover:bg-primary/5"
                  >
                    View All Insights
                  </Button>
                </div>
              </CardContent>
            </Card>
          </ScrollAnimationWrapper>
        </div>

        {/* Recent Activity */}
        <div>
          <ScrollAnimationWrapper>
            <Card className="h-full border-2 border-neutral-200 shadow-md">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest updates across your ESG initiatives
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-xs">
                  <ActivityItem
                    title="Materiality assessment started"
                    time="Today at 10:23 AM"
                    icon={<LineChart className="h-5 w-5" />}
                    variant="info"
                  />

                  <ActivityItem
                    title="Carbon data updated"
                    time="Yesterday at 4:12 PM"
                    icon={<CheckCircle className="h-5 w-5" />}
                    variant="success"
                  />

                  <ActivityItem
                    title="Implementation plan due soon"
                    time="In 3 days"
                    icon={<Calendar className="h-5 w-5" />}
                    variant="warning"
                  />

                  <ActivityItem
                    title="Data gap identified"
                    time="Last week"
                    icon={<Bolt className="h-5 w-5" />}
                    variant="danger"
                  />
                </div>
              </CardContent>
            </Card>
          </ScrollAnimationWrapper>
        </div>
      </div>

      {/* Getting Started Card */}
      <ScrollAnimationWrapper>
        <Card className="border-2 border-neutral-200 shadow-md">
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>
              Follow these steps to set up your ESG management system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-lg">
              <div className="flex items-start gap-md">
                <div className="w-10 h-10 rounded-full bg-primary text-white grid place-items-center font-bold text-lg shadow-glow">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-display font-bold mb-xs">
                    Complete Materiality Assessment
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] mb-sm">
                    Identify which ESG topics are most material to your business
                  </p>
                  <Button className="group" asChild>
                    <Link to="/materiality">
                      Start Assessment
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-fast group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="flex items-start gap-md">
                <div className="w-10 h-10 rounded-full bg-neutral-200 text-neutral-600 grid place-items-center font-bold text-lg">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-display font-bold mb-xs">
                    Create Implementation Plan
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] mb-sm">
                    Develop action plans for your material ESG topics
                  </p>
                  <Button variant="outline" disabled>
                    Create Plan
                  </Button>
                </div>
              </div>

              <div className="flex items-start gap-md">
                <div className="w-10 h-10 rounded-full bg-neutral-200 text-neutral-600 grid place-items-center font-bold text-lg">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-display font-bold mb-xs">
                    Identify Data Gaps
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] mb-sm">
                    Find and address missing ESG data in your organization
                  </p>
                  <Button variant="outline" disabled>
                    Analyze Gaps
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </ScrollAnimationWrapper>

      {/* Upcoming Tasks */}
      <ScrollAnimationWrapper>
        <div>
          <div className="flex items-center justify-between mb-md">
            <h2 className="text-2xl font-display font-bold">Upcoming Tasks</h2>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            <TaskCard
              title="Complete Carbon Emissions Data"
              description="Fill in the missing Scope 3 emissions data for your organization."
              dueDate="Next week"
              priority="high"
              status="not-started"
              onAction={() => console.log("Task action clicked")}
            />

            <TaskCard
              title="Review Materiality Assessment"
              description="Validate the results of your initial materiality assessment."
              dueDate="This month"
              priority="medium"
              status="in-progress"
              onAction={() => console.log("Task action clicked")}
            />
          </div>
        </div>
      </ScrollAnimationWrapper>
    </div>
  );
}

export default Home;
