import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

export default function AttendanceAdmin() {
  const [attendance, setAttendance] = useState<any[]>([]);
  const [search, setSearch]=useState("");
  const [presentDays, setPresentDays] = useState(0);
  const [absentDays, setAbsentDays] = useState(0);
  const [joiningDate, setJoiningDate] = useState<Date | null>(null);

  useEffect(() => {
    async function loadAttendance() {
      const q = query(
        collection(db, "attendance"),
        orderBy("checkInTime", "desc")
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAttendance(data);
    }

    loadAttendance();
  }, []);

  useEffect(() => {
  async function loadEmployee() {
    if (!search) return;

    const employeeId = `ZEN-EMP-${search.padStart(3, "0")}`;

    const employeeRef = doc(db, "employees", employeeId);
    const employeeSnap = await getDoc(employeeRef);

    if (employeeSnap.exists()) {
      const data = employeeSnap.data();

      if (data.createdAt) {
        setJoiningDate(data.createdAt.toDate());
      }
    }
  }

  loadEmployee();
}, [search]);
  const filteredAttendance = attendance.filter((item) =>
  item.employeeId?.toLowerCase().includes(search.toLowerCase())
);

const uniqueDays = new Set<string>();

filteredAttendance.forEach((item: any) => {
  if (item.checkInTime) {
    uniqueDays.add(
      item.checkInTime.toDate().toLocaleDateString()
    );
  }
});

const present = uniqueDays.size;

let absent = 0;

if (joiningDate) {
  const today = new Date();

  let workingDays = 0;

  const startDate = new Date(joiningDate);
  const endDate = new Date(today);

  while (startDate <= endDate) {
    // Sunday = 0
    if (startDate.getDay() !== 0) {
      workingDays++;
    }

    startDate.setDate(startDate.getDate() + 1);
  }

  absent = Math.max(0, workingDays - present);
}
useEffect(() => {
  setPresentDays(present);
  setAbsentDays(absent);
}, [search, attendance]);
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Employee Attendance
      </h1>
      <Input
  placeholder="Search Employee ID..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="mb-6"
/>
    {search && (
  <div className="grid grid-cols-2 gap-4 mb-6">

    <div className="bg-green-100 p-4 rounded-lg shadow">
      <h2 className="text-green-700 font-semibold">
        Present Days
      </h2>

      <p className="text-3xl font-bold">
        {present}
      </p>
    </div>

    <div className="bg-red-100 p-4 rounded-lg shadow">
      <h2 className="text-red-700 font-semibold">
        Absent Days
      </h2>

      <p className="text-3xl font-bold">
        {absent}
      </p>
    </div>

  </div>
)}
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Employee ID</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Check In</th>
            <th className="border p-2">Check Out</th>
            <th className="border p-2">Check In Map</th>
            <th className="border p-2">Check Out Map</th>
          </tr>
        </thead>

        <tbody>
          {filteredAttendance.map((item) => (
            <tr key={item.id}>
              <td className="border p-2">
  {item.employeeId}
</td>

<td className="border p-2">
  {item.status}
</td>

<td className="border p-2">
  {item.checkInTime?.toDate?.().toLocaleString() || "-"}
</td>

<td className="border p-2">
  {item.checkOutTime?.toDate?.().toLocaleString() || "-"}
</td>

<td className="border p-2">
  {item.latitude && item.longitude ? (
    <Button
      size="sm"
      onClick={() =>
        window.open(
          `https://www.google.com/maps?q=${item.latitude},${item.longitude}`,
          "_blank"
        )
      }
    >
      📍 View Map
    </Button>
  ) : (
    "-"
  )}
</td>

<td className="border p-2">
  {item.checkOutLatitude && item.checkOutLongitude ? (
    <Button
      size="sm"
      onClick={() =>
        window.open(
          `https://www.google.com/maps?q=${item.checkOutLatitude},${item.checkOutLongitude}`,
          "_blank"
        )
      }
    >
      📍 View Map
    </Button>
  ) : (
    "-"
  )}
</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}