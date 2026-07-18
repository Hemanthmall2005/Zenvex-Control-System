import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc,
        setDoc,
        serverTimestamp,
        collection,
        getDocs,
        } from "firebase/firestore";
export default function EmployeesPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secretKey, setSecretKey] = useState("");
    const [phone, setPhone] = useState("");
    const [open, setOpen] = useState(false);
async function createEmployee() {
    try {
    const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );

    const user = userCredential.user;

    const snapshot = await getDocs(collection(db, "employees"));

    const employeeCount = snapshot.size + 1;

    const employeeId = `ZEN-EMP-${employeeCount
    .toString()
    .padStart(3, "0")}`;
    await setDoc(doc(db, "employees", employeeId), {
    uid: user.uid,
    employeeId,
    name,
    email,
    phone,
    secretKey,
    role: "employee",
    createdAt: serverTimestamp(),
});
await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    employeeId,
    name,
    email,
    phone,
    secretKey,
    role: "employee",
    joiningDate: serverTimestamp(),
});

alert(
`Employee Created Successfully!

Employee ID: ${employeeId}

Secret Key: ${secretKey}`
);

setName("");
setEmail("");
setPhone("");
setPassword("");
setSecretKey("");
setOpen(false);
    } catch (error: any) {
    alert(error.message);
    console.error(error);
    }
}

    return (
    <div className="min-h-screen p-8">
        <h1 className="text-3xl font-bold">
        Employee Management
        </h1>

        <p className="text-gray-500 mt-2">
        Admin can create and manage employee accounts here.
        </p>

        <div className="mt-8 border rounded-lg p-6">
        <h2 className="text-xl font-semibold">
            Employees
        </h2>

        <Button onClick={() => setOpen(true)}>
        + Add Employee
        </Button>
            <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent>
    <DialogHeader>
    <DialogTitle>Add New Employee</DialogTitle>
    </DialogHeader>

    <div className="space-y-4">
        <input
    className="w-full border rounded-md p-2"
    placeholder="Employee Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
/>

        <input
    className="w-full border rounded-md p-2"
    placeholder="Employee Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
/>

<input
    className="w-full border rounded-md p-2"
    placeholder="Phone Number"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
/>
    
    <input
    type="password"
    className="w-full border rounded-md p-2"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
/>

<input
    className="w-full border rounded-md p-2"
    placeholder="Secret Key"
    value={secretKey}
    onChange={(e) => setSecretKey(e.target.value)}
/>
    <Button
    className="w-full"
    onClick={createEmployee}
>
    Create Employee
</Button>
    </div>
    </DialogContent>
</Dialog>
        <p className="text-gray-500 mt-2">
            No employees added yet.
        </p>
        </div>
    </div>
    );
}