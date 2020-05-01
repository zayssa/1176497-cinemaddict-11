export const formatDate = (date) => {
  const months = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];
  let result = `0${date.getDay()}`.slice(-2);
  result += ` ${months[date.getMonth()]}`;
  result += ` ${date.getFullYear()}`;

  return result;
};
