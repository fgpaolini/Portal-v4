import { $fetch } from 'ofetch';
import Routes from "../routes.client";
// 3rd's
import type { FetchOptions } from 'ofetch';
import type { UseFetchOptions } from 'nuxt/app'
import type { AsyncDataOptions } from '#app';

// locals
import FetchFactory from '../factory';


class SipsModule extends FetchFactory {
	private readonly RESOURCE = Routes.Sips;

	async getCupsInfo_Fetch(cups: string): Promise<SipsInfo | null> {
		try {
			const fetchOptions: FetchOptions<'json'> = { headers: {} };
			console.log(cups);
			return this.call<SipsInfo>("GET", `${this.RESOURCE.GetCupsInfo(cups)}`, undefined, fetchOptions);
		} catch (error) {
			return null;
		}
	}

	async getCupsInfo_Fetch_2(cups: Ref<string>, fetchOptions?: FetchOptions<'json'>): Promise<SipsInfo | null> {
		return this.call<SipsInfo>(
			"GET",
			`${this.RESOURCE.GetCupsInfo(cups.value)}`,
			undefined,
			fetchOptions);
	}


	/**
   * Return SipsInfo
   * @param asyncDataOptions options for `useAsyncData`
   * @returns 
   */
	async getCupsInfo(
		cups: Ref<string>, asyncDataOptions?: AsyncDataOptions<SipsInfo>
	) {

		return useAsyncData('SipsInfo',
			() => {
				const fetchOptions: FetchOptions<'json'> = {
					headers: {}
				};
				return this.call<SipsInfo>(
					"GET",
					`${this.RESOURCE.GetCupsInfo(cups.value)}`,
					undefined,
					fetchOptions
				);
			},
			asyncDataOptions
		);
	}

	async getCupsInfoRAW(
		cups: Ref<string>, asyncDataOptions?: AsyncDataOptions<CupsInfoRAW>
	) {
		return useAsyncData('SipsInfoRAW',
			() => {
				return this.call<CupsInfoRAW>(
					"GET",
					`${this.RESOURCE.GetCupsInfoRAW(cups.value)}`,
					undefined,
				);
			},
			asyncDataOptions
		);
	}


	async getConsumoCups(
		cups: Ref<string>, asyncDataOptions?: AsyncDataOptions<ConsumoCups[]>
	) {

		return useAsyncData('ConsumoCups',
			() => {
				const fetchOptions: FetchOptions<'json'> = {
					headers: {}
				};
				return this.call<ConsumoCups[]>(
					"GET",
					`${this.RESOURCE.GetConsumoCups(cups.value)}`,
					undefined,
					fetchOptions
				); // Close the parentheses here
			},
			asyncDataOptions
		);
	}

	async exportSipsData(
		cups: Ref<string>,
		fetchOptions?: AsyncDataOptions<Blob>
	) {
		return useAsyncData(
			"ExportSips",
			() => {
				return this.call<Blob>(
					"GET",
					`${this.RESOURCE.ExportData(cups.value)}`,
					undefined,
				);
			},
			fetchOptions
		);
	}
}

export default SipsModule