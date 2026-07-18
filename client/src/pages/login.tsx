import { signInWithPopup, signInWithEmailAndPassword} from "firebase/auth";
import { auth, googleProvider, db } from "@/lib/firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, Shield } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";


const formSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export default function LoginPage() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

async function onSubmit(values: z.infer<typeof formSchema>) {
  setIsSubmitting(true);

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );

    const user = userCredential.user;

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
  const role = docSnap.data().role;

  if (role === "admin") {
    setLocation("/attendance-admin");
  } else if (role === "employee") {
    setLocation("/attendance");
  } else {
    setLocation("/home");
  }
}

  } catch (error) {
    toast({
      title: "Login Failed",
      description: "Invalid email or password",
      variant: "destructive",
    });
  } finally {
    setIsSubmitting(false);
  }
}
async function handleGoogleLogin() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      await setDoc(docRef, {
        email: user.email,
        role: "user",
      });

      setLocation("/");
      return;
    }

    const role = docSnap.data().role;

if (role === "admin") {
  setLocation("/attendance-admin");
} else if (role === "employee") {
  setLocation("/attendance");
} else {
  setLocation("/home");
}

  } catch (error) {
    console.error(error);
  }
}
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-slate-100">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 text-primary flex items-center justify-center bg-primary/10 rounded-full mb-4">
            <Shield size={32} />
          </div>
          <h2 className="text-3xl font-bold font-display text-slate-900">Zenvex Login</h2>
          <p className="mt-2 text-sm text-slate-600">Login as Customer,Employee or Admin.</p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl><Input placeholder="admin@zenvex.com" {...field} /></FormControl>
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
                  <FormControl><Input type="password" placeholder="admin" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : "Employee / Admin Login"}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full mt-3"
              onClick={handleGoogleLogin}
            >
              Customer Login with google
            </Button>
            <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
        Don't have an account?
      </p>

    <Button
    variant="link"
    onClick={() => setLocation("/signup")}
  >
    Create Customer Account
  </Button>
</div>
          </form>
        </Form>
      </div>
    </div>
  );
}
