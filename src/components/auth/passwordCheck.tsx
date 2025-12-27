const passwordRules = {
  length: (v: string) => v.length >= 8,
  lowercase: (v: string) => /[a-z]/.test(v),
  uppercase: (v: string) => /[A-Z]/.test(v),
  number: (v: string) => /\d/.test(v),
  special: (v: string) => /[^A-Za-z0-9]/.test(v),
};

export default function PasswordChecklist({ password }: { password: string }) {
  const rules = [
    { label: "At least 8 characters", valid: passwordRules.length(password) },
    { label: "Uppercase letter", valid: passwordRules.uppercase(password) },
    { label: "Lowercase letter", valid: passwordRules.lowercase(password) },
    { label: "Number", valid: passwordRules.number(password) },
    { label: "Special character", valid: passwordRules.special(password) },
  ];

  return (
    <ul className="mt-2 space-y-1 text-xs">
      {rules.map((rule) => (
        <li
          key={rule.label}
          className={`flex items-center gap-2 ${
            rule.valid ? "text-green-500" : "text-red-500"
          }`}
        >
          <span>{rule.valid ? "✔" : "✖"}</span>
          {rule.label}
        </li>
      ))}
    </ul>
  );
}
