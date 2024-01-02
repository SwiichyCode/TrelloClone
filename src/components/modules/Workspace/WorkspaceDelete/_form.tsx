"use client";
import * as z from "zod";
import { useState, useEffect, useTransition } from "react";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { formSchema } from "./_schema";
import { deleteWorkspace } from "./_action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

type Props = {
  name: string;
  slug: string | null; // Fix this null type
};

export const DeleteWorkspaceForm = ({ name, slug }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [isDisabled, setIsDisabled] = useState(true);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      setIsDisabled(value.name !== name);
    });

    return () => subscription.unsubscribe();
  }, [form.watch]);

  const onSubmit = async () => {
    startTransition(async () => {
      const payload = await deleteWorkspace(slug);
      router.back();

      if (payload?.error) {
        toast({
          title: "Une erreur est survenue.",
          description: payload.error,
        });

        return;
      }

      toast({
        title: "Espace de travail supprimé avec succès.",
        description: "Vous pouvez maintenant créer d'autre tableaux.",
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" text-xs">
                Saisissez le nom de l'espace de travail à supprimer
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isDisabled} className="w-full">
          Supprimer l'espace de travail
        </Button>
      </form>
    </Form>
  );
};
