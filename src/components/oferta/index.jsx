import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function UserAgreement() {
  const { t, i18n } = useTranslation();
  const [isChecked, setIsChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrolledToEnd, setIsScrolledToEnd] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.onload = () => {
        const iframeDocument =
          iframe.contentDocument || iframe.contentWindow.document;
        iframeDocument.onscroll = () => {
          const { scrollTop, scrollHeight, clientHeight } =
            iframeDocument.documentElement;
          if (scrollTop + clientHeight >= scrollHeight - 5) {
            setIsScrolledToEnd(true);
          }
        };
      };
    }
  }, []);

  const handleAgree = () => {
    setIsChecked(true);
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => setIsModalOpen(true)}
        className="w-5 h-5 cursor-pointer accent-blue-500"
      />
      <label
        className="cursor-pointer text-sm my-[10px]"
        onClick={() => setIsModalOpen(true)}
      >
        {t("oferta")}
      </label>

      {/* Custom Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center w-full justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl shadow-lg w-[1200px]">
            <h2 className="text-lg font-semibold mb-4">{t("contract")}</h2>

            {/* Scrollable PDF */}
            <div className="h-[500px] overflow-y-auto border relative">
              {i18n.language === "uz" ? (
                <iframe
                  ref={iframeRef}
                  src="/files/oferta_uz.pdf#toolbar=0&navpanes=0&scrollbar=0"
                  type="application/pdf"
                  className="w-full h-full"
                />
              ) : (
                <iframe
                  ref={iframeRef}
                  src="/files/oferta_ru.pdf#toolbar=0&navpanes=0&scrollbar=0"
                  type="application/pdf"
                  className="w-full h-full"
                />
              )}
            </div>

            {/* Buttons */}
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                {t("cancel")}
              </button>
              <button
                onClick={handleAgree}
                className={`px-4 py-2 bg-blue-500 text-white rounded `}
              >
                {t("submit")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
