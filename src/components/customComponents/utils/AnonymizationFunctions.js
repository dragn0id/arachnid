function filterNumericData(data) {
  if (data.length === 0) return [];

  // Get keys from the first object
  const keys = Object.keys(data[0]);

  // Determine which keys have string values in the first object
  const stringKeys = keys.filter((key) => typeof data[0][key] === "string");

  // Return a new array of objects, excluding the keys with string values
  return data.map((item) => {
    const newItem = { ...item };
    stringKeys.forEach((key) => delete newItem[key]);
    return newItem;
  });
}

function perturbNumericData(data) {
  // First, filter out non-numeric data
  const filteredData = filterNumericData(data);

  // Then, perturb the numeric data, ignoring the 'id' column
  return filteredData.map((item) => {
    const perturbedItem = { ...item };
    Object.keys(perturbedItem).forEach((key) => {
      if (key !== "id" && typeof perturbedItem[key] === "number") {
        // Perturb the numeric value, for example, by adding a random value between -5 and 5
        perturbedItem[key] += (Math.random() - 0.5) * 10;
      }
    });
    return perturbedItem;
  });
}

export { filterNumericData, perturbNumericData };
