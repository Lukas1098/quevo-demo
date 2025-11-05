"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { useEffect } from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Spinner } from "../ui/spinner"
import { gradeLevels, themes } from "@/data/validation"

const formSchema = z.object({
    gradeLevel: z.string().min(1, "Please select a grade level."),
    theme: z.string().min(1, "Please select a transdisciplinary theme."),
    descriptor: z.string().optional(),
    centralIdea: z
        .string()
        .min(20, "Central Idea must be at least 20 characters.")
        .max(500, "Please keep it under 500 characters."),
})

export type CentralIdeaFormData = z.infer<typeof formSchema>

interface CentralIdeaFormProps {
    onValidate: (data: CentralIdeaFormData) => void | Promise<void>;
    onQuickFix: (data: CentralIdeaFormData) => void | Promise<void>;
    isLoading?: boolean;
    rewrittenIdea?: string;
}

export function CentralIdeaForm({ onValidate, onQuickFix, isLoading = false, rewrittenIdea }: CentralIdeaFormProps) {
    const form = useForm<CentralIdeaFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            gradeLevel: "",
            theme: "",
            descriptor: "",
            centralIdea: "",
        },
    })

    useEffect(() => {
        if (rewrittenIdea && rewrittenIdea.trim().length > 0) {
            form.setValue("centralIdea", rewrittenIdea, { shouldValidate: true, shouldDirty: true });
        }
    }, [rewrittenIdea, form]);

    return (
        <Card className="flex flex-col w-full mt-10 justify-center">
            <CardHeader>
                <CardTitle>Central Idea Details</CardTitle>
                <CardDescription>
                    Enter your Central Idea details for IB PYP validation.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form id="central-idea-form" onSubmit={form.handleSubmit(onValidate)}>
                    <FieldGroup>
                        <Controller
                            name="gradeLevel"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="grade-level">
                                        Grade Level <span className="text-red-500">*</span>
                                    </FieldLabel>
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        disabled={isLoading}
                                    >
                                        <SelectTrigger id="grade-level" aria-invalid={fieldState.invalid}>
                                            <SelectValue placeholder="Select grade level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {gradeLevels.map((grade) => (
                                                <SelectItem key={grade} value={grade}>
                                                    {grade}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="theme"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="theme">
                                        Transdisciplinary Theme <span className="text-red-500">*</span>
                                    </FieldLabel>
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        disabled={isLoading}
                                    >
                                        <SelectTrigger id="theme" aria-invalid={fieldState.invalid}>
                                            <SelectValue placeholder="Select theme" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {themes.map((theme) => (
                                                <SelectItem key={theme} value={theme}>
                                                    {theme}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="descriptor"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="descriptor">
                                        Theme Descriptor <span className="text-gray-400 text-xs">(Optional)</span>
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="descriptor"
                                        placeholder="e.g., Exploring cultural identity through traditions"
                                        aria-invalid={fieldState.invalid}
                                        disabled={isLoading}
                                    />
                                    <FieldDescription>
                                        Helps AI understand the specific focus of your unit.
                                    </FieldDescription>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="centralIdea"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="central-idea">
                                        Central Idea <span className="text-red-500">*</span>
                                    </FieldLabel>
                                    <Textarea
                                        {...field}
                                        id="central-idea"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter your Central Idea here..."
                                        className="min-h-[120px]"
                                        disabled={isLoading}
                                    />
                                    <FieldDescription>
                                        {field.value.length} / 500 characters
                                    </FieldDescription>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter>
                <Field orientation="horizontal" className="flex-wrap gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => form.reset()}
                        disabled={isLoading}
                        className="flex-1 min-w-[100px]"
                    >
                        Reset
                    </Button>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={form.handleSubmit(onQuickFix)}
                        disabled={!form.formState.isValid || isLoading}
                        className="flex-1 min-w-[100px]"
                    >
                        {isLoading ? <Spinner/> : "Quick Fix"}
                    </Button>
                    <Button
                        type="submit"
                        form="central-idea-form"
                        disabled={!form.formState.isValid || isLoading}
                        className="flex-1 min-w-[100px] bg-foreground"
                    >
                        {isLoading ? <Spinner/> : "Validate Idea"}
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    )
}