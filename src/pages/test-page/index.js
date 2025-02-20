import { useState, useEffect } from "react";

const QuizPage = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setShowModal(true); // Show modal when tab is switched
      }
    };

    const handleBlur = () => {
      setShowModal(true); // Show modal when user leaves the window
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Quiz Page</h1>
      <p className="mt-2">Solve the problems carefully.</p>

      {/* Custom Modal for Cheating Warning */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold text-red-600">Warning!</h2>
            <p className="mt-2">
              Switching tabs is not allowed. Stay on this page!
            </p>
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
              Okay, I Understand
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
