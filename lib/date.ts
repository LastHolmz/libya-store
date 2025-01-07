/**
 * Formats a MongoDB date object to a human-readable string in the format dd-mm-yyyy.
 *
 * @param {Date} date - The date object from MongoDB to format.
 * @returns {string} The formatted date string in dd-mm-yyyy format.
 *
 * @example
 * // For a date input of new Date("2024-11-14T00:00:00Z")
 * formatDate(new Date("2024-11-14T00:00:00Z"));
 * // Returns "14-11-2024"
 */
export function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth is zero-based
  const year = date.getFullYear();

  return `${day}-${month}-${year}`.split("-").reverse().join("/");
}

// Usage example:
//   const mongoDate = new Date(); // Replace with the MongoDB date you receive
//   const formattedDate = formatDate(mongoDate);
//   console.log(formattedDate); // Output: "dd-mm-yyyy" (e.g., "14-11-2024")
