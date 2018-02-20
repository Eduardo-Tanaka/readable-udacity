// mensagem de erro
const errorMessage = (campo) => {
  return `The field ${campo} is required`;
}

// validações dos campos do formulário
const validate = values => {
  const errors = {};
  if (!values.author) {
    errors.author = errorMessage('autor');
  }
  if (!values.title) {
    errors.title = errorMessage('title');
  }
  if (!values.body) {
    errors.body = errorMessage('message');
  }
  if (!values.category) {
    errors.category = errorMessage('category');
  }

  return errors
}

export default validate