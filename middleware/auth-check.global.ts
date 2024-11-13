// comprobar si la sesion ha expirado para redirigir al loginn
import { jwtDecode } from 'jwt-decode';

export default defineNuxtRouteMiddleware(async (to, from) => {
	// Excluir la página de login para evitar un bucle infinito
	if (to.path === '/auth/login') return;
	const auth = useAuth(); // Hook de Sidebase para acceder al estado de auth

	// Si no está autenticado, redirige a la página de login
	if (auth.status.value !== "authenticated") {
		return navigateTo('/auth/login');
	}
	// Si el token ha caducado, redirige al login
	if (tokenHasExpired(auth.token)) {
		await auth.signOut();
		return navigateTo('/auth/login');
	}
});

function tokenHasExpired(token: Readonly<globalThis.Ref<string | null>>) {
	if (!token.value) return true;

	const decodedToken = jwtDecode(token.value);

	if (decodedToken && decodedToken.exp) {		
		const expirationTime = decodedToken.exp * 1000; // exp viene en segundos, convertir a milisegundos
		return Date.now() >= expirationTime;
	}
	return true;
}