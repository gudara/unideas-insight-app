import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, Form } from "@/components/ui/form";
import { Company } from "../../../../lib/interfaces/company-interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { updateCompany, createCompany } from "./form-actions";
import { companyCreateFormSchema } from "../zodSchemas";
import React, { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

type Props = {
    company?: Company | null;
};
type StateType = {
    data?: Company;
    errors?: any[];
    error?: string
};

export const CompanyDraftForm: React.FC<Props> = ({ company }) => {
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<z.infer<typeof companyCreateFormSchema>>({
        resolver: zodResolver(companyCreateFormSchema),
        defaultValues: {
            name: "",
            contactPersonName: "",
            contactNumber: "",
            contactEmail: "",
        }
    });

    const [state, dispatch, isPending] = useActionState(
        async (previous: undefined | StateType, payload: FormData) => {
            let result;
            if (!!previous?.data?.id) {
                result = await updateCompany(previous.data.id, payload)
            }
            else {
                result = await createCompany(payload)
            }
            if (!result.error && !result.errors) {
                toast({
                    title: "Done",
                    description: "Successfully Saved.",
                });
                router.push(`/admin/companies/${result.data.id}`);
            }
            return result;
        }, { data: company }
    );

    const action = async (formData: FormData) => {
        dispatch(formData);

    }

    return (
        <>

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
