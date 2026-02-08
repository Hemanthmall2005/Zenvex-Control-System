import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "@/lib/mock-api";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, Clock, UserCheck } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  employeeId: z.string().min(3, "Employee ID is required"),
  pin: z.string().min(4, "PIN must be 4 digits"),
});

export default function AttendancePage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastAction, setLastAction] = useState<"in" | "out" | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { employeeId: "", pin: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>, action: "in" | "out") {
    setIsSubmitting(true);
    try {
      await api.submitAttendance({ ...values, action, timestamp: new Date().toISOString() });
      setLastAction(action);
      toast({ 
        title: action === "in" ? "Checked In" : "Checked Out", 
        description: `Successfully recorded time at ${new Date().toLocaleTimeString()}` 
      });
      form.reset();
    } catch (error) {
      toast({ title: "Error", description: "Invalid ID or PIN", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
            <Clock size={32} />
          </div>
          <h2 className="text-2xl font-bold font-display text-slate-900">Staff Attendance</h2>
          <p className="text-slate-500">Enter your ID and PIN to mark attendance.</p>
        </div>

        <Form {...form}>
          <form className="space-y-6">
            <FormField
              control={form.control}
              name="employeeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employee ID</FormLabel>
                  <FormControl><Input placeholder="EMP-001" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Secret PIN</FormLabel>
                  <FormControl><Input type="password" placeholder="****" maxLength={4} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <Button 
                type="button" 
                onClick={form.handleSubmit((v) => onSubmit(v, "in"))}
                disabled={isSubmitting}
                className="bg-green-600 hover:bg-green-700 h-12 text-lg"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : "Check In"}
              </Button>
              <Button 
                type="button" 
                onClick={form.handleSubmit((v) => onSubmit(v, "out"))}
                disabled={isSubmitting}
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 h-12 text-lg"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : "Check Out"}
              </Button>
            </div>
          </form>
        </Form>

        {lastAction && (
          <div className="mt-8 p-4 bg-slate-50 rounded-lg flex items-center gap-3 text-slate-600 animate-in fade-in slide-in-from-bottom-2">
            <UserCheck className="text-green-600" />
            <span>
              Last action: <span className="font-bold">{lastAction === "in" ? "Check In" : "Check Out"}</span> recorded.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
