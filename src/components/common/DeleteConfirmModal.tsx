import React, { useEffect, useState } from 'react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userId?: number;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  userId,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      setTimeout(() => setShouldRender(false), 300);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ease-out ${
        isVisible
          ? 'bg-black/40 backdrop-blur-sm'
          : 'bg-black/0 backdrop-blur-none'
      }`}
    >
      <div
        className={`relative rounded-2xl bg-white/10 backdrop-blur-xl p-8 shadow-2xl border border-white/20 w-[500px] text-white overflow-hidden transition-all duration-300 ease-out transform ${
          isVisible
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 -translate-y-4'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-2xl" />

        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-6 text-white/90">
            Confirm Delete
          </h2>
          <p className="text-white/80 leading-relaxed text-base mb-8">
            Are you sure you want to delete the user with ID{' '}
            <strong className="text-white font-semibold">{userId}</strong>?
            <br />
            <span className="text-sm text-white/60 mt-2 block">
              This action cannot be undone.
            </span>
          </p>

          <div className="flex justify-end gap-4">
            <button
              className="px-6 py-3 bg-white/15 hover:bg-white/25 text-white/90 rounded-lg font-medium transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/30 hover:shadow-lg hover:scale-105"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-6 py-3 bg-[#3FC3AC]/80 hover:bg-[#3FC3AC] text-white rounded-lg font-medium transition-all duration-200 backdrop-blur-sm border border-red-400/30 hover:border-red-400/50 hover:shadow-lg hover:shadow-[#3FC3AC]/25 hover:scale-105"
              onClick={onConfirm}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
