"use client";
import { changeUserRole } from "@/actions";
import { User } from "@/interfaces";
import Link from "next/link";
import React from "react";
import { IoCardOutline } from "react-icons/io5";

interface Props {
  users: User[];
}

export const UsersTable = ({ users }: Props) => {
  return (
    <div className="space-y-4 p-6">
      {users.map((user) => (
        <div
          key={user.id}
          className="bg-white shadow rounded-lg p-4 flex justify-between items-center"
        >
          <div>
            <div className="text-sm font-medium text-gray-900">
              {user.email}
            </div>
            <div className="text-sm text-gray-500">{user.name}</div>
          </div>
          <select
            value={user.role}
            onChange={(e) => changeUserRole(user.id, e.target.value)}
            className="border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 text-sm cursor-pointer"
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
      ))}
    </div>
  );
};
