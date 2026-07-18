import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "@/lib/mock-api";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, Clock, UserCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection,
          addDoc,
          serverTimestamp,
          query,
          where,
          getDocs,
          updateDoc,
          orderBy,
          onSnapshot,
          } from "firebase/firestore";

const formSchema = z.object({
  employeeId: z.string().min(3, "Employee ID is required"),
  pin: z.string().min(4, "PIN must be 4 digits"),
});

export default function AttendancePage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastAction, setLastAction] = useState<"in" | "out" | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [presentCount, setPresentCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);
  const [location, setLocation] = useState({
  latitude: 0,
  longitude: 0,
});

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { employeeId: "", pin: "" },
  });
  useEffect(() => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    },
    (error) => {
      console.log(error);
    }
  );
}, []);

useEffect(() => {
  const employeeId = form.watch("employeeId");

  if (!employeeId) return;

  const q = query(
    collection(db, "attendance"),
    where("employeeId", "==", employeeId),
    orderBy("checkInTime", "desc")
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  setHistory(data);

  const today = new Date().toDateString();
  const uniqueEmployees = new Set();

  data.forEach((item: any) => {
    if (
      item.checkInTime &&
      item.checkInTime.toDate().toDateString() === today
    ) {
      uniqueEmployees.add(item.employeeId);
    }
  });

  setPresentCount(uniqueEmployees.size);

  // Temporary
  setAbsentCount(0);
});
  return () => unsubscribe();
}, [form.watch("employeeId")]);

  async function onSubmit(values: z.infer<typeof formSchema>, action: "in" | "out") {
    setIsSubmitting(true);
    try {
      const q = query(
  collection(db, "employees"),
  where("employeeId", "==", values.employeeId),
  where("secretKey", "==", values.pin)
);

const employee = await getDocs(q);

if (employee.empty) {
  throw new Error("Invalid Employee ID or Secret Key");
}
      await api.submitAttendance({ ...values, action, timestamp: new Date().toISOString() });
    if (action === "in") {
  await addDoc(collection(db, "attendance"), {
    employeeId: values.employeeId,
    latitude: location.latitude,
    longitude: location.longitude,
    checkInTime: serverTimestamp(),
    checkOutTime: null,
    status: "Checked In",
  });
} else {
  const q = query(
    collection(db, "attendance"),
    where("employeeId", "==", values.employeeId),
    where("status", "==", "Checked In")
  );

  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    const attendanceDoc = snapshot.docs[0];

    await updateDoc(attendanceDoc.ref, {
      checkOutTime: serverTimestamp(),
      status: "Checked Out",
      checkOutLatitude: location.latitude,
      checkOutLongitude: location.longitude,
    });
  } else {
    throw new Error("No active Check In found");
  }
}
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
        <div className="grid grid-cols-2 gap-4 mb-6">
  <div className="border rounded-lg p-4 bg-green-50">
    <h3 className="text-green-700 font-semibold">
      Present
    </h3>

    <p className="text-3xl font-bold">
      {presentCount}
    </p>
  </div>

  <div className="border rounded-lg p-4 bg-red-50">
    <h3 className="text-red-700 font-semibold">
      Absent
    </h3>

    <p className="text-3xl font-bold">
      {absentCount}
    </p>
  </div>
</div>
        <div className="mt-8">
  <h3 className="text-lg font-bold mb-3">Attendance History</h3>

  {history.length === 0 ? (
    <p className="text-gray-500">No attendance records found.</p>
  ) : (
    <div className="space-y-3">
      {history.map((item: any) => (
        <div
          key={item.id}
          className="border rounded-lg p-3"
        >
          <p>
            <strong>Status:</strong> {item.status}
          </p>

          <p>
            <strong>Check In:</strong>{" "}
            {item.checkInTime?.toDate().toLocaleString()}
          </p>

          {item.latitude && item.longitude && (
  <Button
    variant="outline"
    className="mt-2"
    onClick={() =>
      window.open(
        `https://www.google.com/maps?q=${item.latitude},${item.longitude}`,
        "_blank"
      )
    }
  >
    📍 View Check-In Location
  </Button>
)}
          <p>
            <strong>Check Out:</strong>{" "}
            {item.checkOutTime
              ? item.checkOutTime.toDate().toLocaleString()
              : "--"}
          </p>
          {item.checkOutLatitude && item.checkOutLongitude && (
  <Button
    variant="outline"
    className="mt-2"
    onClick={() =>
      window.open(
        `https://www.google.com/maps?q=${item.checkOutLatitude},${item.checkOutLongitude}`,
        "_blank"
      )
    }
  >
    📍 View Check-Out Location
  </Button>
)}
        </div>
      ))}
    </div>
  )}
</div>
      </div>
    </div>
  );
}
