'use client';

import { createCompany, updateCompany } from '../form-actions';
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from "@/components/ui/input";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from '@/components/ui/button';
import { companyCreateFormSchema } from '../zodSchemas';
import { useActionState } from 'react';
import { Company } from '../interfaces';
import { CompanyDraftForm } from '../forms/company-draft-form';

export default function CreateCompanyPage() {
    let company: Company | null = null;

    return (
        <CompanyDraftForm company={company} />
    )
}



