/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useRef } from "react";
import { useFormContext } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Type,
  AlignLeft,
  DollarSign,
  CalendarDays,
  Gauge,
  Tag,
  FolderOpen,
  Loader2,
  CheckCircle2,
  X,
} from "lucide-react";

import NexForm from "@/components/nex_form/NexForm";
import NexInput from "@/components/nex_form/NexInput";
import NexSelect from "@/components/nex_form/NextSelect";
import { updateProduct } from "@/server-actions/updateProducts";
import Image from "next/image";

const FieldLabel = ({
  htmlFor,
  required,
  icon,
  children,
}: {
  htmlFor?: string;
  required?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <label
    htmlFor={htmlFor}
    className="flex items-center gap-1.5 text-xs font-semibold text-white/60 mb-2"
  >
    {icon}
    {children}
    {required && <span className="text-rose-500">*</span>}
  </label>
);

const ImageThumbnails = ({
  files,
  urls,
  onRemoveFile,
  onRemoveUrl,
}: {
  files: File[];
  urls: string[];
  onRemoveFile: (index: number) => void;
  onRemoveUrl: (index: number) => void;
}) => {
  if (files.length === 0 && urls.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-3 mt-4">
      {urls.map((url, i) => (
        <div
          key={`url-${i}`}
          className="relative w-16 h-16 rounded-xl overflow-hidden border border-white/[0.08] group"
        >
          <Image
            width={64}
            height={64}
            src={url}
            alt={`upload-${i}`}
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={() => onRemoveUrl(i)}
            className="absolute top-1 right-1 w-5 h-5 bg-black/50 hover:bg-rose-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
          >
            <X size={12} className="text-white" />
          </button>
        </div>
      ))}
      {files.map((file, i) => (
        <div
          key={`file-${i}`}
          className="relative w-16 h-16 rounded-xl overflow-hidden border border-white/[0.08] group"
        >
          <Image
            width={64}
            height={64}
            src={URL.createObjectURL(file)}
            alt={`upload-${i}`}
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={() => onRemoveFile(i)}
            className="absolute top-1 right-1 w-5 h-5 bg-black/50 hover:bg-rose-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
          >
            <X size={12} className="text-white" />
          </button>
        </div>
      ))}
    </div>
  );
};

const FormTextarea = ({
  name,
  placeholder,
  required,
}: {
  name: string;
  placeholder: string;
  required?: boolean;
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <div>
      <textarea
        {...register(name, { required })}
        id={name}
        placeholder={placeholder}
        rows={5}
        className={`w-full px-3.5 py-3 rounded-xl bg-[#1a1b26] border text-white text-sm placeholder:text-white/25 outline-none resize-none transition-all duration-200 focus:ring-2 focus:ring-violet-500/20 ${
          errorMessage
            ? "border-red-500 focus:border-red-500"
            : "border-white/[0.08] focus:border-violet-500"
        }`}
      />
      {errorMessage && (
        <p className="mt-1 text-xs text-red-500 font-medium">{errorMessage}</p>
      )}
    </div>
  );
};

const PRIORITIES = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

const ProductUpdateForm = ({
  initialData,
  productId,
}: {
  initialData: any;
  productId: string;
}) => {
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>(
    initialData.imageUrl || [],
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    const newFiles = Array.from(fileList).filter((file) =>
      file.type.startsWith("image/"),
    );
    const totalCurrent = existingImages.length + images.length;
    const remaining = 5 - totalCurrent;
    if (remaining > 0) {
      setImages((prev) => [...prev, ...newFiles].slice(0, remaining));
    } else {
      toast.error("Maximum 5 images allowed in total.");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("shortDescription", data.shortDescription);
      formData.append("fullDescription", data.fullDescription);
      formData.append("price", data.price);
      formData.append("date", data.date);
      formData.append("priority", data.priority);

      images.forEach((image) => formData.append("images", image));

      // As per backend logic, replaceImages="false" appends new images.
      formData.append("replaceImages", "false");

      const result = await updateProduct(productId, formData);
      if (result.success) {
        setShowSuccess(true);
        toast.success("Product updated successfully!");
        setTimeout(() => {
          setShowSuccess(false);
          router.push("/dashboard/items/manage");
        }, 1500);
      } else {
        toast.error(result.message || "Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-3.5 py-3 rounded-xl bg-[#1a1b26] border border-white/[0.08] text-white text-sm placeholder:text-white/25 outline-none transition-all duration-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20";

  return (
    <div>
      <NexForm onSubmit={onSubmit} defaultValues={initialData}>
        <div className="space-y-5">
          {/* 1. title */}
          <div>
            <FieldLabel htmlFor="title" required icon={<Type size={13} />}>
              Product Title
            </FieldLabel>
            <NexInput
              name="title"
              required
              placeholder="e.g. Pro Wireless Headphones XR900"
              className={inputClass}
            />
          </div>

          {/* 2. shortDescription */}
          <div>
            <FieldLabel
              htmlFor="shortDesc"
              required
              icon={<AlignLeft size={13} />}
            >
              Short Description
            </FieldLabel>
            <NexInput
              name="shortDescription"
              required
              placeholder="One-line summary shown in product cards (max 160 chars)"
              className={inputClass}
            />
          </div>

          {/* 3. fullDescription */}
          <div>
            <FieldLabel
              htmlFor="fullDesc"
              required
              icon={<AlignLeft size={13} />}
            >
              Full Description
            </FieldLabel>
            <FormTextarea
              name="fullDescription"
              required
              placeholder="Detailed product description — features, specs, what's in the box..."
            />
          </div>

          {/* 4. price + date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <FieldLabel
                htmlFor="price"
                required
                icon={<DollarSign size={13} />}
              >
                Price (USD)
              </FieldLabel>
              <NexInput
                name="price"
                type="number"
                required
                placeholder="0.00"
                className={inputClass}
              />
            </div>
            <div>
              <FieldLabel htmlFor="date" icon={<CalendarDays size={13} />}>
                Availability Date
              </FieldLabel>
              <NexInput
                name="date"
                type="date"
                className={`${inputClass} [color-scheme:dark]`}
              />
            </div>
          </div>

          {/* 5. priority */}
          <div>
            <FieldLabel icon={<Gauge size={13} />}>Priority</FieldLabel>
            <NexSelect
              name="priority"
              placeholder="Select Priority"
              options={PRIORITIES}
              className={inputClass}
              wrapperClassName="w-full"
            />
          </div>

          {/* 6. imageUrl — upload zone */}
          <div>
            <FieldLabel icon={<Tag size={13} />}>
              Product Images{" "}
              <span className="text-white/25 font-normal ml-1">(up to 5)</span>
            </FieldLabel>
            <div
              role="button"
              tabIndex={0}
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) =>
                e.key === "Enter" && fileInputRef.current?.click()
              }
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer select-none transition-all duration-200 ${
                isDragging
                  ? "border-violet-500 bg-violet-500/10"
                  : "border-white/[0.08] bg-[#1a1b26] hover:border-violet-500/50 hover:bg-violet-500/5"
              }`}
            >
              <FolderOpen
                size={36}
                className={`mx-auto mb-2.5 ${isDragging ? "text-violet-400" : "text-white/20"}`}
              />
              <p className="text-sm font-semibold text-white/60 mb-1">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-white/25">
                PNG, JPG, WEBP · Max 5MB · Up to 5 images
              </p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              multiple
              className="hidden"
              onChange={(e) => addFiles(e.target.files)}
            />
            <ImageThumbnails
              files={images}
              urls={existingImages}
              onRemoveFile={(i) =>
                setImages((prev) => prev.filter((_, idx) => idx !== i))
              }
              onRemoveUrl={(i) =>
                setExistingImages((prev) => prev.filter((_, idx) => idx !== i))
              }
            />
          </div>

          {/* Submit row */}
          <div className="flex gap-3 pt-4 border-t border-white/[0.06]">
            <Link
              href="/dashboard/items/manage"
              className="flex items-center gap-2 px-5 py-3 rounded-full border border-white/[0.08] text-sm font-semibold text-white/40 hover:text-white hover:border-white/20 transition-all"
            >
              ← Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting || showSuccess}
              className="flex-1 flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white rounded-full py-3 text-sm font-semibold shadow-lg shadow-violet-500/20 transition-all duration-200"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Saving Changes...
                </>
              ) : showSuccess ? (
                <>
                  <CheckCircle2 size={15} />
                  Saved!
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </div>
      </NexForm>
    </div>
  );
};

export default ProductUpdateForm;
