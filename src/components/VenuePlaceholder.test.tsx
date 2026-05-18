import { render, screen } from "@testing-library/react";
import VenuePlaceholder from "./VenuePlaceholder";

describe("VenuePlaceholder", () => {
	it("renders deterministic initials from the first three words", () => {
		render(<VenuePlaceholder name="Birthplace of Country Music Museum" />);

		expect(screen.getByText("BOC")).toBeTruthy();
	});

	it("falls back to the major palette for unknown venue types", () => {
		const unknown = render(<VenuePlaceholder name="Paramount Bristol" type="mystery" />);
		const major = render(<VenuePlaceholder name="Paramount Bristol" type="major" />);

		expect(unknown.container.firstElementChild?.outerHTML).toBe(
			major.container.firstElementChild?.outerHTML,
		);
	});
});
