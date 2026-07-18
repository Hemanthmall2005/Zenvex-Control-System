import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Loader2, UserPlus } from "lucide-react";
import { useState } from "react";

const formSchema = z
    .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
    });
    export default function SignupPage() {
    const { toast } = useToast();
    const [, setLocation] = useLocation();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    defaultValues: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    },
        });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("Button clicked");
        console.log(values);


    setIsSubmitting(true);
    try {
    const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
    );

    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
        name: values.name,
        email: values.email,
        role: "user",
        createdAt: serverTimestamp(),
    });

    toast({
        title: "Account Created",
        description: "Your account has been created successfully.",
    });

    setLocation("/");
    }catch (error: any) {
    console.error(error);

    toast({
    title: "Signup Failed",
    description: error.code + " - " + error.message,
    variant: "destructive",
    });

    } finally {
    setIsSubmitting(false);
    }
}
    return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-slate-100">

    <div className="text-center">
        <div className="mx-auto h-12 w-12 text-primary flex items-center justify-center bg-primary/10 rounded-full mb-4">
        <UserPlus size={32} />
        </div>

        <h2 className="text-3xl font-bold font-display text-slate-900">
        Create Customer Account
        </h2>

        <p className="mt-2 text-sm text-slate-600">
        Create your account to book pest control services.
        </p>
    </div>

    <Form {...form}>
        <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
        >
            <FormField
    control={form.control}
    name="name"
    render={({ field }) => (
    <FormItem>
        <FormLabel>Full Name</FormLabel>
        <FormControl>
        <Input placeholder="Enter your full name" {...field} />
        </FormControl>
        <FormMessage />
    </FormItem>
    )}
/>

        <FormField
        control={form.control}
        name="email"
    render={({ field }) => (
    <FormItem>
        <FormLabel>Email Address</FormLabel>
        <FormControl>
        <Input
            type="email"
            placeholder="Enter your email"
            {...field}
        />
        </FormControl>
        <FormMessage />
    </FormItem>
    )}
/>
<FormField
    control={form.control}
    name="password"
    render={({ field }) => (
    <FormItem>
        <FormLabel>Password</FormLabel>
        <FormControl>
        <Input
            type="password"
            placeholder="Enter your password"
            {...field}
        />
        </FormControl>
        <FormMessage />
    </FormItem>
    )}
/>
<FormField
    control={form.control}
    name="confirmPassword"
    render={({ field }) => (
    <FormItem>
        <FormLabel>Confirm Password</FormLabel>
        <FormControl>
        <Input
        type="password"
        placeholder="Enter your confirm password"
        {...field}
        />
            </FormControl>
        <FormMessage />
    </FormItem>
    )}
/>
<Button
    type="submit"
    className="w-full"
    disabled={isSubmitting}
>
    {isSubmitting ? (
    <Loader2 className="animate-spin mr-2" />
    ) : (
    "Create Account"
    )}
</Button>

<div className="text-center text-sm text-slate-600">
    Already have an account?{" "}
    <button
    type="button"
    onClick={() => setLocation("/")}
    className="text-primary font-semibold hover:underline"
    >
    Login
    </button>
</div>
        </form>
    </Form>

    </div>
</div>
    );
}