// ──────────────────────────────────────────────────────────────
// ADMIN EXPERIENCE PAGE
// ──────────────────────────────────────────────────────────────
//
// This page displays all experience entries with CRUD operations.
// Admins can create, edit, and delete experience entries.
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
import { Pencil, Trash2, Plus } from "lucide-react";

// ──────────────────────────────────────────────────────────
// Form Validation Schema
// ──────────────────────────────────────────────────────────

const experienceSchema = z.object({
  role: z.string().min(1, "Role is required"),
  organization: z.string().min(1, "Organization is required"),
  location: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  isPresent: z.boolean().default(false),
  description: z.string().optional(),
  responsibilities: z.string().optional(),
  technologies: z.string().optional(),
  achievements: z.string().optional(),
});

type ExperienceFormData = z.infer<typeof experienceSchema>;

// ──────────────────────────────────────────────────────────
// Format date helper
// ──────────────────────────────────────────────────────────

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

// ──────────────────────────────────────────────────────────
// Experience Row Component
// ──────────────────────────────────────────────────────────

function ExperienceRow({
  experience,
  onEdit,
  onDelete,
}: {
  experience: any;
  onEdit: (experience: any) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <tr className="border-b">
      <td className="px-4 py-3 font-medium">{experience.role}</td>
      <td className="px-4 py-3">{experience.organization}</td>
      <td className="px-4 py-3 text-sm">
        {formatDate(experience.startDate)} –{" "}
        {experience.isPresent ? "Present" : formatDate(experience.endDate)}
      </td>
      <td className="px-4 py-3">
        {experience.isPresent ? (
          <Badge className="bg-green-600">Current</Badge>
        ) : (
          <Badge variant="outline">Completed</Badge>
        )}
      </td>
      <td className="px-4 py-3 text-right">
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(experience)}
          >
            <Pencil className="h-3 w-3" />
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(experience.id)}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </td>
    </tr>
  );
}

// ──────────────────────────────────────────────────────────
// Experience Form Dialog
// ──────────────────────────────────────────────────────────

function ExperienceFormDialog({
  open,
  onOpenChange,
  experience,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  experience?: any;
  onSave: (data: ExperienceFormData) => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ExperienceFormData>({
    resolver: zodResolver(experienceSchema),
    defaultValues: experience || {
      role: "",
      organization: "",
      location: "",
      startDate: "",
      endDate: "",
      isPresent: false,
      description: "",
      responsibilities: "",
      technologies: "",
      achievements: "",
    },
  });

  const isPresent = watch("isPresent");

  useEffect(() => {
    if (experience) {
      reset({
        ...experience,
        startDate: experience.startDate
          ? experience.startDate.split("T")[0]
          : "",
        endDate: experience.endDate ? experience.endDate.split("T")[0] : "",
        responsibilities: experience.responsibilities?.join("\n") || "",
        technologies: experience.technologies?.join(", ") || "",
        achievements: experience.achievements?.join("\n") || "",
      });
    } else {
      reset({
        role: "",
        organization: "",
        location: "",
        startDate: "",
        endDate: "",
        isPresent: false,
        description: "",
        responsibilities: "",
        technologies: "",
        achievements: "",
      });
    }
  }, [experience, reset]);

  const isEditing = !!experience;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Experience" : "Add Experience"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSave)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="role">Role *</Label>
              <Input id="role" {...register("role")} />
              {errors.role && (
                <p className="text-sm text-red-500">{errors.role.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="organization">Organization *</Label>
              <Input id="organization" {...register("organization")} />
              {errors.organization && (
                <p className="text-sm text-red-500">
                  {errors.organization.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="Remote or City, Country"
              {...register("location")}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="startDate">Start Date *</Label>
              <Input id="startDate" type="date" {...register("startDate")} />
              {errors.startDate && (
                <p className="text-sm text-red-500">
                  {errors.startDate.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                disabled={isPresent}
                className={isPresent ? "opacity-50" : ""}
                {...register("endDate")}
              />
            </div>
            <div className="flex items-center gap-2 pt-6">
              <Switch
                id="isPresent"
                checked={isPresent}
                onCheckedChange={(checked) => setValue("isPresent", checked)}
              />
              <Label htmlFor="isPresent" className="cursor-pointer">
                Current Position
              </Label>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" rows={2} {...register("description")} />
          </div>

          <div>
            <Label htmlFor="responsibilities">
              Responsibilities (one per line)
            </Label>
            <Textarea
              id="responsibilities"
              rows={3}
              {...register("responsibilities")}
            />
          </div>

          <div>
            <Label htmlFor="technologies">Technologies (comma separated)</Label>
            <Input
              id="technologies"
              placeholder="Node.js, NestJS, PostgreSQL"
              {...register("technologies")}
            />
          </div>

          <div>
            <Label htmlFor="achievements">
              Key Achievements (one per line)
            </Label>
            <Textarea
              id="achievements"
              rows={2}
              {...register("achievements")}
            />
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
// Main Experience Page
// ──────────────────────────────────────────────────────────

export default function ExperiencePage() {
  const router = useRouter();
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<any>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchExperiences = async () => {
    try {
      const response = await apiClient.get("/experience");
      setExperiences(response.data);
    } catch (error) {
      toast.error("Failed to load experience");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleSave = async (data: ExperienceFormData) => {
    try {
      const payload = {
        ...data,
        responsibilities: data.responsibilities
          ? data.responsibilities.split("\n").filter(Boolean)
          : [],
        technologies: data.technologies
          ? data.technologies
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : [],
        achievements: data.achievements
          ? data.achievements.split("\n").filter(Boolean)
          : [],
        endDate: data.isPresent ? null : data.endDate || null,
      };

      if (editingExperience) {
        await apiClient.put(`/experience/${editingExperience.id}`, payload);
        toast.success("Experience updated successfully!");
      } else {
        await apiClient.post("/experience", payload);
        toast.success("Experience added successfully!");
      }
      setDialogOpen(false);
      setEditingExperience(null);
      fetchExperiences();
      router.refresh();
    } catch (error) {
      toast.error("Failed to save experience");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await apiClient.delete(`/experience/${id}`);
      toast.success("Experience deleted successfully!");
      fetchExperiences();
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete experience");
    }
    setDeletingId(null);
  };

  const handleEdit = (experience: any) => {
    setEditingExperience(experience);
    setDialogOpen(true);
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Experience</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage your work experience ({experiences.length} entries)
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingExperience(null);
            setDialogOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Experience
        </Button>
      </div>

      {experiences.length === 0 ? (
        <div className="rounded-lg border bg-white dark:bg-gray-900 p-12 text-center">
          <p className="text-gray-500">No experience entries added yet.</p>
        </div>
      ) : (
        <div className="rounded-lg border bg-white dark:bg-gray-900 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-left">Organization</th>
                <th className="px-4 py-3 text-left">Duration</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {experiences.map((exp) => (
                <ExperienceRow
                  key={exp.id}
                  experience={exp}
                  onEdit={handleEdit}
                  onDelete={(id) => setDeletingId(id)}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ExperienceFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        experience={editingExperience}
        onSave={handleSave}
      />

      <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This experience entry will be
              permanently removed.
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
