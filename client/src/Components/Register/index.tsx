import './register.css';
/* import { useForm } from "react-cool-form"; */
/* import { Form, Input, Button, Checkbox } from 'antd'; */
import { useForm } from "react-hook-form";

/* const { Item } = Form;
const { Password } = Input; */

const Register = () => {
    const formSuccess = (datos:any) => {
        console.log('Send nice', datos);
    }
    const formFailed = (error:any) => {
        console.log('Failed send', error);
    }

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data:any) => console.log(data);

    return (
<form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Name</label>

      {/* use aria-invalid to indicate field contain error */}
      <input
        id="name"
        aria-invalid={errors.name ? "true" : "false"}
        {...register('name', { required: true, maxLength: 30 })}
      />
      
      {/* use role="alert" to announce the error message */}
      {errors.name && errors.name.type === "required" && (
        <span role="alert">This is required</span>
      )}
      {errors.name && errors.name.type === "maxLength" && (
        <span role="alert">Max length exceeded</span>
      )}
      
      <input type="submit" />
    </form>
    )
}

export default Register;