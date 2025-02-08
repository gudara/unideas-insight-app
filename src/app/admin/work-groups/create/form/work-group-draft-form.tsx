'use client'
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { updateWg, createWg } from "./form-actions";
import React, { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { WorkGroup } from "@/lib/interfaces/work-group-interface";
import { workGroupCreateFormSchema } from "../../zod-schemas";

type Props = {
    workGroup?: WorkGroup | null
};
type StateType = {
    data?: WorkGroup;
    errors?: any[];
    error?: string | null;
};

export const WorkGroupDraftForm: React.FC<Props> = ({ workGroup }) => {
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<z.infer<typeof workGroupCreateFormSchema>>({
        resolver: zodResolver(workGroupCreateFormSchema),
        defaultValues: {
            name: "",
            icon: ""
        }
    });

    const [state, dispatch, isPending] = useActionState(
        async (previous: undefined | StateType, payload: FormData) => {
            let result = undefined;
            if (!!previous?.data?.id) {
                result = await updateWg(previous.data.id, payload)
            }
            else {
                result = await createWg(payload);
            }
            if (result && !result.error && !result.errors) {
                toast({
                    title: "Done",
                    description: "Successfully Saved.",
                });
                router.push(`/admin/work-groups/`);
            }
            return result;
        }, { data: workGroup }
    );

    const action = async (formData: FormData) => {
        dispatch(formData);
    }

    return (
        <>
            <Form  {...form}>
                <form action={action} className="space-y-2 mt-2 pt-2">
                    <FormField
                        control={form.control}
                        name="name"
                        defaultValue={state?.data?.name}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Work Group Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage>
                                    {state?.errors?.name && <span>{state.errors.name}</span>}
                                </FormMessage>

                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="icon"
                        defaultValue={state?.data?.description}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Icon Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Select an icon from <a className="underline text-blue-500" href="https://lucide.dev/icons/ " target="new">Lucide Icons</a>  and enter its name using Title Case. For example, if you choose the "file-user" icon, enter it as FileUser.
                                </FormDescription>
                                <FormMessage>
                                    {state?.errors?.description && <span>{state.errors.icon}</span>}
                                </FormMessage>
                            </FormItem>
                        )}
                    />

                    <Button type="submit" disabled={isPending}>
                        {isPending && <Loader2 className="animate-spin" />}
                        Save
                    </Button>
                    <FormMessage>
                        {state?.error && <span>{state.error}</span>}
                    </FormMessage>
                </form>
            </Form>
        </>
    )
};
