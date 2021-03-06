import React from 'react'
import { 
  InputGroup, InputGroupAddon, Input, 
  FormGroup, FormFeedback  
} from 'reactstrap';
import { MdThumbUp, MdThumbDown } from 'react-icons/lib/md'

// renderiza um input de texto com um ícone, e feedback de sucesso ou erro
// caso tenha sido alterado => se tiver erro retorna falso, senão retorna verdadeiro, senão retorna nulo para o feedback da cor do input
// exibe ícone de sucesso ou erro no fim do input
// caso tenha erro exibe a mensagem de erro
const renderField = ({ input, label, type, icon, meta: { asyncValidating, touched, error } }) => (
  <FormGroup>
    <InputGroup>
      <InputGroupAddon addonType="prepend"><div className="input-group-text">{icon}</div></InputGroupAddon>
      <Input {...input} type={type} placeholder={label} valid={touched ? error ? false : true : null} />
      {touched && !error && <InputGroupAddon addonType="append"><div className="inputIcon backgroundColorSuccess"><MdThumbUp /></div></InputGroupAddon>}
      {touched && error && <InputGroupAddon addonType="append"><div className="inputIcon backgroundColorDanger"><MdThumbDown /></div></InputGroupAddon>}
    </InputGroup>
    {touched && error && <FormFeedback className="text-danger" style={{display: 'block'}}>{error}</FormFeedback>}
  </FormGroup>
)

export default renderField