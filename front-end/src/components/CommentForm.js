import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { 
  Button, ModalBody, ModalFooter, Form
} from 'reactstrap';
import { MdPerson, MdDescription } from 'react-icons/lib/md'
import PropTypes from 'prop-types'

import renderField from '../utils/renderField'
import validate from '../validations/validatePost'

// formulário de adição de novos comentários
let CommentForm = (props) => {
  const { pristine, submitting, valid } = props
  return (
    <Form onSubmit={props.handleSubmit}>
      <ModalBody>
        <Field label="Autor" name="author" type="text" component={renderField}
          icon={<MdPerson />} />
        <Field label="Message" name="body" type="textarea" component={renderField} 
          icon={<MdDescription />} />
      </ModalBody>
      <ModalFooter>
        <Button color="primary" disabled={pristine || submitting || !valid}>Comment</Button>
      </ModalFooter>
    </Form>
  )
}

CommentForm.propTypes = {
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  valid: PropTypes.bool,
  handleSubmit: PropTypes.func
}

CommentForm = reduxForm({
  form: 'commentPost', // a unique identifier for this form
  validate,
})(CommentForm)

export default CommentForm