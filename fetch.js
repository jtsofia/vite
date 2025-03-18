/**
 * Fetches JSON data from APIs
 *
 * @param {string} url - api endpoint url
 * @param {Object} options - request options
 *
 * @returns {Object} response json data
 */
const fetchData = async(url,options={})=>{
  let jsonData;
  try {
      const response = await fetch(url, options);
      console.log(url, options)
      console.log(response)
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} - ${response.statusText}`);
      }

      jsonData = await response.json();
  } catch (error) {
      console.error('fetchData() error', error);
      jsonData = {};
  }
  return jsonData;
};


export { fetchData };