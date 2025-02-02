import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, Form } from "@/components/ui/form";
import { Report } from "@/lib/interfaces/report-interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { updateReport, createReport } from "./form-actions";
import React, { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { reportCreateFormSchema } from "../../zod-schemas";

type Props = {
    report?: Report | null;
};
type StateType = {
    data?: Report;
    errors?: any[];
    error?: string
};

export const ReportDraftForm: React.FC<Props> = ({ report }) => {
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<z.infer<typeof reportCreateFormSchema>>({
        resolver: zodResolver(reportCreateFormSchema),
        defaultValues: {
            name: "",
            description: "",
            reportId: "",
            workspaceId: "",
            workGroup: {}
        }
    });

    const [state, dispatch, isPending] = useActionState(
        async (previous: undefined | StateType, payload: FormData) => {
            let result;
            if (!!previous?.data?.id) {
                result = await updateReport(previous.data.id, payload)
            }
            else {
                result = await createReport(payload)
            }
            if (!result.error && !result.errors) {
                toast({
                    title: "Done",
                    description: "Successfully Saved.",
                });
                router.push(`/admin/companies/${result.data.id}`);
            }
            return result;
        }, { data: report }
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
                                <FormLabel>Report Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is public display name of the report.
                                </FormDescription>
                                <FormMessage>
                                    {state?.errors?.name && <span>{state.errors.name}</span>}
                                </FormMessage>

                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        defaultValue={state?.data?.description}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormDescription>
                                    A sort description about the report.
                                </FormDescription>
                                <FormMessage>
                                    {state?.errors?.description && <span>{state.errors.description}</span>}
                                </FormMessage>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="reportId"
                        defaultValue={state?.data?.reportId}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Report Id</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Powerbi report id.
                                </FormDescription>
                                <FormMessage>
                                    {state?.errors?.reportId && <span>{state.errors.reportId}</span>}
                                </FormMessage>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="workspaceId"
                        defaultValue={state?.data?.workspaceId}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Workspace Id</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Powerbi workspace id.
                                </FormDescription>
                                <FormMessage>
                                    {state?.errors?.workspaceId && <span>{state.errors.workspaceId}</span>}
                                </FormMessage>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="workGroup"
                        defaultValue={state?.data?.workGroup}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Work Group</FormLabel>
                                <FormControl>
                                    {/* <Input placeholder="" {...field} /> */}
                                </FormControl>
                                <FormDescription>
                                    Categarize report under this. It may be easy to browse the group
                                </FormDescription>
                                <FormMessage>
                                    {state?.errors?.contactEmail && <span>{state?.errors.contactEmail}</span>}
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
