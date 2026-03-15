import { type ReactNode } from "react";

export default function AuthContainer({ children }: { children: ReactNode }) {
  return (
    <div className="bg-gradient-to-r from-indigo-500/10 from-10% via-sky-500/10 via-30% to-emerald-500/10 to-90% border-1 border-gray-700 rounded-xl max-w-[400px] w-[300px]  p-4">
      {children}
    </div>
  );
}
