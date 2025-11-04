import "@testing-library/jest-dom";

Object.defineProperty(global, "alert", { value: jest.fn(), writable: true });
Object.defineProperty(global, "confirm", { value: jest.fn(), writable: true });
