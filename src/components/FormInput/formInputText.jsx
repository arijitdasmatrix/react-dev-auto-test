import React from "react"
import Form from 'react-bootstrap/Form';

const FormInputText = (props) => {
    console.log("props",props);
return (
<>
<Form.Group className="mb-3" controlId="formBasicEmail">
<Form.Label>{props.lebel}</Form.Label>
<Form.Control type={props.type} placeholder={props.placeholder} name={props.name} value={props.value||""} defaultValue="" onChange={props.onChange}/>
<Form.Text className="text-muted">
  We'll never share your email with anyone else.
</Form.Text>
</Form.Group>
</>
)
}

export default FormInputText;