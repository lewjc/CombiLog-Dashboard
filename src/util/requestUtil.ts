export function handleGenericNon200Code(response: Response) {
  switch (response.status) {
    case 404: {
      return "Not found";
    }
  }
}
