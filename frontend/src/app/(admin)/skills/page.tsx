// ──────────────────────────────────────────────────────────────
// ADMIN SKILLS PAGE
// ──────────────────────────────────────────────────────────────
//
// This page displays all skills with CRUD operations.
// Admins can create, edit, and delete skills.
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
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Pencil, Trash2, Plus } from "lucide-react";

// ──────────────────────────────────────────────────────────
// Form Validation Schema
// ──────────────────────────────────────────────────────────

const skillSchema = z.object({
  category: z.string().min(1, "Category is required"),
  name: z.string().min(1, "Name is required"),
  icon: z.string().optional(),
});

type SkillFormData = z.infer<typeof skillSchema>;

// ──────────────────────────────────────────────────────────
// Skill Row Component
// ──────────────────────────────────────────────────────────

function SkillRow({
  skill,
  onEdit,
  onDelete,
}: {
  skill: any;
  onEdit: (skill: any) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <tr className="border-b">
      <td className="px-4 py-3">{skill.category}</td>
      <td className="px-4 py-3">
        <Badge variant="secondary">
          {skill.icon && <span className="mr-1">{skill.icon}</span>}
          {skill.name}
        </Badge>
      </td>
      <td className="px-4 py-3 text-right">
        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(skill)}>
            <Pencil className="h-3 w-3" />
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(skill.id)}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </td>
    </tr>
  );
}

// ──────────────────────────────────────────────────────────
// Skill Form Dialog
// ──────────────────────────────────────────────────────────

function SkillFormDialog({
  open,
  onOpenChange,
  skill,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  skill?: any;
  onSave: (data: SkillFormData) => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SkillFormData>({
    resolver: zodResolver(skillSchema),
    defaultValues: skill || { category: "", name: "", icon: "" },
  });

  const isEditing = !!skill;

  useEffect(() => {
    if (skill) {
      reset(skill);
    } else {
      reset({ category: "", name: "", icon: "" });
    }
  }, [skill, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Skill" : "Add Skill"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSave)} className="space-y-4">
          <div>
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              placeholder="Programming Languages"
              {...register("category")}
            />
            {errors.category && (
              <p className="text-sm text-red-500">{errors.category.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="JavaScript" {...register("name")} />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="icon">Icon (optional)</Label>
            <Input id="icon" placeholder="🟨" {...register("icon")} />
          </div>
          <div className="flex justify-end gap-2">
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
// Main Skills Page
// ──────────────────────────────────────────────────────────

export default function SkillsPage() {
  const router = useRouter();
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<any>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // ──────────────────────────────────────────────────────────
  // Fetch skills
  // ──────────────────────────────────────────────────────────

  const fetchSkills = async () => {
    try {
      const response = await apiClient.get("/skills");
      setSkills(response.data);
    } catch (error) {
      toast.error("Failed to load skills");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // ──────────────────────────────────────────────────────────
  // Create/Update skill
  // ──────────────────────────────────────────────────────────

  const handleSave = async (data: SkillFormData) => {
    try {
      if (editingSkill) {
        await apiClient.put(`/skills/${editingSkill.id}`, data);
        toast.success("Skill updated successfully!");
      } else {
        await apiClient.post("/skills", data);
        toast.success("Skill added successfully!");
      }
      setDialogOpen(false);
      setEditingSkill(null);
      fetchSkills();
      router.refresh();
    } catch (error) {
      toast.error("Failed to save skill");
    }
  };

  // ──────────────────────────────────────────────────────────
  // Delete skill
  // ──────────────────────────────────────────────────────────

  const handleDelete = async (id: string) => {
    try {
      await apiClient.delete(`/skills/${id}`);
      toast.success("Skill deleted successfully!");
      fetchSkills();
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete skill");
    }
    setDeletingId(null);
  };

  // ──────────────────────────────────────────────────────────
  // Edit skill
  // ──────────────────────────────────────────────────────────

  const handleEdit = (skill: any) => {
    setEditingSkill(skill);
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
          <h1 className="text-2xl font-bold">Skills</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage your technical skills ({skills.length} total)
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingSkill(null);
            setDialogOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Skill
        </Button>
      </div>

      {/* Skills Table */}
      {skills.length === 0 ? (
        <div className="rounded-lg border bg-white dark:bg-gray-900 p-12 text-center">
          <p className="text-gray-500">No skills added yet.</p>
        </div>
      ) : (
        <div className="rounded-lg border bg-white dark:bg-gray-900 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill) => (
                <SkillRow
                  key={skill.id}
                  skill={skill}
                  onEdit={handleEdit}
                  onDelete={(id) => setDeletingId(id)}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create/Edit Dialog */}
      <SkillFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        skill={editingSkill}
        onSave={handleSave}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This skill will be permanently
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
