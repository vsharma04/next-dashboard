import React, { useEffect, useState } from 'react';
import { TableRowData } from '../ui/table/DataTable';

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: TableRowData | null;
  isEditMode: boolean;
  onSubmit: (data: TableRowData) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  isOpen,
  onClose,
  user,
  isEditMode,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<TableRowData>({
    id: 0,
    username: '',
    age: 0,
    email: '',
    phone: '',
    birthDate: '',
  });

  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (isEditMode && user) {
        setFormData(user);
      } else {
        setFormData({
          id: Date.now(),
          username: '',
          age: 0,
          email: '',
          phone: '',
          birthDate: '',
        });
      }
    }
  }, [isOpen, isEditMode, user]);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      setTimeout(() => setShouldRender(false), 300);
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'age' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-500 ease-out ${
        isVisible
          ? 'bg-black/40 backdrop-blur-sm'
          : 'bg-black/0 backdrop-blur-none'
      }`}
    >
      <div
        className={`relative rounded-2xl bg-white/10 backdrop-blur-xl p-8 shadow-2xl border border-white/20 w-[800px] text-white overflow-hidden transition-all duration-300 ease-out transform ${
          isVisible
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 -translate-y-4'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-2xl" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-6 text-white/90">
            {isEditMode ? 'Edit User' : 'Add User'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input type="hidden" name="id" value={formData.id} />

            <div>
              <label className="block mb-1 text-white/80">Username</label>
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white/90 focus:outline-none focus:ring-2 focus:ring-[#3FC3AC]/50"
              />
            </div>

            <div>
              <label className="block mb-1 text-white/80">Age</label>
              <input
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white/90 focus:outline-none focus:ring-2 focus:ring-[#3FC3AC]/50"
              />
            </div>

            <div>
              <label className="block mb-1 text-white/80">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white/90 focus:outline-none focus:ring-2 focus:ring-[#3FC3AC]/50"
              />
            </div>

            <div>
              <label className="block mb-1 text-white/80">Phone</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white/90 focus:outline-none focus:ring-2 focus:ring-[#3FC3AC]/50"
              />
            </div>

            <div>
              <label className="block mb-1 text-white/80">DOB</label>
              <input
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white/90 focus:outline-none focus:ring-2 focus:ring-[#3FC3AC]/50"
              />
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-white/15 hover:bg-white/25 text-white/90 rounded-lg font-medium transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/30 hover:shadow-lg hover:scale-105"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-[#3FC3AC]/80 hover:bg-[#3FC3AC] text-white rounded-lg font-medium transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/30 hover:shadow-lg hover:shadow-[#3FC3AC]/25 hover:scale-105"
              >
                {isEditMode ? 'Save Changes' : 'Add User'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
