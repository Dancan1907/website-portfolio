// ──────────────────────────────────────────────────────────────
// ADMIN EDUCATION PAGE
// ──────────────────────────────────────────────────────────────
//
// This page displays all education entries with CRUD operations.
// Admins can create, edit, and delete education entries.
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

const educationSchema = z.object({
  institution: z.string().min(1, "Institution is required"),
  degree: z.string().min(1, "Degree is required"),
  location: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  // ✅ Removed .default(false) – now required boolean
  isPresent: z.boolean(),
  description: z.string().optional(),
  coursework: z.string().optional(),
  achievements: z.string().optional(),
});

type EducationFormData = z.infer<typeof educationSchema>;

// ──────────────────────────────────────────────────────────
// Format date helper
// ──────────────────────────────────────────────────────────

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

// ──────────────────────────────────────────────────────────
// Education Row Component
// ──────────────────────────────────────────────────────────

function EducationRow({
  education,
  onEdit,
  onDelete,
}: {
  education: any;
  onEdit: (education: any) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <tr className="border-b">
      <td className="px-4 py-3 font-medium">{education.degree}</td>
      <td className="px-4 py-3">{education.institution}</td>
      <td className="px-4 py-3 text-sm">
        {formatDate(education.startDate)} –{" "}
        {education.isPresent ? "Present" : formatDate(education.endDate)}
      </td>
      <td className="px-4 py-3">
        {education.isPresent ? (
          <Badge className="bg-green-600">Current</Badge>
        ) : (
          <Badge variant="outline">Completed</Badge>
        )}
      </td>
      <td className="px-4 py-3 text-right">
        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(education)}>
            <Pencil className="h-3 w-3" />
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(education.id)}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </td>
    </tr>
  );
}

// ──────────────────────────────────────────────────────────
// Education Form Dialog
// ──────────────────────────────────────────────────────────

function EducationFormDialog({
  open,
  onOpenChange,
  education,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  education?: any;
  onSave: (data: EducationFormData) => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EducationFormData>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      institution: "",
      degree: "",
      location: "",
      startDate: "",
      endDate: "",
      isPresent: false, // ✅ default set here, not in schema
      description: "",
      coursework: "",
      achievements: "",
    },
  });

  const isPresent = watch("isPresent");

  useEffect(() => {
    if (education) {
      reset({
        institution: education.institution || "",
        degree: education.degree || "",
        location: education.location || "",
        startDate: education.startDate ? education.startDate.split("T")[0] : "",
        endDate: education.endDate ? education.endDate.split("T")[0] : "",
        isPresent: education.isPresent ?? false, // ✅ ensure boolean
        description: education.description || "",
        coursework: education.coursework?.join(", ") || "",
        achievements: education.achievements?.join("\n") || "",
      });
    } else {
      reset({
        institution: "",
        degree: "",
        location: "",
        startDate: "",
        endDate: "",
        isPresent: false,
        description: "",
        coursework: "",
        achievements: "",
      });
    }
  }, [education, reset]);

  const isEditing = !!education;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Education" : "Add Education"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSave)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="institution">Institution *</Label>
              <Input id="institution" {...register("institution")} />
              {errors.institution && (
                <p className="text-sm text-red-500">
                  {errors.institution.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="degree">Degree *</Label>
              <Input id="degree" {...register("degree")} />
              {errors.degree && (
                <p className="text-sm text-red-500">{errors.degree.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="City, Country"
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
                Currently Studying
              </Label>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" rows={2} {...register("description")} />
          </div>

          <div>
            <Label htmlFor="coursework">Coursework (comma separated)</Label>
            <Input
              id="coursework"
              placeholder="Data Structures, Algorithms, Databases"
              {...register("coursework")}
            />
          </div>

          <div>
            <Label htmlFor="achievements">
              Academic Achievements (one per line)
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
// Main Education Page
// ──────────────────────────────────────────────────────────

export default function EducationPage() {
  const router = useRouter();
  const [educations, setEducations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEducation, setEditingEducation] = useState<any>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchEducations = async () => {
    try {
      const response = await apiClient.get("/education");
      setEducations(response.data);
    } catch (error) {
      toast.error("Failed to load education");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducations();
  }, []);

  const handleSave = async (data: EducationFormData) => {
    try {
      const payload = {
        ...data,
        coursework: data.coursework
          ? data.coursework
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : [],
        achievements: data.achievements
          ? data.achievements.split("\n").filter(Boolean)
          : [],
        endDate: data.isPresent ? null : data.endDate || null,
      };

      if (editingEducation) {
        await apiClient.put(`/education/${editingEducation.id}`, payload);
        toast.success("Education updated successfully!");
      } else {
        await apiClient.post("/education", payload);
        toast.success("Education added successfully!");
      }
      setDialogOpen(false);
      setEditingEducation(null);
      fetchEducations();
      router.refresh();
    } catch (error) {
      toast.error("Failed to save education");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await apiClient.delete(`/education/${id}`);
      toast.success("Education deleted successfully!");
      fetchEducations();
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete education");
    }
    setDeletingId(null);
  };

  const handleEdit = (education: any) => {
    setEditingEducation(education);
    setDialogOpen(true);
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Education</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage your academic background ({educations.length} entries)
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingEducation(null);
            setDialogOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Education
        </Button>
      </div>

      {educations.length === 0 ? (
        <div className="rounded-lg border bg-white dark:bg-gray-900 p-12 text-center">
          <p className="text-gray-500">No education entries added yet.</p>
        </div>
      ) : (
        <div className="rounded-lg border bg-white dark:bg-gray-900 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left">Degree</th>
                <th className="px-4 py-3 text-left">Institution</th>
                <th className="px-4 py-3 text-left">Duration</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {educations.map((edu) => (
                <EducationRow
                  key={edu.id}
                  education={edu}
                  onEdit={handleEdit}
                  onDelete={(id) => setDeletingId(id)}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      <EducationFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        education={editingEducation}
        onSave={handleSave}
      />

      <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This education entry will be
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