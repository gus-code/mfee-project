export function shorten(str: string, maxLen: number) {
  if (str.length <= maxLen) return str;
  return `${str.substr(0, str.lastIndexOf(' ', maxLen))}...`;
}

function validateUrl(url: string) {
  const re = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
  return re.test(url);
}

export const validator = ({ name, value }: { name: string; value: string }) => {
  let error = '';
  if (!value) return (error = 'Please fill out this field.');

  switch (name) {
    case 'title':
      if (value.length < 5 || value.length > 25) error = 'The title must contain more than 5 and less than 25 characters.';
      break;

    case 'description':
      if (value.length < 20) error = 'The description must contain more than 20 characters.';
      break;

    case 'image':
      if (!validateUrl(value)) error = 'Please enter a valid URL.';
      break;

    default:
      break;
  }

  return error;
};
