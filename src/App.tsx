import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
	const [values, setValues] = useState<{ [key: string]: string }>({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
	const [showError, setShowError] = useState(false);
	const [showPasswordError, setShowPasswordError] = useState(false);

	const inputs = [
		{
			controlId: "formBasicUsername",
			label: "Username",
			type: "text",
			name: "username",
			required: true,
			pattern: "^[A-Za-z0-9]{3,16}$",
			feedback:
				"Username should be 3-16 characters and shouldn't include any special character!",
		},
		{
			controlId: "formBasicEmail",
			label: "Email address",
			type: "email",
			name: "email",
			required: true,
			feedback: "Please enter a valid email address.",
		},
		{
			controlId: "formBasicPassword",
			label: "Password",
			type: "password",
			name: "password",
			required: true,
			pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
			feedback:
				"Please enter a valid password (must contain at least one lowercase letter, one uppercase letter, one digit, and be at least 8 characters long).",
		},
		{
			controlId: "formBasicConfirmPassword",
			label: "Confirm Password",
			type: "password",
			name: "confirmPassword",
			required: true,
			pattern: values.password,
			feedback: "Please confirm your password.",
		},
	];

	const handleChange = (event: any) => {
		setValues({
			...values,
			[event.target.name]: event.target.value,
		});
		setErrors({
			...errors,
			[event.target.name]: false,
		});
	};

	const handleSubmit = (event: any) => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
			setErrors({
				...errors,
				[event.target.name]: true,
			});
		} else {
			setShowError(false);
			setShowPasswordError(false);
			if (values.password !== values.confirmPassword) {
				setShowPasswordError(true);
			} else {
				// Your submission logic here
			}
		}
	};

	return (
		<div className="">
			<h1 className="text-center mt-5">Please register</h1>
			
			<Form
				className="container"
				noValidate
				validated={true}
				onSubmit={handleSubmit}
			>
				{inputs.map((input) => (
					<Form.Group className="my-4" controlId={input.controlId} key={input.controlId}>
						<Form.Label>{input.label}</Form.Label>
						<Form.Control
							required={input.required}
							type={input.type}
							name={input.name}
							value={values[input.name]}
							onChange={handleChange}
							pattern={input.pattern}
							isInvalid={errors[input.name]}
						/>
						<Form.Control.Feedback type="invalid">
							{input.feedback}
						</Form.Control.Feedback>
					</Form.Group>
				))}

				{showError && (
					<Alert variant="danger">
						There was an error with your submission. Please try again.
					</Alert>
				)}
				{showPasswordError && (
					<Alert variant="danger">
						The password and confirm password inputs do not match.
					</Alert>
				)}
				<Button className="w-100 my-4" variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		</div>
	);
}

export default App;
