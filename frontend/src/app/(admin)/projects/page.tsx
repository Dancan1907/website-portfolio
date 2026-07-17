// ──────────────────────────────────────────────────────────────
// ADMIN PROJECTS PAGE
// ──────────────────────────────────────────────────────────────
//
// This page displays all projects with CRUD operations.
// Admins can create, edit, and delete projects.
// ──────────────────────────────────────────────────────────────

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { apiClient } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Pencil, Trash2, Plus, ExternalLink, Github } from "lucide-react";

// ──────────────────────────────────────────────────────────
// Form Validation Schema
// ──────────────────────────────────────────────────────────

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  problem: z.string().optional(),
  solution: z.string().optional(),
  challenge: z.string().optional(),
  lessons: z.string().optional(),
  techStack: z.string().optional(),
  features: z.string().optional(),
  demoUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  githubUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  isFeatured: z.boolean().default(false),
});

type ProjectFormData = z.infer<typeof projectSchema>;

// ──────────────────────────────────────────────────────────
// Project Row Component
// ──────────────────────────────────────────────────────────

function ProjectRow({
  project,
  onEdit,
  onDelete,
}: {
  project: any;
  onEdit: (project: any) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <tr className="border-b">
      <td className="px-4 py-3 font-medium">{project.title}</td>
      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">
        {project.description}
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-wrap gap-1">
          {project.techStack?.slice(0, 3).map((tech: string) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
          {project.techStack?.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{project.techStack.length - 3}
            </Badge>
          )}
        </div>
      </td>
      <td className="px-4 py-3">
        {project.isFeatured ? (
          <Badge className="bg-indigo-600">Featured</Badge>
        ) : (
          <Badge variant="outline">Standard</Badge>
        )}
      </td>
      <td className="px-4 py-3 text-right">
        <div className="flex justify-end gap-2">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-indigo-600"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-indigo-600"
            >
              <Github className="h-4 w-4" />
            </a>
          )}
          <Button variant="outline" size="sm" onClick={() => onEdit(project)}>
            <Pencil className="h-3 w-3" />
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(project.id)}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </td>
    </tr>
  );
}

// ──────────────────────────────────────────────────────────
// Project Form Dialog
// ──────────────────────────────────────────────────────────

function ProjectFormDialog({
  open,
  onOpenChange,
  project,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project?: any;
  onSave: (data: ProjectFormData) => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: project || {
      title: "",
      description: "",
      problem: "",
      solution: "",
      challenge: "",
      lessons: "",
      techStack: "",
      features: "",
      demoUrl: "",
      githubUrl: "",
      isFeatured: false,
    },
  });

  const isFeatured = watch("isFeatured");

  useEffect(() => {
    if (project) {
      reset({
        ...project,
        techStack: project.techStack?.join(", ") || "",
        features: project.features?.join(", ") || "",
      });
    } else {
      reset({
        title: "",
        description: "",
        problem: "",
        solution: "",
        challenge: "",
        lessons: "",
        techStack: "",
        features: "",
        demoUrl: "",
        githubUrl: "",
        isFeatured: false,
      });
    }
  }, [project, reset]);

  const isEditing = !!project;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Project" : "Add Project"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSave)} className="space-y-4">
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input id="title" {...register("title")} />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" rows={2} {...register("description")} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="problem">Problem</Label>
              <Textarea id="problem" rows={2} {...register("problem")} />
            </div>
            <div>
              <Label htmlFor="solution">Solution</Label>
              <Textarea id="solution" rows={2} {...register("solution")} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="challenge">Challenge</Label>
              <Textarea id="challenge" rows={2} {...register("challenge")} />
            </div>
            <div>
              <Label htmlFor="lessons">Lessons Learned</Label>
              <Textarea id="lessons" rows={2} {...register("lessons")} />
            </div>
          </div>

          <div>
            <Label htmlFor="techStack">Tech Stack (comma separated)</Label>
            <Input
              id="techStack"
              placeholder="Node.js, NestJS, PostgreSQL"
              {...register("techStack")}
            />
          </div>

          <div>
            <Label htmlFor="features">Features (comma separated)</Label>
            <Input
              id="features"
              placeholder="Authentication, Analytics, AI Generation"
              {...register("features")}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="demoUrl">Demo URL</Label>
              <Input
                id="demoUrl"
                placeholder="https://..."
                {...register("demoUrl")}
              />
            </div>
            <div>
              <Label htmlFor="githubUrl">GitHub URL</Label>
              <Input
                id="githubUrl"
                placeholder="https://..."
                {...register("githubUrl")}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Switch
              id="isFeatured"
              checked={isFeatured}
              onCheckedChange={(checked) => setValue("isFeatured", checked)}
            />
            <Label htmlFor="isFeatured">Featured Project</Label>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{isEditing ? "Update" : "Add"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ──────────────────────────────────────────────────────────
// Main Projects Page
// ──────────────────────────────────────────────────────────

export default function ProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // ──────────────────────────────────────────────────────────
  // Fetch projects
  // ──────────────────────────────────────────────────────────

  const fetchProjects = async () => {
    try {
      const response = await apiClient.get("/projects");
      setProjects(response.data);
    } catch (error) {
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // ──────────────────────────────────────────────────────────
  // Create/Update project
  // ──────────────────────────────────────────────────────────

  const handleSave = async (data: ProjectFormData) => {
    try {
      const payload = {
        ...data,
        techStack: data.techStack
          ? data.techStack
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : [],
        features: data.features
          ? data.features
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : [],
        demoUrl: data.demoUrl || null,
        githubUrl: data.githubUrl || null,
      };

      if (editingProject) {
        await apiClient.put(`/projects/${editingProject.id}`, payload);
        toast.success("Project updated successfully!");
      } else {
        await apiClient.post("/projects", payload);
        toast.success("Project added successfully!");
      }
      setDialogOpen(false);
      setEditingProject(null);
      fetchProjects();
      router.refresh();
    } catch (error) {
      toast.error("Failed to save project");
    }
  };

  // ──────────────────────────────────────────────────────────
  // Delete project
  // ──────────────────────────────────────────────────────────

  const handleDelete = async (id: string) => {
    try {
      await apiClient.delete(`/projects/${id}`);
      toast.success("Project deleted successfully!");
      fetchProjects();
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete project");
    }
    setDeletingId(null);
  };

  const handleEdit = (project: any) => {
    setEditingProject(project);
    setDialogOpen(true);
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage your portfolio projects ({projects.length} total)
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingProject(null);
            setDialogOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Project
        </Button>
      </div>

      {/* Projects Table */}
      {projects.length === 0 ? (
        <div className="rounded-lg border bg-white dark:bg-gray-900 p-12 text-center">
          <p className="text-gray-500">No projects added yet.</p>
        </div>
      ) : (
        <div className="rounded-lg border bg-white dark:bg-gray-900 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Description</th>
                <th className="px-4 py-3 text-left">Tech Stack</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <ProjectRow
                  key={project.id}
                  project={project}
                  onEdit={handleEdit}
                  onDelete={(id) => setDeletingId(id)}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create/Edit Dialog */}
      <ProjectFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        project={editingProject}
        onSave={handleSave}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This project will be permanently
              removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingId && handleDelete(deletingId)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
