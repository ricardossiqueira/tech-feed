import { render, screen } from "@testing-library/react";
import Home from "../../pages";

jest.mock("next-auth/react", () => {
  return {
    useSession() {
      return {
        data: null,
        status: "unauthenticated",
      };
    },
  };
});

describe("Home page", () => {
  it("renders properly", () => {
    render(
      <Home product={{ amount: "fake-amount", priceId: "fake-price-id" }} />
    );
    expect(screen.getByText("fake-amount")).toBeInTheDocument();
  });
});
