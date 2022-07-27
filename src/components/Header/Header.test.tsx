import { render, screen } from "@testing-library/react";
import { SessionContextValue } from "next-auth/react";
import { Header } from ".";

jest.mock("next/router", () => {
  return {
    useRouter() {
      return {
        asPath: "/",
      };
    },
  };
});

jest.mock("next-auth/react", () => {
  return {
    useSession(): SessionContextValue {
      return { data: null, status: "unauthenticated" };
    },
  };
});

describe("Header component", () => {
  it("renders properly", () => {
    render(<Header />);
    expect(screen.getByText("Início")).toBeInTheDocument();
    expect(screen.getByText("Posts")).toBeInTheDocument();
  });
});
