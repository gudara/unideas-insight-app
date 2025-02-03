'use client'
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, Form } from "@/components/ui/form";
import { Report } from "@/lib/interfaces/report-interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { updateReport, createReport } from "./form-actions";
import React, { useActionState, useEffect, useRef, useState } from "react";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { reportCreateFormSchema } from "../../zod-schemas";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { WorkGroup } from "@/lib/interfaces/work-group-interface";
import { WorkGroupStatus } from "@prisma/client";

type Props = {
    report?: Report | null;
    workGroups: WorkGroup[]
};
type StateType = {
    data?: Report;
    errors?: any[];
    error?: string | null;
};

export const ReportDraftForm: React.FC<Props> = ({ report, workGroups }) => {
    const { toast } = useToast();
    const router = useRouter();
    const [isNewWg, setIsNewWg] = useState(false)
    const [newWg, setNewWg] = useState<WorkGroup>({
        id: -1,
        name : '' ,
        status: WorkGroupStatus.Enable
    })
    const newWGInputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        // Focus the input when the component mounts
        if (newWGInputRef.current) {
            newWGInputRef.current.focus();
        }
      }, [isNewWg]);

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

    function preperAddNewWg() {
        setIsNewWg(true);
        // newWGInputRef.current?.focus();
    }

    function settingNewWg(name: string) {
        const newWg: WorkGroup = {
            id: -1,
            name : name ,
            status: WorkGroupStatus.Enable
        }
        setNewWg(newWg);
        
    }

    function addNewWg(): void {
        const i = workGroups?.findIndex(a=> a.id === -1);
        if(i > -1){
            workGroups[i] = newWg;
        }
        else{
            workGroups.push(newWg);
        }
        setIsNewWg(false);
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
                                {/* <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl> */}

                                {
                                    !isNewWg &&
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn(
                                                        "w-full justify-end",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value
                                                        ? workGroups.find(
                                                            (wg) => wg.name === field.name
                                                        )?.name
                                                        : "Select work group"}
                                                    <ChevronsUpDown className="opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-full p-0">
                                            <Command>
                                                <CommandInput
                                                    placeholder="Search work group."
                                                    className="h-9"
                                                />
                                                <CommandList>
                                                    <CommandEmpty>No work group found.</CommandEmpty>
                                                    <CommandGroup>
                                                        {workGroups.map((wg) => (
                                                            <CommandItem
                                                                value={wg.name}
                                                                key={wg.id}
                                                                onSelect={() => {
                                                                    form.setValue("workGroup", wg.id)
                                                                }}
                                                            >
                                                                {wg.id > 0 ?  wg.name : `(NEW) ${wg.name}`}
                                                                <Check
                                                                    className={cn(
                                                                        "ml-auto",
                                                                        wg.name === field.name
                                                                            ? "opacity-100"
                                                                            : "opacity-0"
                                                                    )}
                                                                />
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>

                                                    <CommandGroup >
                                                        <CommandItem
                                                            onSelect={() => {
                                                                preperAddNewWg()
                                                            }}
                                                        >
                                                            (ADD NEW)
                                                        </CommandItem>
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                }
                                {
                                    isNewWg &&
                                    <Input 
                                    ref={newWGInputRef}
                                    placeholder="New work group" 
                                    type="text" 
                                    className="w-full"
                                    onChange={(e)=> settingNewWg(e.target.value)}
                                    onBlur={(e)=> addNewWg()}
                                     />

                                }
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
