import React from 'react'
import { 
  InputGroup, InputGroupAddon, Input, 
  FormGroup, FormFeedback  
} from 'reactstrap';
import { MdThumbUp, MdThumbDown } from 'react-icons/lib/md'

// renderiza um input de select com um ícone, e feedback de sucesso ou erro
const renderFieldSelect = ({ input, label, type, icon, categories, meta: { asyncValidating, touched, error } }) => (
  <FormGroup>
    <InputGroup>
      <InputGroupAddon addonType="prepend"><div className="input-group-text">{icon}</div></InputGroupAddon>
      <Input {...input} type={type} placeholder={label} valid={touched ? error ? false : true : null}>
        <option value="">Selecione uma Categoria</option>
        {categories.map(category =>
          <option key={category.path} value={category.path}>{category.name}</option>
        )}
      </Input>
      {touched && !error && <InputGroupAddon addonType="append"><div className="inputIcon backgroundColorSuccess"><MdThumbUp /></div></InputGroupAddon>}
      {touched && error && <InputGroupAddon addonType="append"><div className="inputIcon backgroundColorDanger"><MdThumbDown /></div></InputGroupAddon>}
    </InputGroup>
    {touched && error && <FormFeedback className="text-danger" style={{display: 'block'}}>{error}</FormFeedback>}
  </FormGroup>
)

export default renderFieldSelect