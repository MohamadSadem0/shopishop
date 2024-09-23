// src/config/rolesConfig.js

export const rolesConfig = {
    superadmin: {
      routes: ["/dashboard"],
      limitations: [],
    },
    merchant: {
      routes: ["/dashboard"],
      limitations: [],
    },
    customer: {
      routes: ["/profile"],
      limitations: ["Cannot access dashboard"],
    },
    guest: {
      routes: ["/"],
      limitations: ["Cannot access protected pages"],
    },
  };
  