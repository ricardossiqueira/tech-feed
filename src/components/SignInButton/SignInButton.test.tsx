import { render, screen } from "@testing-library/react";
import { SessionContextValue, useSession } from "next-auth/react";
import { mocked } from "jest-mock";
import { SignInButton } from ".";

jest.mock("next-auth/react");

describe("SignInButton component", () => {
  it("renders properly when unauthenticated", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    });

    render(<SignInButton />);
    expect(screen.getByText("Entrar com Github")).toBeInTheDocument();
  });

  it("renders properly when authenticated", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: {
        expires: "",
        user: { name: "John Doe" },
      },
      status: "authenticated",
    } as SessionContextValue);

    render(<SignInButton />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });
});
