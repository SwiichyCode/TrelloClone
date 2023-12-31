import * as z from "zod";
import { useTransition } from "react";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addWorkspace } from "./_actions";
import { formSchema } from "./_schema";
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
import { Textarea } from "@/components/ui/textarea";
import { SubmitButtonClient } from "@/components/ui/SubmitButtonClient";

type Props = {
  setOpen: (open: boolean) => void;
};

export const WorkspaceForm = ({ setOpen }: Props) => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      const payload = await addWorkspace(values);

      if (!payload.errors) {
        toast({
          title: "Espace de travail créé avec succès.",
          description: "Vous pouvez maintenant créer des tableaux.",
        });

        setOpen(false);
      }

      if (payload.errors) {
        toast({
          title: "Une erreur est survenue.",
          description: payload.errors.map((error) => error.message).join(" "),
        });
      }
    });

    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom de l'espace de travail</FormLabel>
              <FormControl>
                <Input placeholder="Kanban." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type d'espace de travail</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="salesAndCustomerManagement">
                    Vente et gestion de la relation client
                  </SelectItem>
                  <SelectItem value="education">Éducation</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="smallBusiness">
                    Petite entreprise
                  </SelectItem>
                  <SelectItem value="engineeringOrIT">
                    Ingénierie/Informatique
                  </SelectItem>
                  <SelectItem value="operations">Opérations</SelectItem>
                  <SelectItem value="humanResources">
                    Ressources humaines
                  </SelectItem>
                  <SelectItem value="other">Autre</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Description de l'espace de travail{" "}
                <span className=" text-xs font-normal">Facultatif</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tous se passe ici pour notre équipe."
                  className="h-32 resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Décrivez votre espace de travail en quelques mots pour les
                nouveaux membres.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButtonClient type="submit" pending={isPending}>
          Continuer
        </SubmitButtonClient>
      </form>
    </Form>
  );
};
