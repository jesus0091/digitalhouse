import { Minus, Plus } from "tabler-icons-react";

type Props = { value: number; onChange: (v: number) => void };

export default function QuantityInput({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-2">
      <button
        className="grid place-content-center bg-gray-100 h-8 w-8 rounded active:bg-gray-200 cursor-pointer"
        onClick={() => onChange(Math.max(1, value - 1))}
      >
        <Minus className="w-4" />
      </button>
      <span className="w-6 text-center font-medium">{value}</span>
      <button
        className="grid place-content-center bg-gray-100 h-8 w-8 rounded active:bg-gray-200 cursor-pointer"
        onClick={() => onChange(value + 1)}
      >
        <Plus className="w-4" />
      </button>
    </div>
  );
}
