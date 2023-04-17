export default function replaceStringTemplate(key, value, string) {
  const regex = new RegExp(`{${key}}`);

  return string.replace(regex, value);
}
