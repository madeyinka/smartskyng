const validationMessages = {
  'name': {
    'required': 'name is required'
  },
  'lastname': {
    'required': 'Last name is required'
  },
  'email': {
    'required': 'Email is required'
  },
  'organisation': {
    'required': 'Organisation name is required'
  },
  'phone': {
    'required': 'Phone number is required'
  },
  'password': {
    'required': 'Password is required',
    'minLength': 'Must be atleast 6 characters',
    'invalidPassword': 'Password must contain atleast one Uppercase, Lowercase and number and mininum 8 characters'
  },
  'c_password': {
    'required': 'Password is required',
    'passwordMismatch': 'Password does not match'
  },
  'address': {
    'required': 'Address is required'
  }
}

export { validationMessages }
