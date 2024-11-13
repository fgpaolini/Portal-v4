import type { AsyncDataOptions } from "#app";
import FetchFactory from "../factory";
import Routes from "../routes.client";


class ValidatorsModule extends FetchFactory {
    private readonly RESOURCE = Routes.Validators;

    async validateIBAN(
        iban: Ref<string>,
        fetchOptions?: AsyncDataOptions<IBANValidationResult>
    )
    {
        const asyncData = await useAsyncData(
            "IBANValidation",
            () => {
                return this.call<IBANValidationResult>(
                    "GET",
                    `${this.RESOURCE.IBAN(iban.value)}`,
                    undefined
                );
            },
            fetchOptions
        );

        const statusFeedback = useStatusTransformer(asyncData.status, 500);
        return { ...asyncData, ...statusFeedback };
    }

    async validateNIF(
        NIF: Ref<string>,
        fetchOptions?: AsyncDataOptions<NIFValidationResult>
    )
    {
        const asyncData = await useAsyncData(
            "NIFValidation",
            () => {

                return this.call<NIFValidationResult>(
                    "GET",
                    `${this.RESOURCE.NIF(NIF.value)}`,
                    undefined
                );
            },
            fetchOptions
        );

        const statusFeedback = useStatusTransformer(asyncData.status, 500);
        return { ...asyncData, ...statusFeedback };
    }

    async validateCUPS(
        CUPS: Ref<string>,
        fetchOptions?: AsyncDataOptions<boolean>
    )
    {
        const asyncData = await useAsyncData(
            "CUPSValidation",
            () => {

                return this.call<boolean>(
                    "GET",
                    `${this.RESOURCE.CUPS(CUPS.value)}`,
                    undefined
                );
            },
            fetchOptions
        );

        const statusFeedback = useStatusTransformer(asyncData.status, 500);
        return { ...asyncData, ...statusFeedback };
    }

}

export default ValidatorsModule;