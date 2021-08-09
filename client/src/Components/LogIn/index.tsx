import './login.css';
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const notify = () => toast.success('Successfully created!');

    const onSubmit = (data: any) => (console.log(data), notify(), reset())

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="username">Username</label>
            <input id='username' type="text" placeholder="Username" {...register("username", {
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
};

export default Login;