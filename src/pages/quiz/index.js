import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function QuizPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingRoute, setPendingRoute] = useState(null);

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (!isModalOpen) {
        setPendingRoute(url);
        setIsModalOpen(true);
        return false; // Routerni to'xtatish
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [isModalOpen]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "Agar sahifani tark etsangiz, quiz yopiladi!";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // Foydalanuvchi chiqishga rozi bo'lsa
  const confirmExit = () => {
    setIsModalOpen(false);
    if (pendingRoute) {
      router.events.emit("routeChangeComplete", pendingRoute); // Router hodisasi qo‘shamiz
      router.push(pendingRoute);
    }
  };

  // Bekor qilish
  const cancelExit = () => {
    setIsModalOpen(false);
    setPendingRoute(null);
  };

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold">Quiz Test</h1>
      <p>Bu yerda quiz savollari bo‘ladi...</p>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <p className="text-lg font-semibold">
              Agar sahifani tark etsangiz, quiz yopiladi va ochkongiz 0 bo'ladi!
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={cancelExit}
                className="mr-2 px-4 py-2 bg-gray-300 rounded"
              >
                Bekor qilish
              </button>
              <button
                onClick={confirmExit}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Chiqish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
