'use client'
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, Form } from "@/components/ui/form";
import { Report } from "@/lib/interfaces/report-interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { updateReport, createReport } from "./form-actions";
import React, { useActionState, useState } from "react";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { reportCreateFormSchema } from "../../zod-schemas";
import { WorkGroupSelect } from "../../components/work-group-select";
import { WorkGroup } from "@/lib/interfaces/work-group-interface";

type Props = {
    report?: Report | null
};
type StateType = {
    data?: Report;
    errors?: any[];
    error?: string | null;
};

export const ReportDraftForm: React.FC<Props> = ({ report }) => {
    const { toast } = useToast();
    const router = useRouter();
    const [selectedWorkGroup, setSelectedWorkgroup] = useState<WorkGroup | null>(null);

    const form = useForm<z.infer<typeof reportCreateFormSchema>>({
        resolver: zodResolver(reportCreateFormSchema),
        defaultValues: {
            name: "",
            description: "",
            reportId: "",
            workspaceId: "",
            workGroupId: undefined,
            workGroupName: undefined,
        }
    });

    const [state, dispatch, isPending] = useActionState(
        async (previous: undefined | StateType, payload: FormData) => {
            let result = undefined;
            if (!!previous?.data?.id) {
                result = await updateReport(previous.data.id, payload)
            }
            else {
                result = await createReport(payload);
            }
            if (result && !result.error && !result.errors) {
                toast({
                    title: "Done",
                    description: "Successfully Saved.",
                });
                router.push(`/admin/reports/`);
            }
            return result;
        }, { data: report }
    );

    const action = async (formData: FormData) => {
        if (selectedWorkGroup) {
            formData.append("workGroupName", selectedWorkGroup?.name);
            formData.append("workGroupId", selectedWorkGroup?.id.toString());
        }
        dispatch(formData);
    }

    const wgSelected = (workGroup: WorkGroup) => {
        setSelectedWorkgroup(workGroup);
        form.setValue("workGroupName", workGroup?.name);
        form.setValue("workGroupId", +workGroup?.id);
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
                        name="workGroupId"
                        defaultValue={state?.data?.workGroupId}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Work Group</FormLabel>
                                <FormControl>
                                    <WorkGroupSelect
                                        onSelect={(workgroup) => wgSelected(workgroup)}
                                        selectedId={+field.value}
                                        disabled={isPending}
                                        withAddNewButton={true}
                                    />
                                </FormControl>
                                <input
                                    type="hidden"
                                    name="workGroupId"
                                    defaultValue={state?.data?.workGroupId}
                                />

                                <input
                                    type="hidden"
                                    name="workGroupName"
                                    defaultValue={state?.data?.workGroup?.name}
                                />
                                <FormDescription>
                                    Categarize report under this. It will be easy to browse the group
                                </FormDescription>
                                <FormMessage>
                                    {state?.errors?.workGroupId && <span>{state?.errors.workGroupId}</span>}
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
