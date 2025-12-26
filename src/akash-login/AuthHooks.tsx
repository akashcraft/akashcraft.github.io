import { useState } from "react";

export const useLoginSubmit = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [statusCode, setStatusCode] = useState<number>(0);

  const submitLoginForm = async (data: {
    name?: string;
    email?: string;
    password?: string;
  }) => {
    setIsSubmitting(true);
    setIsError(false);
    setIsSuccess(false);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
      throw new Error("Simulated login error");
      setIsSuccess(true);
      setStatusCode(200);
    } catch (error) {
      setIsError(true);
      setStatusCode(503);
      console.error("Login form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, isError, isSuccess, statusCode, submitLoginForm };
};
