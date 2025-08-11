import { toast } from "sonner";

export const useToast = () => {
    const showSuccess = (message: string) => {
        toast.success(message, {
            className: "!bg-green-transparent !text-green-accent",
        });
    };

    const showError = (message: string) => {
        toast.error(message, {
            className: "!bg-red-transparent !text-red-accent",
        });
    };

    const showInfo = (message: string) => {
        toast.info(message, {
            className: "!bg-yellow-transparent !text-yellow-accent",
        });
    };

    return { showSuccess, showError, showInfo };
};
