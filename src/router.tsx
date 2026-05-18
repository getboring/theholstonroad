import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import ErrorPage from "./components/ErrorPage";
import LoadingSpinner from "./components/LoadingSpinner";
import NotFoundPage from "./components/NotFoundPage";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
	const router = createTanStackRouter({
		routeTree,
		scrollRestoration: true,
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0,
		defaultPendingComponent: LoadingSpinner,
		defaultNotFoundComponent: NotFoundPage,
		defaultErrorComponent: ({ error }) => <ErrorPage error={error as Error} />,
	});

	return router;
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof getRouter>;
	}
}
