import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, Form } from "@/components/ui/form";
import { Company } from "../interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { updateCompany, createCompany } from "./form-actions";
import { companyCreateFormSchema } from "../zodSchemas";
import React, { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

type Props = {
    company?: Company | null;
};
type StateType = {
    data?: Company;
    errors?: any[];
    error?: string
};

export const CompanyDraftForm: React.FC<Props> = ({ company }) => {
    const { toast } = useToast()

    const form = useForm<z.infer<typeof companyCreateFormSchema>>({
        resolver: zodResolver(companyCreateFormSchema),
        defaultValues: {
            name: "",
            contactPersonName: "",
            contactNumber: "",
            contactEmail: "",
        }
    });

    let [state, dispatch, isPending] = useActionState(
        async (previous: undefined | StateType, payload: FormData) => {
            let result;
            toast({
                title: "Successfully Save",
                description: "Company has created.",
            })
            if (!!previous?.data?.id) {
                result = await updateCompany(previous.data.id, payload)
            }
            else {
                result = await createCompany(payload)
            }
            return result;
        }, { data: company });

    const action = async (formData: FormData) => {
        dispatch(formData);
        //tost will be implement on this
        toast({
            title: "Done",
            description: "Successfully Saved.",
        })
    }

    return (
        <>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mt-4">
                {state?.data && `Update Company: ${state?.data?.name}`}
                {!state?.data && `Create New Company`}
            </h4>

            <Form  {...form}>
                <form action={action} className="space-y-2">
                    <FormField
                        control={form.control}
                        name="name"
                        defaultValue={state?.data?.name}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Company Name</FormLabel>
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
                        name="contactNumber"
                        defaultValue={state?.data?.contactNumber}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Contact persions' contact number</FormLabel>
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
