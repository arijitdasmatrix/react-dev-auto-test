import React from "react"
import Form from 'react-bootstrap/Form';

const FormAlertMutedText = ({text}) => {
console.log("text",text);
return (
<>
<Form.Text className="text-muted">
 {text}
</Form.Text>    
</>
)
}

export default FormAlertMutedText;