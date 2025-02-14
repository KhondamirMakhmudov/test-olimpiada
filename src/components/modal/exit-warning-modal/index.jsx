import React from "react";

const ExitWarningModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
        <h2 className="text-lg font-semibold">Diqqat!</h2>
        <p className="mt-2">
          Agar sahifani tark etsangiz, quiz yopiladi va ochkoingiz 0 bo‘ladi.
        </p>
        <div className="mt-4 flex justify-between">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md"
            onClick={onConfirm}
          >
            Sahifani tark etish
          </button>
          <button
            className="px-4 py-2 bg-gray-300 rounded-md"
            onClick={onCancel}
          >
            Bekor qilish
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExitWarningModal;
