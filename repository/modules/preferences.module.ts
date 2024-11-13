import type { AsyncDataOptions } from "#app";
import FetchFactory from "../factory";
import Routes from "../routes.client";

class PreferencesModule extends FetchFactory {
    private readonly RESOURCE = Routes.Preferences;
    

    async getPreferences(
        fetchOptions?: AsyncDataOptions<ApplicationPreference<any>[]>
    ) {
        return useAsyncData(
            "Preferencias",
            () => {
            return this.call<ApplicationPreference<any>[]>(
                "GET",
                `${this.RESOURCE.GetUserPreferences()}`,
                undefined
            );
            },
            fetchOptions
        );
    }

    async savePreference(preferencia: ComputedRef<ApplicationPreference<LayoutConfig>>,
        fetchOptions?: AsyncDataOptions<ApplicationPreference<LayoutConfig>>
    ) {
        return useAsyncData(
            "Save_Preference",
            () => {
            return this.call<ApplicationPreference<LayoutConfig>>(
                "POST",
                `${this.RESOURCE.PostUserPreferences()}`,
                preferencia.value
            );
            },
            fetchOptions
        );
    }
}

export default PreferencesModule