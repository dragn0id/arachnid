function filterNumericData(data) {
  console.log("filterNumericData");
  if (data.length === 0) return [];

  // Get keys from the first object
  const keys = Object.keys(data[0]);

  // Determine which keys have string values or are null in the first object
  const excludedKeys = keys.filter(
    (key) => typeof data[0][key] === "string" || data[0][key] === null
  );

  // Return a new array of objects, excluding the keys with string values or null
  return data.map((item) => {
    const newItem = { ...item };
    excludedKeys.forEach((key) => delete newItem[key]);
    return newItem;
  });
}

function FindAndExtractNumericData(data) {
  console.log("FindAndExtractNumericData");
  // Adjusted regular expression to match numbers, including those with decimal points
  const numberPattern = /\d+(\.\d+)?/g;
  // Regular expression to check if the first character is a number, a currency symbol, or a decimal point
  const startsWithNumberOrCurrency = /^[0-9$₹.]/;

  return data.map((item) => {
    const modifiedItem = { ...item };
    Object.keys(item).forEach((key) => {
      const value = item[key];
      const valueAsString = String(value);
      // Check if the first character is a number, a currency symbol, or a decimal point
      if (startsWithNumberOrCurrency.test(valueAsString)) {
        // Extract numbers, preserving decimal points
        const extractedNumbers = valueAsString.match(numberPattern)?.join("");
        // Replace the original value with the extracted number, converting it to a number type
        // This time, correctly handling decimal numbers
        if (extractedNumbers !== undefined && !isNaN(extractedNumbers)) {
          modifiedItem[key] = parseFloat(extractedNumbers);
        }
      }
    });
    return modifiedItem;
  });
}

function perturbNumericData(data) {
  // First, filter out non-numeric data
  const filteredData = FindAndExtractNumericData(data);
  console.log("filteredData", filteredData);
  console.log("perturbNumericData");
  // Then, perturb the numeric data, ignoring the 'id' column
  return filteredData.map((item) => {
    const perturbedItem = { ...item };
    Object.keys(perturbedItem).forEach((key) => {
      if (key !== "id" && typeof perturbedItem[key] === "number") {
        const order = Math.pow(
          10,
          Math.floor(Math.log10(Math.abs(perturbedItem[key])))
        );
        const perturbation = (Math.random() * 2 - 1) * order;
        perturbedItem[key] += perturbation;
        console.log("perturbedItem[key]", perturbation);
      }
    });
    return perturbedItem;
  });
}

function multiplicativeNoise(data) {
  const filteredData = filterNumericData(data);
  return filteredData.map((item) => {
    const perturbedItem = { ...item };
    Object.keys(perturbedItem).forEach((key) => {
      if (key !== "id" && typeof perturbedItem[key] === "number") {
        perturbedItem[key] *= Math.random() * 2 - 1;
      }
    });
    return perturbedItem;
  });
}

export {
  filterNumericData,
  perturbNumericData,
  multiplicativeNoise,
  FindAndExtractNumericData,
};
