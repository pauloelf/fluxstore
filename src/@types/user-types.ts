export type User = {
  id: number
  firstName: string
  lastName: string
  gender: string
  email: string
  phone: string
  username: string
  password: string
  image: string
  address: {
    address: string
    city: string
    postalCode: string
    state: string
    country: string
  }
  bank: {
    cardExpire: string
    cardNumber: string
    cardType: string
    currency: string
    iban: string
  }
}
