function formatDate(timestamp) {
    // Extract the date part from the timestamp string
    const datePart = timestamp.split('T')[0];
    const [year, month, day] = datePart.split('-');
    
    // Format the date as dd-mm-yyyy
    return `${day}-${month}-${year}`;
  };

// Get current date in "yyyy-mm-dd" -format
function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 because January is 0-indexed
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}  

  export { formatDate, getCurrentDate };