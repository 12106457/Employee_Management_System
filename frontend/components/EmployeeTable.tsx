'use client';

import React from 'react';
import { apiService } from '@/services/apiService';
import { renderAvatar } from '@/utils/imageHelpers';

interface Employee {
  id: string;
  fullName: string;
  gender: string;
  dob: string;
  state: string;
  active: boolean;
  profileImage?: string | null;
}

interface EmployeeTableProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
}

export default function EmployeeTable({ employees, onEdit, onDelete }: EmployeeTableProps) {
  const handleToggleActive = async (employee: Employee) => {
    try {
      await apiService.updateEmployee(employee.id, {
        ...employee,
        active: !employee.active
      });
      window.location.reload();
    } catch (error) {
      console.error('Error toggling active status:', error);
      alert('Failed to update employee status');
    }
  };

  const handlePrint = (employee: Employee) => {
    const printContent = `
      <html>
        <head>
          <title>${employee.fullName}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { font-size: 24px; font-weight: bold; margin-bottom: 20px; }
            .detail { margin: 10px 0; }
            .label { font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="header">Employee Information</div>
          <div class="detail"><span class="label">ID:</span> ${employee.id}</div>
          <div class="detail"><span class="label">Full Name:</span> ${employee.fullName}</div>
          <div class="detail"><span class="label">Gender:</span> ${employee.gender}</div>
          <div class="detail"><span class="label">Date of Birth:</span> ${employee.dob}</div>
          <div class="detail"><span class="label">State:</span> ${employee.state}</div>
          <div class="detail"><span class="label">Status:</span> ${employee.active ? 'Active' : 'Inactive'}</div>
        </body>
      </html>
    `;

    const newWindow = window.open('', '', 'width=800,height=600');
    if (newWindow) {
      newWindow.document.write(printContent);
      newWindow.document.close();
      newWindow.print();
    }
  };

  if (employees.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No employees found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 font-semibold">ID</th>
            <th className="px-6 py-3 font-semibold">Profile</th>
            <th className="px-6 py-3 font-semibold">Full Name</th>
            <th className="px-6 py-3 font-semibold">Gender</th>
            <th className="px-6 py-3 font-semibold">DOB</th>
            <th className="px-6 py-3 font-semibold">State</th>
            <th className="px-6 py-3 font-semibold">Status</th>
            <th className="px-6 py-3 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="px-6 py-3 text-xs text-gray-500 font-mono">
                {employee.id.slice(0, 8)}...
              </td>
              <td className="px-6 py-3">
                {(() => {
                  const avatar = renderAvatar(employee.profileImage, employee.fullName);
                  return avatar.isImage ? (
                    <img
                      src={avatar.content}
                      alt={employee.fullName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className={`w-10 h-10 rounded-full ${avatar.bgColor} flex items-center justify-center`}>
                      <span className="text-white font-bold text-xs">
                        {avatar.content}
                      </span>
                    </div>
                  );
                })()}
              </td>
              <td className="px-6 py-3 font-medium text-gray-900">
                {employee.fullName}
              </td>
              <td className="px-6 py-3">{employee.gender}</td>
              <td className="px-6 py-3">{employee.dob}</td>
              <td className="px-6 py-3">{employee.state}</td>
              <td className="px-6 py-3">
                <button
                  onClick={() => handleToggleActive(employee)}
                  className={`px-3 py-1 rounded text-sm font-medium text-white ${
                    employee.active
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  {employee.active ? 'Active' : 'Inactive'}
                </button>
              </td>
              <td className="px-6 py-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(employee)}
                    className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(employee.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handlePrint(employee)}
                    className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
                  >
                    Print
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
