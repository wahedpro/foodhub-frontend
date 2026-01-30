"use client";

import { useEffect, useState } from "react";
import { getAllUsers, updateUserStatus } from "@/src/services/admin.user.service";
import { User } from "@/src/types/user";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleStatus = async (user: User) => {
    try {
      setUpdatingId(user.id);
      await updateUserStatus(user.id, !user.isActive);
      fetchUsers();
    } catch (error) {
      console.error(error);
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-gray-500">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Manage Users</h1>
        <p className="text-sm text-gray-500 mt-1">
          View all users and manage their access
        </p>
      </div>

      {/* Empty state */}
      {users.length === 0 ? (
        <div className="rounded border bg-white p-6 text-center text-gray-500">
          No users found.
        </div>
      ) : (
        <div className="overflow-x-auto rounded border bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t">
                  {/* Name */}
                  <td className="px-4 py-3 font-medium">
                    {user.name}
                  </td>

                  {/* Email */}
                  <td className="px-4 py-3 text-gray-600">
                    {user.email}
                  </td>

                  {/* Role */}
                  <td className="px-4 py-3">
                    <span
                      className={`rounded px-2 py-1 text-xs font-medium ${
                        user.role === "ADMIN"
                          ? "bg-purple-100 text-purple-700"
                          : user.role === "PROVIDER"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <span
                      className={`rounded px-2 py-1 text-xs font-medium ${
                        user.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.isActive ? "ACTIVE" : "SUSPENDED"}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="px-4 py-3 text-right">
                    <button
                      disabled={updatingId === user.id}
                      onClick={() => toggleStatus(user)}
                      className={`rounded border px-3 py-1 text-xs transition ${
                        user.isActive
                          ? "border-red-300 text-red-600 hover:bg-red-50"
                          : "border-green-300 text-green-600 hover:bg-green-50"
                      }`}
                    >
                      {updatingId === user.id
                        ? "Updating..."
                        : user.isActive
                        ? "Suspend"
                        : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
