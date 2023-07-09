import React,{useState} from 'react';

// import { useHistory } from 'react-router-dom';
const Login = (props) => {
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const [errors, setErrors] = useState({})
    // const history = useHistory();

    const submission=(e)=>{
        e.preventDefault();
        console.log(email);
        console.log('Form submitted:', { email, password });
        // Reset form fields
        setEmail('');
        setPassword('');
        // history.push('/home');

        const validationErrors = validateForm()
 
        if (Object.keys(validationErrors).length === 0) {
          // Proceed with registration logic
          // ...
        } else {
          setErrors(validationErrors)
        }
      }
      // form validation
      const validateForm = () => {
        let errors = {}
    
        
       
    
        // Validate email field
        if (!email.trim()) {
          errors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(email)) {
          errors.email = 'Email is invalid'
        }
    
        // Validate password field
        if (!password.trim()) {
          errors.password = 'Password is required'
        } else if (password.length < 8) {
          errors.password = 'Password must be at least 8 characters long'
        }
    
      
        return errors
      }
    
    
  return (
    <div className='auth-form-container'>
    <h2>Login</h2>
     <form onSubmit={submission} className='login-form'>
     <label htmlFor="email" >
     Email
     </label>
     <input type='email' placeholder='email@gmail.com' id="email" name="email" value={email}    onChange={(e) => setEmail(e.target.value)}
     />
     {errors.email && <p className="text-danger">{errors.email}</p>}
     <label htmlFor="password" >
     Password
     </label>
     <input type='password'  id="password"  placeholder="***********"name="password" value={password}  onChange={(e) => setPassword(e.target.value)}
     />
     {errors.password && <p className="text-danger">{errors.password}</p>}
     <button type='submit' className='submission'>Log In</button>
     </form>
     <button className="link-btn" onClick={()=>props.onFormSwitch("register")}>Don't have an account? Register here.</button>
    </div>
  )
}

export default Login
