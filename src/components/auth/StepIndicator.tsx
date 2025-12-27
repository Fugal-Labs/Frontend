import clsx from "clsx";

export default function StepIndicator({ step }: { step: number }) {
  return (
    <div className="mb-4 flex justify-center gap-2">
      {[1, 2, 3].map((s) => (
        <span
          key={s}
          className={clsx(
            "h-2 w-2 rounded-full",
            step >= s ? "bg-primary-red" : "bg-white/20"
          )}
        />
      ))}
    </div>
  );
}
