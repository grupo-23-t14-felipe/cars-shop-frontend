export const calcDatePost = (date: string) => {
  let dateComment = new Date(date).getTime();
  let dateNow = new Date().getTime();
  let diff = dateNow - dateComment;
  let days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days > 730) {
    return `há ${Math.floor(days / 365)} anos`;
  } else if (days > 365) {
    return "há 1 ano";
  } else if (days > 60) {
    return `há ${Math.floor(days / 30)} meses`;
  } else if (days > 30) {
    return "há 1 mês";
  } else if (days === 0) {
    return "hoje";
  } else if (days === 1) {
    return `há ${days} dia`;
  } else {
    return `há ${days} dias`;
  }
};
