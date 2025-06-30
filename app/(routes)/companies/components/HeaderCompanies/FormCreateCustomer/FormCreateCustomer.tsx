"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { FormCreateCustomerProps } from "./FormCreateCustomer.types";
import { useState } from "react";
import Image from "next/image";

const formSchema = z.object({
  name: z.string(),
  country: z.string().min(2),
  website: z.string().min(2),
  phone: z.string().min(6),
  cif: z.string().min(6),
  profileImage: z.string(),
});

export function FormCreateCustomer(props: FormCreateCustomerProps) {
  const { setOpenModalCreate } = props;
  const [photoUploaded, setPhotoUploaded] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      country: "",
      website: "",
      phone: "",
      cif: "",
      profileImage: "",
    },
  });

  const { isValid } = form.formState;
  // Check if the form is valid

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Movement name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Movement name..."
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="spain">España</SelectItem>
                    <SelectItem value="united-kingdom">
                      United Kingdom
                    </SelectItem>
                    <SelectItem value="portugal">Portugal</SelectItem>
                    <SelectItem value="greece">Grecia</SelectItem>
                    <SelectItem value="italy">Italia</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input
                    placeholder="www.somewebsite.com"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="+1 665 55 55 55" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cif"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CIF</FormLabel>
                <FormControl>
                  <Input placeholder="CIF..." type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="profileImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Image</FormLabel>
                <FormControl>
                  {photoUploaded ? (
                    <p className="text-sm">Image Uploaded</p>
                  ) : (
                    <div className="rounded-lg bg-slate-600/20 text-slate-800 outline-dotted outline-3">
                      <Input
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          if (
                            !["image/png", "image/jpeg"].includes(file.type)
                          ) {
                            alert("Only PNG or JPG images are allowed.");
                            e.target.value = "";
                            return;
                          }
                          if (file.size > 5 * 1024 * 1024) {
                            alert("Image must be less than 5MB.");
                            e.target.value = "";
                            return;
                          }
                          // Optionally, upload the image to a server or convert to base64
                          // For now, just create a local URL and set as value
                          const url = URL.createObjectURL(file);
                          field.onChange(url);
                          setPhotoUploaded(true);
                        }}
                      />
                      {field.value && (
                        <Image
                          src={field.value}
                          alt="Preview"
                          width={96}
                          height={96}
                          className="h-24 w-24 object-cover rounded border"
                        />
                      )}
                    </div>
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
