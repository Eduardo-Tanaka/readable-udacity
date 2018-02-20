import React from 'react'
import './App.css'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { 
  Button, ModalBody, ModalFooter, Form
} from 'reactstrap';
import { MdMail, MdDescription, MdBookmark } from 'react-icons/lib/md'
import PropTypes from 'prop-types'

import renderField from '../utils/renderField' 
import renderFieldSelect from '../utils/renderFieldSelect' 
import validate from '../validations/validatePost'

// formulário de edição do post
let EditPostForm = (props) => {
  const { pristine, submitting, valid, categories } = props
  return (
    <Form onSubmit={props.handleSubmit}>
      <ModalBody>
        <Field label="Título" name="title" type="text" component={renderField}
          icon={<MdMail/>} />
        <Field label="Mensagem" name="body" type="textarea" component={renderField} 
          icon={<MdDescription />} />
        <Field label="Categoria" name="category" type="select" component={renderFieldSelect} 
          icon={<MdBookmark />} categories={categories} />
      </ModalBody>
      <ModalFooter>
        <Button color="primary" disabled={pristine || submitting || !valid}>Salvar</Button>
      </ModalFooter>
    </Form>
  )
}

EditPostForm.propTypes = {
  categories: PropTypes.array,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  valid: PropTypes.bool,
  handleSubmit: PropTypes.func
}

EditPostForm = reduxForm({
  form: 'editPost', // a unique identifier for this form
  validate,
  enableReinitialize: true
})(EditPostForm)

// You have to connect() to any reducers that you wish to connect to yourself
EditPostForm = connect(
  state => ({
    initialValues: state.postReducer.post,
  }),
)(EditPostForm)

export default EditPostForm