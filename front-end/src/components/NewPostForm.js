import React from 'react'
import './App.css'
import { Field, reduxForm } from 'redux-form'
import { 
  Button, ModalBody, ModalFooter, Form
} from 'reactstrap';
import { MdPerson, MdMail, MdDescription, MdBookmark } from 'react-icons/lib/md'
import PropTypes from 'prop-types'

import renderField from '../utils/renderField'
import renderFieldSelect from '../utils/renderFieldSelect'
import validate from '../validations/validatePost'

// formulário de novo post
let NewPostForm = (props) => {
  const { pristine, submitting, valid, categories } = props
  return (
    <Form onSubmit={props.handleSubmit}>
      <ModalBody>
        <Field label="Autor" name="author" type="text" component={renderField}
          icon={<MdPerson />} />
        <Field label="Title" name="title" type="text" component={renderField} 
          icon={<MdMail/>} />
        <Field label="Message" name="body" type="textarea" component={renderField} 
          icon={<MdDescription />} />
        <Field label="Category" name="category" type="select" component={renderFieldSelect} 
          icon={<MdBookmark />} categories={categories} />
      </ModalBody>
      <ModalFooter>
        <Button color="primary" disabled={pristine || submitting || !valid}>Send</Button>
      </ModalFooter>
    </Form>
  )
}

NewPostForm.propTypes = {
  categories: PropTypes.array,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  valid: PropTypes.bool,
  handleSubmit: PropTypes.func
}

NewPostForm = reduxForm({
  form: 'newPost', // a unique identifier for this form
  validate,
})(NewPostForm)

export default NewPostForm