const moneyMask = (value: string): number => {
  if (value.length === 0) return parseFloat("0.00");

  value = value.replace(".", "").replace(",", "").replace(/\D/g, "");

  const options = { minimumFractionDigits: 2 };
  let result = new Intl.NumberFormat("en-US", options).format(
    parseFloat(value) / 100
  );

  result = result.replaceAll(",", "");

  return parseFloat(result);
};

const formatBRL = (number: number): string => {
  number = parseFloat(number.toFixed(2));

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(number);
};

const formatBonus = (number: number): string => {
  number = parseFloat(number.toFixed(2));

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(number).replace("R$", "B$");
};

const formatCentsToBRL = (number: number | string): string => {
  if (typeof number === "string") {
    number = parseFloat(number);
  }

  number = parseFloat(number.toFixed(2)) / 100;

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(number);
};

export {
  moneyMask,
  formatBRL,
  formatBonus,
  formatCentsToBRL
}