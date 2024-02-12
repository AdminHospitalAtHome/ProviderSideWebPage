import {SetStateAction} from "react";

export function toggle(id: number, toggleExpanded: (id: number) => void, setExpandedId: React.Dispatch<SetStateAction<number | null>>): void {
  toggleExpanded(id);
  setExpandedId(prevExpandedId => (prevExpandedId === id ? null : id));
}

export function calculateAge(birthdateStr: string) {
  const birthdate = new Date(birthdateStr);
  const today = new Date();

  let age = today.getFullYear() - birthdate.getFullYear();
  const monthDifference = today.getMonth() - birthdate.getMonth();

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthdate.getDate())) {
    age--;
  }
  return age;
}

export function getColor(alertLevel: number): string {
  switch (alertLevel) {
    case -2:
      return 'blue';
    case -1:
      return 'gray';
    case 0:
      return 'green';
    case 1:
      return 'Gold';
    case 2:
      return 'red';
    default:
      return 'pink';
  }
}

