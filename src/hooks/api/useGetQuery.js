import { useQuery } from "@tanstack/react-query";
import { request } from "@/services/api";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

const useGetQuery = ({
  key = "get-all",
  url = "/",
  params = {},
  headers = {},
  showSuccessMsg = false,
  showErrorMsg = false,
  enabled = true,
}) => {
  const { t } = useTranslation(); // Ensure translations work here

  const { isLoading, isError, data, error, isFetching } = useQuery(
    [key, params],
    () =>
      request.get(url, {
        params,
        headers,
      }),
    {
      keepPreviousData: true,
      onSuccess: () => {
        if (showSuccessMsg) {
          toast.success(t("SUCCESS"));
        }
      },
      onError: (error) => {
        if (showErrorMsg) {
          const errorMessage = error?.response?.data?.message || t("ERROR");
          toast.error(errorMessage);
        }
      },
      enabled,
    }
  );

  return {
    isLoading,
    isError,
    data,
    error,
    isFetching,
  };
};

export default useGetQuery;
