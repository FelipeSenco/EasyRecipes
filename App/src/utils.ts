export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const testErrorMessage = "test error message";
export const onErrorLogger = (error: Error) => {
  error.message !== testErrorMessage && console.log(error);
};
