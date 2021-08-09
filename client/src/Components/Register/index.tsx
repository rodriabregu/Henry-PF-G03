import './register.css';
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';

const Register = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const notify = () => toast.success('Successfully created!');

  const onSubmit = (data: any) => ( console.log(data), notify() ,reset() )

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="username">Username</label>
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
      {errors.username && <span role="alert">{errors.username.message}</span>}

      <label htmlFor="firstname">First name</label>
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
      {errors.firstname && <span role="alert">{errors.firstname.message}</span>}

      <label htmlFor="lastname">Last name</label>
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
      {errors.lastname && <span role="alert">{errors.lastname.message}</span>}

      <label htmlFor="email">Email</label>
      <input
        id="email"
        placeholder="jf@gmail.com (example)"
        {...register("email", {
          required: "required",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Entered value does not match email format."
          }
        })}
        type="email"
      />
      {errors.email && <span role="alert">{errors.email.message}</span>}

      <label htmlFor="password">Password</label>
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
      {errors.password && <span role="alert">{errors.password.message}</span>}
      <input type="submit" />
      <Toaster />
    </form>
  );
}

export default Register;