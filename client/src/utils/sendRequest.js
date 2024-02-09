const sendRequest = async ({ ...req }) => {
  try {
    const response = await fetch(req.url, { method: req.method || 'GET' });
    if (!response.ok) {
      throw new Error(`Status code: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err.message);
    return undefined;
  }
};

export default sendRequest;
