import countries from "world-countries";

const formatedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  region: country.region,
  latlng: country.latlng,
}));

const useCountries = () => {
  const getAll = () => formatedCountries;
  const getByValue = (value: string) => {
    return formatedCountries.find((item) => item.value === value);
  };
  return {
    getAll,
    getByValue,
  };
};

export default useCountries;
