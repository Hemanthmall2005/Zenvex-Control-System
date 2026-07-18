import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { 
  collection,
  getDocs,
  query, 
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export default function BookingsPage() {
  const [, setLocation] = useLocation();
  const [bookings, setBookings] = useState<any[]>([]);
  const [totalBookings, setTotalBookings] = useState(0);
  const [pendingBookings, setPendingBookings] = useState(0);
  const [completedBookings, setCompletedBookings] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLocation("/login");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
  async function loadBookings() {
    try {
      const q = query(
        collection(db, "bookings"),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);

      console.log("Docs Count:", snapshot.size);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log(data);

      setBookings(data);
      setBookings(data);

setTotalBookings(data.length);

setPendingBookings(
  data.filter((b: any) => b.status !== "Completed").length
);

setCompletedBookings(
  data.filter((b: any) => b.status === "Completed").length
);
    } catch (err) {
      console.error("Firestore Error:", err);
    }
  }

  loadBookings();
}, []);
  async function updateStatus(id: string) {
  await updateDoc(doc(db, "bookings", id), {
    status: "Completed",
  });

  const updatedBookings = bookings.map((booking) =>
    booking.id === id
      ? { ...booking, status: "Completed" }
      : booking
  );

  setBookings(updatedBookings);

  setTotalBookings(updatedBookings.length);

  setPendingBookings(
    updatedBookings.filter((b) => b.status !== "Completed").length
  );

  setCompletedBookings(
    updatedBookings.filter((b) => b.status === "Completed").length
  );
}

async function deleteBooking(id: string) {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this booking?"
  );

  if (!confirmDelete) return;

  await deleteDoc(doc(db, "bookings", id));

  setBookings((prev) => prev.filter((booking) => booking.id !== id));
}

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Customer Bookings</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

  <div className="bg-blue-600 text-white rounded-lg p-6 shadow-lg">
    <h2 className="text-lg font-semibold">Total Bookings</h2>
    <p className="text-3xl font-bold mt-2">{totalBookings}</p>
  </div>

  <div className="bg-yellow-500 text-white rounded-lg p-6 shadow-lg">
    <h2 className="text-lg font-semibold">Pending Bookings</h2>
    <p className="text-3xl font-bold mt-2">{pendingBookings}</p>
  </div>

  <div className="bg-green-600 text-white rounded-lg p-6 shadow-lg">
    <h2 className="text-lg font-semibold">Completed Bookings</h2>
    <p className="text-3xl font-bold mt-2">{completedBookings}</p>
  </div>

</div>

      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Service</th>
            <th className="border p-2">Address</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td className="border p-2">{booking.name}</td>
              <td className="border p-2">{booking.phone}</td>
              <td className="border p-2">{booking.email}</td>
              <td className="border p-2">{booking.serviceId}</td>
              <td className="border p-2">{booking.address}</td>
              <td className="border p-2">
                <button
                  className={`px-3 py-1 rounded text-white ${
                      booking.status === "Completed"
                          ? "bg-green-600"
                          : "bg-yellow-500"
                  }`}
                  onClick={() => updateStatus(booking.id)}
                            >
                            {booking.status || "Pending"}
                              </button>
                              </td>
                              <td className="border p-2">
                              <button
                                onClick={() => deleteBooking(booking.id)}
                                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                    >
                                Delete
                                  </button>
                                    </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}