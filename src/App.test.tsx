import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { type RobotType } from "./data/robots";

const mockRobots: RobotType[] = [
    {
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz",
    },
    {
        id: 2,
        name: "Ervin Howell",
        username: "Antonette",
        email: "Shanna@melissa.tv",
    },
    {
        id: 3,
        name: "Clementine Bauch",
        username: "Samantha",
        email: "Nathan@yesenia.net",
    },
];

describe("App Component", () => {
    beforeEach(() => {
        globalThis.fetch = vi.fn();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("fetches and sets robots list correctly from API", async () => {
        // Mock successful API response
        (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
            json: async () => mockRobots,
        });

        render(<App />);

        // Wait for the loading to complete and data to be fetched
        await waitFor(() => {
            expect(screen.queryByText("Is Loading...")).not.toBeInTheDocument();
        });

        // Verify that robots are rendered by checking for their names
        expect(screen.getByText("Leanne Graham")).toBeInTheDocument();
        expect(screen.getByText("Ervin Howell")).toBeInTheDocument();
        expect(screen.getByText("Clementine Bauch")).toBeInTheDocument();

        // Verify fetch was called with correct URL
        expect(globalThis.fetch).toHaveBeenCalledWith(
            "https://jsonplaceholder.typicode.com/users"
        );
        expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    });

    it("displays loading state when fetching robots", () => {
        // Mock API with a pending promise
        (globalThis.fetch as ReturnType<typeof vi.fn>).mockImplementation(
            () =>
                new Promise(() => {
                    // Never resolves to keep loading state
                })
        );

        render(<App />);

        // Verify loading message is displayed
        expect(screen.getByText("Is Loading...")).toBeInTheDocument();

        // Verify CardList is not rendered during loading
        expect(screen.queryByText("Leanne Graham")).not.toBeInTheDocument();
    });

    it('displays "No Robots Found" message when filtered list is empty', async () => {
        // Mock successful API response
        (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
            json: async () => mockRobots,
        });

        const user = userEvent.setup();
        render(<App />);

        // Wait for loading to complete
        await waitFor(() => {
            expect(screen.queryByText("Is Loading...")).not.toBeInTheDocument();
        });

        // Find search input and type a query that won't match any robot
        const searchInput = screen.getByRole("searchbox");
        await user.type(searchInput, "NonExistentRobotName");

        // Verify "No Robots Found" message is displayed
        expect(screen.getByText("No Robots Found")).toBeInTheDocument();

        // Verify CardList is not rendered
        expect(screen.queryByText("Leanne Graham")).not.toBeInTheDocument();
    });

    it("filters robots list based on search input", async () => {
        // Mock successful API response
        (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
            json: async () => mockRobots,
        });

        const user = userEvent.setup();
        render(<App />);

        // Wait for loading to complete
        await waitFor(() => {
            expect(screen.queryByText("Is Loading...")).not.toBeInTheDocument();
        });

        // Initially all robots should be visible
        expect(screen.getByText("Leanne Graham")).toBeInTheDocument();
        expect(screen.getByText("Ervin Howell")).toBeInTheDocument();
        expect(screen.getByText("Clementine Bauch")).toBeInTheDocument();

        // Search for "Leanne"
        const searchInput = screen.getByRole("searchbox");
        await user.type(searchInput, "Leanne");

        // Only Leanne Graham should be visible
        expect(screen.getByText("Leanne Graham")).toBeInTheDocument();
        expect(screen.queryByText("Ervin Howell")).not.toBeInTheDocument();
        expect(screen.queryByText("Clementine Bauch")).not.toBeInTheDocument();

        // Clear search and type "Clementine"
        await user.clear(searchInput);
        await user.type(searchInput, "Clementine");

        // Only Clementine Bauch should be visible
        expect(screen.queryByText("Leanne Graham")).not.toBeInTheDocument();
        expect(screen.queryByText("Ervin Howell")).not.toBeInTheDocument();
        expect(screen.getByText("Clementine Bauch")).toBeInTheDocument();
    });

    it("renders CardList with filtered robots when data is loaded", async () => {
        // Mock successful API response
        (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
            json: async () => mockRobots,
        });

        render(<App />);

        // Wait for loading to complete
        await waitFor(() => {
            expect(screen.queryByText("Is Loading...")).not.toBeInTheDocument();
        });

        // Verify CardList container is present by checking for the className
        const cardList = document.querySelector(".cardList");
        expect(cardList).toBeInTheDocument();

        // Verify all robot data is rendered
        mockRobots.forEach((robot) => {
            expect(screen.getByText(robot.name)).toBeInTheDocument();
            expect(screen.getByText(robot.email)).toBeInTheDocument();
        });

        // Verify loading and "No Robots Found" messages are not present
        expect(screen.queryByText("Is Loading...")).not.toBeInTheDocument();
        expect(screen.queryByText("No Robots Found")).not.toBeInTheDocument();
    });
});
