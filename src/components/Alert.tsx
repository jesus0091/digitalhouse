export default function Alert({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-red-300 bg-red-50 p-3 text-red-800">
      {children}
    </div>
  );
}
