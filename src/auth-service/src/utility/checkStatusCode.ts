//Author Erik Priemer

export default function checkStatusCode(statusCode: number): void {
  switch (statusCode) {
    case 401:
      throw new Error('one');
    default:
      throw new Error('whatever');
  }
}
