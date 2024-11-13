export const isEmptyOrSpecial = (str?: string): boolean => {
  return str?.trim() === "" || str?.trim() === "--";};


export const getInitials = (name: string, lastName?: string): string => {
  return lastName 
          ? `${name.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}` 
          :`${name.charAt(0).toUpperCase()}${name.charAt(1).toUpperCase()}`
};

export const isStringEmptyOrNull = (str: string | null | undefined): boolean => {
  return typeof str !== 'string' || str.trim() === '';
};