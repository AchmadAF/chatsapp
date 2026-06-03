import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  { ignores: ["app/generated/**", ".next/**", "node_modules/**", "prisma/seed.js"] },
  ...nextVitals,
  ...nextTypescript,
];

export default eslintConfig;
