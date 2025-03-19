export const NAME_REGEX = /^[a-zA-ZàâäéèêëîïôöùûüÿçÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇ\s'-]+$/g;
export const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/g;
export const PHONE_REGEX = /^(\+33|0)[1-9](?:[ .-]?\d{2}){4}$/g;
export const SIRET_REGEX = /^\d{14}$/g;
