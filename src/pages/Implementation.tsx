import React, { useState } from "react";
import { useActionPlans } from "@/hooks/useActionPlans";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Task } from "@/lib/api";
import { format } from "date-fns";
import {
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  Filter,
  ListTodo,
  Plus,
  Settings,
} from "lucide-react";

const Implementation = () => {
  const { plans, isLoading } = useActionPlans();
  const [activeView, setActiveView] = useState("kanban");

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">
            Loading implementation data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-background">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Implementation Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Track and manage your ESG initiatives and tasks
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button variant="default" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Action Plan
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <Tabs value={activeView} onValueChange={setActiveView}>
          <TabsList>
            <TabsTrigger value="kanban" className="flex items-center gap-2">
              <ListTodo className="h-4 w-4" />
              Kanban Board
            </TabsTrigger>
            <TabsTrigger value="timeline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Timeline
            </TabsTrigger>
            <TabsTrigger value="metrics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Metrics
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Documents
            </TabsTrigger>
          </TabsList>

          <TabsContent value="kanban" className="mt-6">
            <KanbanBoard plans={plans} />
          </TabsContent>

          <TabsContent value="timeline" className="mt-6">
            <div className="text-center py-12 text-muted-foreground border rounded-lg">
              Timeline view will be implemented in the next phase
            </div>
          </TabsContent>

          <TabsContent value="metrics" className="mt-6">
            <div className="text-center py-12 text-muted-foreground border rounded-lg">
              Metrics dashboard will be implemented in the next phase
            </div>
          </TabsContent>

          <TabsContent value="documents" className="mt-6">
            <div className="text-center py-12 text-muted-foreground border rounded-lg">
              Document repository will be implemented in the next phase
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

interface KanbanBoardProps {
  plans: any[];
}

const KanbanBoard = ({ plans }: KanbanBoardProps) => {
  // Extract all tasks from all plans
  const allTasks = plans.flatMap((plan) =>
    plan.tasks.map((task: Task) => ({
      ...task,
      planId: plan.id,
      planName: plan.topicName,
    })),
  );

  // Group tasks by status
  const notStartedTasks = allTasks.filter(
    (task) => task.status === "not-started",
  );
  const inProgressTasks = allTasks.filter(
    (task) => task.status === "in-progress",
  );
  const completedTasks = allTasks.filter((task) => task.status === "completed");

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <KanbanColumn
        title="Not Started"
        count={notStartedTasks.length}
        tasks={notStartedTasks}
      />
      <KanbanColumn
        title="In Progress"
        count={inProgressTasks.length}
        tasks={inProgressTasks}
      />
      <KanbanColumn
        title="Completed"
        count={completedTasks.length}
        tasks={completedTasks}
      />
    </div>
  );
};

interface KanbanColumnProps {
  title: string;
  count: number;
  tasks: any[];
}

const KanbanColumn = ({ title, count, tasks }: KanbanColumnProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">{title}</h3>
          <Badge variant="outline">{count}</Badge>
        </div>
        <Button variant="ghost" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="bg-muted/30 rounded-lg p-2 flex-1 min-h-[500px] overflow-auto">
        <div className="space-y-3">
          {tasks.length > 0 ? (
            tasks.map((task) => <TaskCard key={task.id} task={task} />)
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No tasks in this column
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface TaskCardProps {
  task: any;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card className="bg-background">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="font-medium">{task.title}</div>
            <div className="text-sm text-muted-foreground mt-1">
              {task.planName}
            </div>
          </div>
          <Badge className={getPriorityColor(task.priority)}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </Badge>
        </div>

        <Separator className="my-3" />

        <div className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {task.description}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${task.owner}`}
                alt={task.owner}
              />
              <AvatarFallback>
                {task.owner
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs">{task.owner}</span>
          </div>

          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            {format(new Date(task.deadline), "MMM d, yyyy")}
          </div>

          {task.evidence.length > 0 && (
            <div className="flex items-center text-xs">
              <FileText className="h-3 w-3 mr-1" />
              {task.evidence.length}
            </div>
          )}
        </div>

        {task.status === "completed" && (
          <div className="flex items-center justify-center mt-3 text-xs text-green-600">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Completed
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Implementation;
