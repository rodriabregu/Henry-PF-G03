import './register.css';
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';

const Register = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const notify = () => toast.success('Successfully created!');

  const onSubmit = (data: any) => ( console.log(data), notify() ,reset() )

  return (
    <div className='form-register'>
      <div className='card-form'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div><h1>Create an account</h1></div>
        <div>
          <label htmlFor="username">Username</label>
          {errors.username && <span role="alert">{errors.username.message}</span>}
          <input id='username' type="text" placeholder="Joshep4269 (example)" {...register("username", {
            required: "required",
            minLength: {
              value: 3,
              message: "Min length is 3."
            },
            maxLength: {
              value: 16,
              message: "Max length is 16."
            }
          }
          )} />
        </div>
        <div>
          <label htmlFor="firstname">First name</label>
          {errors.firstname && <span role="alert">{errors.firstname.message}</span>}
          <input id='firstname' type="text" placeholder="Joshep (example)" {...register("firstname", {
            required: "required",
            minLength: {
              value: 3,
              message: "Min length is 3."
            },
            maxLength: {
              value: 24,
              message: "Max length is 24."
            }
          })}
          />
        </div>
        <div>
          <label htmlFor="lastname">Last name</label>
          {errors.lastname && <span role="alert">{errors.lastname.message}</span>}
          <input id='lastname' type="text" placeholder="Fort (example)" {...register("lastname", {
            required: "required",
            minLength: {
              value: 3,
              message: "Min length is 3."
            },
            maxLength: {
              value: 24,
              message: "Max length is 24."
            }
          })}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          {errors.email && <span role="alert">{errors.email.message}</span>}
          <input
            id="email"
            placeholder="jf@gmail.com (example)"
            {...register("email", {
              required: "required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "It isn't email format."
              }
            })}
            type="email"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          {errors.password && <span role="alert">{errors.password.message}</span>}
          <input
            id="password"
            placeholder='pepito123 (example)'
            type="password"
            {...register("password", {
              required: "required",
              minLength: {
                value: 3,
                message: "Min length is 3."
              },
              maxLength: {
                value: 24,
                message: "Max length is 24."
              }
            })}
          />
        </div> 
        <div>
          <input className='button-r' type="submit" />
          <Toaster />
        </div>
      </form>
      </div>
    </div>
  );
}

export default Register;