import { fireEvent, render, screen } from "@testing-library/react";

import QuantityInput from "@/components/QuantityInput";

describe("QuantityInput", () => {
  it("renders initial value", () => {
    render(<QuantityInput value={3} onChange={() => {}} />);
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("increments the value when clicking the + button", () => {
    const handleChange = jest.fn();
    render(<QuantityInput value={3} onChange={handleChange} />);
    const plusButton = screen.getAllByRole("button")[1];
    fireEvent.click(plusButton);
    expect(handleChange).toHaveBeenCalledWith(4);
  });

  it("decrements the value when clicking the - button", () => {
    const handleChange = jest.fn();
    render(<QuantityInput value={3} onChange={handleChange} />);
    const minusButton = screen.getAllByRole("button")[0];
    fireEvent.click(minusButton);
    expect(handleChange).toHaveBeenCalledWith(2);
  });

  it("does not decrement below 1", () => {
    const handleChange = jest.fn();
    render(<QuantityInput value={1} onChange={handleChange} />);
    const minusButton = screen.getAllByRole("button")[0];
    fireEvent.click(minusButton);
    expect(handleChange).toHaveBeenCalledWith(1);
  });
});
