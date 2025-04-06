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

export function parseDateWithArabicMonth(input?: Date | string | null): string {
  // Handle null/undefined
  if (input === null || input === undefined) {
    return "لا يوجد تاريخ";
  }

  let date: Date;

  // If input is a string (dd/mm/yyyy), parse it into a Date
  if (typeof input === "string") {
    const [day, month, year] = input.split("/").map(Number);

    // Validate the date parts
    if (
      isNaN(day) ||
      isNaN(month) ||
      isNaN(year) ||
      month < 1 ||
      month > 12 ||
      day < 1 ||
      day > 31
    ) {
      return "";
    }

    // Note: Months are 0-indexed in JavaScript Date (0 = January)
    date = new Date(year, month - 1, day);
  }
  // If already a Date, use it directly
  else if (input instanceof Date) {
    date = input;
  }
  // Invalid case (fallback)
  else {
    return "";
  }

  // Check if the Date is invalid
  if (isNaN(date.getTime())) {
    return "";
  }

  // Arabic month names (1-12 = يناير-ديسمبر)
  const arabicMonths = [
    "يناير",
    "فبراير",
    "مارس",
    "أبريل",
    "مايو",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth(); // 0-11
  const year = date.getFullYear();

  // Format: "day ArabicMonth year" (e.g., "25 ديسمبر 2023")
  return `${day} ${arabicMonths[monthIndex]} ${year}`;
}

// // **Examples:**
// console.log(parseDateWithArabicMonth("25/12/2023")); // "25 ديسمبر 2023"
// console.log(parseDateWithArabicMonth(new Date(2023, 11, 25))); // "25 ديسمبر 2023"
// console.log(parseDateWithArabicMonth(null)); // ""
// console.log(parseDateWithArabicMonth(undefined)); // ""
// console.log(parseDateWithArabicMonth("invalid")); // ""
