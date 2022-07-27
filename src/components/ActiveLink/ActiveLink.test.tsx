import { render, screen } from "@testing-library/react";
import { ActiveLink } from ".";

jest.mock("next/router", () => {
  return {
    useRouter() {
      return {
        asPath: "/",
      };
    },
  };
});

describe("ActiveLink component", () => {
  it("renders properly", () => {
    render(
      <ActiveLink activeClassName="active" href="/">
        <a>Início</a>
      </ActiveLink>
    );
    expect(screen.getByText("Início")).toBeInTheDocument();
  });

  it("receives active class", () => {
    render(
      <ActiveLink activeClassName="active" href="/">
        <a>Início</a>
      </ActiveLink>
    );
    expect(screen.getByText("Início")).toHaveClass("active");
  });
});
