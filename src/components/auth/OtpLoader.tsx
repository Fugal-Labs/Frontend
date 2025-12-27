export default function OtpLoader() {
  return (
    <div className="flex flex-col items-center justify-center py-10 space-y-4">
      {/* Lively spinner with pulse and faster spin */}
      <div className="relative flex items-center justify-center h-14 w-14">
        <span className="absolute inline-flex h-full w-full rounded-full bg-primary-red opacity-30 animate-ping"></span>
        <span
          className="relative inline-flex h-10 w-10 rounded-full border-4 border-primary-red border-t-transparent animate-spin"
          style={{ animationDuration: "0.7s" }}
        ></span>
      </div>
      <p className="text-sm text-secondary">Sending verification code…</p>
      {/* Bouncing dots animation */}
      <div className="flex space-x-1 mt-2" aria-label="Loading">
        <span className="block h-2 w-2 rounded-full bg-primary-red animate-bounce [animation-delay:0s]"></span>
        <span className="block h-2 w-2 rounded-full bg-primary-red animate-bounce [animation-delay:0.15s]"></span>
        <span className="block h-2 w-2 rounded-full bg-primary-red animate-bounce [animation-delay:0.3s]"></span>
      </div>
    </div>
  );
}
