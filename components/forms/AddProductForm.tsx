"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Image from "next/image";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { v4 as uuidv4 } from "uuid";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  product_name: z.string().min(2, {
    message: "product name must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "description must be at least 2 characters.",
  }),
  short_description: z.string().min(2, {
    message: "short description must be at least 2 characters.",
  }),
  quantity: z.string().min(1, {
    message: "quantity must be at least 1 character.",
  }),
  price: z.string().min(1, {
    message: "price must be at least 1 character.",
  }),
  image_url: z.string().optional(),
});

type FormSchema = z.infer<typeof formSchema>;

interface AddProductFormProps {
  onSuccess?: () => void;
}

export default function AddProductForm({ onSuccess }: AddProductFormProps) {
  const [uploadedImage, setUploadedImage] = useState<string>("");

  const supabase = createClientComponentClient();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      // Create unique file name
      const fileExt = file.name.split(".").pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = fileName;

      // Upload file to Supabase Storage
      const { error: uploadError, data } = await supabase.storage
        .from("products")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("products").getPublicUrl(filePath);

      setUploadedImage(publicUrl);
      form.setValue("image_url", publicUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_name: "",
      description: "",
      short_description: "",
      quantity: "",
      price: "",
      image_url: "",
    },
  });

  async function onSubmit(values: FormSchema) {
    console.log("Form submitted with values:", values);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Server error:", errorData);
        throw new Error(errorData.error || "Failed to submit form");
      }

      const data = await res.json();
      console.log("Form submitted successfully:", data);
      form.reset();
      onSuccess?.();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
    }
  }

  const handleSubmit = form.handleSubmit((data) => {
    console.log("Form is being submitted with data:", data);
    onSubmit(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          control={form.control}
          name="product_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#111D36]">Product name</FormLabel>
              <FormControl>
                <Input
                  className="bg-gray-100 text-[#0F495E] focus-visible:ring-1"
                  placeholder="product name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#111D36]">Description</FormLabel>
              <FormControl>
                <Textarea
                  className="bg-gray-100 text-[#0F495E]"
                  placeholder="description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="short_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#111D36]">
                Short description
              </FormLabel>
              <FormControl>
                <Input
                  className="bg-gray-100 text-[#0F495E] focus-visible:ring-1"
                  placeholder="short description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid sm:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#111D36]">Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className="bg-gray-100 text-[#0F495E] focus-visible:ring-1"
                    placeholder="quantity"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel className="text-[#111D36]">Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    className="bg-gray-100 text-[#0F495E] focus-visible:ring-1"
                    placeholder="price"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="image_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#111D36]">Product Image</FormLabel>
              <FormControl>
                <div className="flex flex-col gap-4">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="h-10 px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors text-[#0F495E] focus-visible:ring-1"
                  />
                  {uploadedImage && (
                    <div className="relative w-40 h-40">
                      <Image
                        src={uploadedImage}
                        alt="Uploaded product image"
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="mr-auto bg-[#0F495E] dark:bg-white hover:bg-[#0F495E]/80 dark:hover:bg-white"
          onClick={() => console.log("Submit button clicked")}
        >
          Add Product
        </Button>
      </form>
    </Form>
  );
}
