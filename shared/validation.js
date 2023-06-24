function isValidImageLink(link) {
    const urlPattern = /^(http|https):\/\/[^ "]+$/;
    return urlPattern.test(link);
  }
  
function isValidNumber(number) {
    return !isNaN(number);
  }