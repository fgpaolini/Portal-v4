import type { AsyncDataRequestStatus } from '#app';
import { ref, watch } from 'vue';
import type { ToastMessageOptions } from 'primevue/toast';

enum STATUS {
	IDLE = 'idle',
	PENDING = 'pending',
	SUCCESS = 'success',
	ERROR = 'error'
}

export const useStatusTransformer = (status: Ref<AsyncDataRequestStatus>, delay?: number) => {
	const isLoading = ref(false);
	const isSuccess = ref(false);
	const isError = ref(false);

	watch(
		() => status.value,
		async (newStatus) => {
			if (newStatus === STATUS.PENDING) {
				isLoading.value = true;
			} else if (isLoading.value && delay) {
				// Si está cargando y se pasa a un nuevo estado, aplicamos el delay antes de poner isLoading en false
				await new Promise(resolve => setTimeout(resolve, delay));
				isLoading.value = false;
			} else {
				isLoading.value = false;
			}

			isSuccess.value = newStatus === STATUS.SUCCESS;
			isError.value = newStatus === STATUS.ERROR;
		},
		{ immediate: true }
	);

	return {
		isLoading,
		isSuccess,
		isError
	};
};


export const useFeedbackHelper = (status: Ref<AsyncDataRequestStatus>, options: { successMessage?: string, errorMessage?: string, summary?: string } = {}) : Ref<ToastMessageOptions> => {
    //const { isLoading, isSuccess, isError } = useStatusTransformer(status);

    const toastOptions = ref<ToastMessageOptions>({ severity: 'info', summary: '', detail: '' });

    watch(
        () => status.value,
        (newStatus) => {
            if (newStatus === 'success') {
                toastOptions.value = {
                    severity: 'success',
                    summary: options.summary ?? 'Success',
                    detail: options.successMessage ?? 'Request completed successfully.',
                    life: 3000
                };
            } else if (newStatus === 'error') {
                toastOptions.value = {
                    severity: 'error',
                    summary: options.summary ?? 'Error',
                    detail: options.errorMessage ?? 'An error occurred during the request.',
                    life: 3000
                };
            } else {
                toastOptions.value = { severity: 'info', summary: '', detail: '' };
            }
        },
        { immediate: true }
    );

    return toastOptions
};

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


/* 
export function unwrapValue<T>(value: T | Ref<T> | null | undefined): T {
	return (value && typeof value === 'object' && 'value' in value ? value.value : value) as T;
}
 */