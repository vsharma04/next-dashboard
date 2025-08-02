'use client';
import { useEffect, useState } from 'react';
import useDebounce from '@/components/utils/useDebounce';
import DataTable, { TableRowData } from '@/components/ui/table/DataTable';
import Pagination from '@/components/ui/table/Pagination';
import { fetchUsers, fetchUserBySearchQuery } from '@/components/utils/api';
import EditUserModal from '@/components/common/EditUserModal';
import {toast} from 'react-toastify'

const columns = [
  'Id',
  'UserName',
  'Age',
  'Email',
  'Phone',
  'DOB',
  'Actions',
] as const;

export default function DashboardPage() {
  const [users, setUsers] = useState<TableRowData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<TableRowData | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const pageSize = 5;

  const fetchPaginatedUsers = async () => {
    const skip = (currentPage - 1) * pageSize;
    const res = await fetchUsers({ limit: pageSize, skip });
    setUsers(res.users);
    setTotalUsers(res.total);
  };

  const fetchSearchedUsers = async () => {
    const res = await fetchUserBySearchQuery(debouncedSearchQuery);
    const data = res.users ?? [];

    setTotalUsers(data.length);
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    const paginated = data.slice(start, end);

    setUsers(paginated);
  };

  useEffect(() => {
    if (debouncedSearchQuery.trim() !== '') {
      fetchSearchedUsers();
    } else {
      fetchPaginatedUsers();
    }
  }, [debouncedSearchQuery, currentPage]);

  const totalPages = Math.ceil(totalUsers / pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="pt-[60px] h-full">
      <div className="relative bg-white px-6 pt-4 h-full rounded-lg">
        <div className="absolute -top-[50px] flex gap-3 items-center border-b-4 pb-5 border-[#3FC3AC] max-w-max">
          <span className="text-lg font-medium text-[#2D2E34]">
            Appeal Letter
          </span>
          <span className="bg-[#F28372] px-3 rounded-full text-white">05</span>
        </div>

        <div className="max-h-full flex flex-col gap-5">
          <form className="flex justify-end gap-3">
            <button
              className="bg-[#3FC3AC]/80 transition-all ease-in text-white px-5 rounded-lg hover:bg-[#3FC3AC]/90 flex items-center gap-1"
              type="button"
              onClick={() => {
                setSelectedUser(null);
                setIsEditMode(false);
                setIsModalOpen(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 5v14M5 12h14"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>{' '}
              Add User
            </button>
            <div className="relative">
              <span className="absolute -translate-y-1/2 left-4 top-1/2 pointer-events-none">
                <svg
                  className="fill-gray-500 dark:fill-gray-400"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                    fill=""
                  />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search by Username"
                className="h-11 w-full rounded-lg border bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-sm placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10"
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </form>

          <DataTable columns={columns} data={users} setData={setUsers} />
          <EditUserModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            user={selectedUser}
            isEditMode={isEditMode}
            onSubmit={(data) => {
              if (isEditMode) {
              } else {
                setUsers((prev) => [...prev, { ...data, id: Date.now() }]);
                toast.success('User created successfully');
                setTotalUsers((prev) => prev + 1);
              }

              setIsModalOpen(false);
            }}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
