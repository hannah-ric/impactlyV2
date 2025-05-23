import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  CalendarIcon,
  CheckCircle2,
  Clock,
  FileText,
  Plus,
  Trash2,
  Upload,
  Users,
} from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  owner: string;
  deadline: Date;
  status: "not-started" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  evidence: string[];
}

interface TopicActionPlanProps {
  topicId?: string;
  topicName?: string;
  description?: string;
  tasks?: Task[];
}

const TopicActionPlan: React.FC<TopicActionPlanProps> = ({
  topicId = "t-001",
  topicName = "Carbon Emissions Reduction",
  description = "Develop and implement strategies to reduce carbon emissions across operations and supply chain.",
  tasks = [
    {
      id: "task-1",
      title: "Conduct carbon footprint assessment",
      description:
        "Perform a comprehensive assessment of current carbon emissions across all operations.",
      owner: "Jane Smith",
      deadline: new Date(2023, 11, 15),
      status: "completed",
      priority: "high",
      evidence: ["baseline-report.pdf", "emissions-data.xlsx"],
    },
    {
      id: "task-2",
      title: "Develop emissions reduction targets",
      description:
        "Set science-based targets for emissions reduction in line with industry standards.",
      owner: "Michael Chen",
      deadline: new Date(2024, 0, 10),
      status: "in-progress",
      priority: "high",
      evidence: ["draft-targets.pdf"],
    },
    {
      id: "task-3",
      title: "Implement energy efficiency measures",
      description:
        "Identify and implement energy efficiency measures across facilities.",
      owner: "Sarah Johnson",
      deadline: new Date(2024, 2, 20),
      status: "not-started",
      priority: "medium",
      evidence: [],
    },
  ],
}) => {
  const [activeTab, setActiveTab] = useState("tasks");
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: "",
    description: "",
    owner: "",
    deadline: new Date(),
    priority: "medium",
    status: "not-started",
    evidence: [],
  });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [currentTasks, setCurrentTasks] = useState<Task[]>(tasks);

  useEffect(() => {
    if (Array.isArray(tasks)) {
      setCurrentTasks([...tasks]);
    }
  }, [tasks]);

  const getCompletionPercentage = () => {
    if (currentTasks.length === 0) return 0;
    const completedTasks = currentTasks.filter(
      (task) => task.status === "completed",
    ).length;
    return Math.round((completedTasks / currentTasks.length) * 100);
  };

  const handleAddTask = () => {
    if (!newTask.title) return;

    const task: Task = {
      id: `task-${Date.now()}`,
      title: newTask.title || "",
      description: newTask.description || "",
      owner: newTask.owner || "",
      deadline: newTask.deadline || new Date(),
      status: newTask.status as "not-started" | "in-progress" | "completed",
      priority: newTask.priority as "low" | "medium" | "high",
      evidence: [],
    };

    setCurrentTasks([...currentTasks, task]);
    setNewTask({
      title: "",
      description: "",
      owner: "",
      deadline: new Date(),
      priority: "medium",
      status: "not-started",
      evidence: [],
    });
  };

  const handleDeleteTask = (taskId: string) => {
    setCurrentTasks(currentTasks.filter((task) => task.id !== taskId));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "in-progress":
        return <Badge className="bg-blue-500">In Progress</Badge>;
      default:
        return <Badge variant="outline">Not Started</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-500">High</Badge>;
      case "medium":
        return <Badge className="bg-yellow-500">Medium</Badge>;
      default:
        return <Badge className="bg-gray-500">Low</Badge>;
    }
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-bold">{topicName}</CardTitle>
            <CardDescription className="mt-2">{description}</CardDescription>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500 mb-1">Overall Progress</div>
            <div className="flex items-center gap-2">
              <Progress
                value={getCompletionPercentage()}
                className="w-32 h-2"
              />
              <span className="text-sm font-medium">
                {getCompletionPercentage()}%
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="tasks" className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Tasks
            </TabsTrigger>
            <TabsTrigger value="evidence" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Evidence
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Team
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-md border">
              <h3 className="text-sm font-medium mb-3">Add New Task</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Input
                    placeholder="Task title"
                    value={newTask.title}
                    onChange={(e) =>
                      setNewTask({ ...newTask, title: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Input
                    placeholder="Task owner"
                    value={newTask.owner}
                    onChange={(e) =>
                      setNewTask({ ...newTask, owner: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="mb-4">
                <Textarea
                  placeholder="Task description"
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask({ ...newTask, description: e.target.value })
                  }
                  className="min-h-[80px]"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? (
                          format(selectedDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                          setSelectedDate(date);
                          setNewTask({
                            ...newTask,
                            deadline: date || new Date(),
                          });
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Select
                    value={newTask.priority}
                    onValueChange={(value) =>
                      setNewTask({
                        ...newTask,
                        priority: value as "low" | "medium" | "high",
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select
                    value={newTask.status}
                    onValueChange={(value) =>
                      setNewTask({
                        ...newTask,
                        status: value as
                          | "not-started"
                          | "in-progress"
                          | "completed",
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="not-started">Not Started</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={handleAddTask} className="w-full">
                <Plus className="h-4 w-4 mr-2" /> Add Task
              </Button>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Deadline</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{task.title}</div>
                          <div className="text-sm text-gray-500 truncate max-w-[200px]">
                            {task.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{task.owner}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1 text-gray-500" />
                          {format(task.deadline, "MMM d, yyyy")}
                        </div>
                      </TableCell>
                      <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                      <TableCell>{getStatusBadge(task.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteTask(task.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {currentTasks.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center py-8 text-gray-500"
                      >
                        No tasks added yet. Add your first task above.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="evidence" className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-md border">
              <h3 className="text-sm font-medium mb-3">Upload Evidence</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center">
                <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 mb-2">
                  Drag and drop files here or click to browse
                </p>
                <Button variant="outline" size="sm">
                  Browse Files
                </Button>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>File Name</TableHead>
                    <TableHead>Related Task</TableHead>
                    <TableHead>Uploaded By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentTasks.flatMap((task) =>
                    task.evidence.map((file, index) => (
                      <TableRow key={`${task.id}-${index}`}>
                        <TableCell>
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-blue-500" />
                            {file}
                          </div>
                        </TableCell>
                        <TableCell>{task.title}</TableCell>
                        <TableCell>{task.owner}</TableCell>
                        <TableCell>
                          {format(new Date(), "MMM d, yyyy")}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    )),
                  )}
                  {currentTasks.flatMap((task) => task.evidence).length ===
                    0 && (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center py-8 text-gray-500"
                      >
                        No evidence files uploaded yet.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="team" className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-md border">
              <h3 className="text-sm font-medium mb-3">Team Members</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Array.from(
                  new Set(currentTasks.map((task) => task.owner)),
                ).map((owner, index) => (
                  <Card key={index} className="flex items-center p-4 gap-3">
                    <Avatar>
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${owner}`}
                      />
                      <AvatarFallback>
                        {owner
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{owner}</div>
                      <div className="text-sm text-gray-500">
                        {
                          currentTasks.filter((task) => task.owner === owner)
                            .length
                        }{" "}
                        tasks assigned
                      </div>
                    </div>
                  </Card>
                ))}
                <Card className="flex items-center justify-center p-4 border-dashed">
                  <Button
                    variant="ghost"
                    className="h-full w-full flex flex-col items-center gap-2"
                  >
                    <Plus className="h-6 w-6" />
                    <span>Add Team Member</span>
                  </Button>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t p-4">
        <Button variant="outline">Cancel</Button>
        <Button>Save Action Plan</Button>
      </CardFooter>
    </Card>
  );
};

export default TopicActionPlan;
