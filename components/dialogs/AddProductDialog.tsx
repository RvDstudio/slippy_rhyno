"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import AddProductForm from "@/components/forms/AddProductForm";
import { CirclePlusIcon } from "lucide-react";
import { useState } from "react";

interface AddProductDialogProps {
  onProductAdded?: () => void;
}

export function AddProductDialog({ onProductAdded }: AddProductDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    console.log("Form submission success, closing dialog");
    setOpen(false);
    onProductAdded?.();
  };

  const handleOpenChange = (newOpen: boolean) => {
    console.log("Dialog open state changing to:", newOpen);
    setOpen(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        <Button
          size="sm"
          variant="outline"
          className="h-8 gap-1 bg-transparent text-[#0F495E]"
        >
          <CirclePlusIcon className="h-3.5 w-3.5 mr-4" />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-[#111D36]">Add New Product</DialogTitle>
        </DialogHeader>
        <AddProductForm onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
}
