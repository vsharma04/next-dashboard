import React, { useState } from 'react';
import DeleteConfirmModal from '@/components/common/DeleteConfirmModal';
import { toast } from 'react-toastify';
import EditUserModal from '@/components/common/EditUserModal';

export interface TableRowData {
  id: number;
  username: string;
  age: number;
  email: string;
  phone: string;
  birthDate: string;
}

interface TableProps {
  columns: readonly [
    'Id',
    'UserName',
    'Age',
    'Email',
    'Phone',
    'DOB',
    'Actions'
  ];
  data: TableRowData[];
  onEdit?: (row: TableRowData) => void;
  setData?: React.Dispatch<React.SetStateAction<TableRowData[]>>;
}

export default function DataTable({
  columns,
  data,
  // onEdit,
  setData,
}: TableProps) {
  const [selectedRow, setSelectedRow] = useState<TableRowData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUser, setEditUser] = useState<TableRowData | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleEditClick = (row: TableRowData) => {
    setEditUser(row);
    setEditModalOpen(true);
  };

  const handleUpdateUser = (updatedUser: TableRowData) => {
    const updatedList = data.map((u) =>
      u.id === updatedUser.id ? updatedUser : u
    );
    setData?.(updatedList);
    setEditModalOpen(false);
    toast.success('User updated successfully');
  };

  const handleDeleteClick = (row: TableRowData) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedRow) {
      const users = data.filter((user) => user.id !== selectedRow.id);
      setData?.(users);
      toast.success('User deleted successfully');
      setSelectedRow(null);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <div className="overflow-hidden bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto border">
          {data && data.length > 0 ? (
            <div className="min-w-[900px] max-h-[350px] overflow-auto custom-scrollbar">
              <table className="w-full border-collapse">
                <thead className="bg-[#ECF3F9]">
                  <tr>
                    {columns.map((col) => (
                      <th
                        key={col}
                        className="px-5 py-3 sticky top-0 z-1 bg-[#ECF3F9] text-left text-sm font-medium text-gray-500 dark:bg-white/[0.03] dark:text-gray-400"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05] overflow-y-scroll">
                  {data.map((row) => (
                    <tr key={row.id}>
                      <td className="px-6 py-5 text-left text-sm text-gray-700 dark:text-gray-300">
                        {row.id}
                      </td>
                      <td className="px-6 py-5 text-left text-sm text-gray-700 dark:text-gray-300">
                        {row.username}
                      </td>
                      <td className="px-6 py-5 text-left text-sm text-gray-700 dark:text-gray-300">
                        {row.age}
                      </td>
                      <td className="px-6 py-5 text-left text-sm text-gray-700 dark:text-gray-300">
                        {row.email}
                      </td>
                      <td className="px-6 py-5 text-left text-sm text-gray-700 dark:text-gray-300">
                        {row.phone}
                      </td>
                      <td className="px-6 py-5 text-left text-sm text-gray-700 dark:text-gray-300">
                        {row.birthDate}
                      </td>
                      <td className="px-6 py-5 text-left text-sm text-gray-700 dark:text-gray-300">
                        <div className="flex gap-2">
                          <button
                            className="text-blue-600 hover:underline hover:text-blue-800"
                            onClick={() => handleEditClick(row)}
                          >
                            Edit
                          </button>
                          <button
                            className="text-red-600 hover:underline hover:text-red-800"
                            onClick={() => handleDeleteClick(row)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-5 text-center text-gray-600 dark:text-gray-300">
              Loading ...
            </div>
          )}
        </div>
      </div>
      <DeleteConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        userId={selectedRow?.id}
      />
      <EditUserModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        user={editUser}
        isEditMode={true}
        onSubmit={handleUpdateUser}
      />
    </>
  );
}
