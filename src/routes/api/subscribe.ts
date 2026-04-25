import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { subscribeToNewsletter } from "../../db/queries";
import { getDbBinding } from "../../lib/db-binding";

const subscribePayloadSchema = z.object({
	email: z.string().email(),
	name: z.string().trim().min(1).optional(),
});

export const Route = createFileRoute("/api/subscribe")({
	server: {
		handlers: {
			POST: async ({ context, request }) => {
				try {
					const body = await request.json();
					const parsed = subscribePayloadSchema.safeParse(body);

					if (!parsed.success) {
						return Response.json({ error: "Invalid email" }, { status: 400 });
					}

					const result = await subscribeToNewsletter(
						getDbBinding({ context }),
						parsed.data.email,
						parsed.data.name,
					);

					return Response.json(result);
				} catch (error) {
					if (error instanceof Error && error.message === "Trail not found") {
						return Response.json({ error: error.message }, { status: 500 });
					}

					return Response.json({ error: "Server error" }, { status: 500 });
				}
			},
		},
	},
});
