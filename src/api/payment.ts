export async function proceedPayment({
  name,
  card,
}: {
  name: string
  card: string
}): Promise<string> {
  const res = await window.fetch('/api/payment/proceed', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, card }),
  })
  if (res.ok) {
    return res.json()
  } else {
    throw new Error('Oops')
  }
}
