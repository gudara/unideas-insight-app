'use client'
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, Form } from "@/components/ui/form";
import { Company } from "@/lib/interfaces/company-interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React, { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { get, useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Division } from "@/lib/interfaces/division-interfaces";
import { divisionCreateFormSchema } from "../../zodSchemas";
import { createDivision, updateDivision } from "./form-actions";

type Props = {
    company?: Company | null;
    division?: Division | null;
};
type StateType = {
    data?: Division;
    errors?: any[];
    error?: string
};

export const DivisionDraftForm: React.FC<Props> = ({ company, division }) => {
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<z.infer<typeof divisionCreateFormSchema>>({
        resolver: zodResolver(divisionCreateFormSchema),
        defaultValues: {
            name: "",
            contactPersonName: "",
            address: "",
            contactNumber: "",
            contactEmail: "",
        }
    });

    const [state, dispatch, isPending] = useActionState(
        async (previous: undefined | StateType , payload: FormData) => {
            let result;
            if (!!company) {
                console.log("-------------------------------", previous?.data)
                if (!!previous?.data?.id) {
                    result = await updateDivision(company, previous.data.id, payload)
                }
                else {
                    result = await createDivision(company, payload)
                }

                if (!result.error && !result.errors) {
                    toast({
                        title: "Done",
                        description: "Successfully Saved.",
                    });
                    router.push(`/admin/companies/${result.data.companyId}`);
                }
            }
            else {
                toast({
                    title: "Error",
                    description: "Company is missing",
                    variant: "destructive"
                });
            }
            return result;
        }, { data: division }
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
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is public display name of the company.
                                </FormDescription>
                                <FormMessage>
                                    {state?.errors?.name && <span>{state.errors.name}</span>}
                                </FormMessage>

                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="contactPersonName"
                        defaultValue={state?.data?.contactPersonName}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Contact persion Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormDescription>
                                    A person, who can quickly contact for.
                                </FormDescription>
                                <FormMessage>
                                    {state?.errors?.contactPersonName && <span>{state.errors.contactPersonName}</span>}
                                </FormMessage>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="address"
                        defaultValue={state?.data?.address}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage>
                                    {state?.errors?.address && <span>{state.errors.address}</span>}
                                </FormMessage>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="contactNumber"
                        defaultValue={state?.data?.contactNumber}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Contact number</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage>
                                    {state?.errors?.contactNumber && <span>{state.errors.contactNumber}</span>}
                                </FormMessage>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="contactEmail"
                        defaultValue={state?.data?.contactEmail}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>E-mail</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Notify about new relese and other information regarding to the company.
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

