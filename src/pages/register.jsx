import React, { useState } from 'react'

const Register = (props) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [nationalID, setNationalID] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [joinedDate, setJoinedDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [profilePic, setProfilePic] = useState('')
  const [errors, setErrors] = useState({})
  const registration = (e) => {
    e.preventDefault()
    console.log(email)
    console.log('Form submitted:', { name, email, password,confirmPassword,nationalID,phone,address,joinedDate,endDate,profilePic})
    // Reset form fields
    setName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setNationalID('')
    setPhone('')
    setAddress('')
    setJoinedDate('')
    setEndDate('')
    setProfilePic('')
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

    // Validate name field
    if (!name.trim()) {
      errors.name = 'Name is required'
    }

    // Validate email field
    if (!email.trim()) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid'
    }

    // Validate password field
    if (!password.trim()) {
      errors.password = 'Password is required'
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long'
    }

    // Validate confirm password field
    if (!confirmPassword.trim()) {
      errors.confirmPassword = 'Confirm Password is required'
    } else if (confirmPassword !== password) {
      errors.confirmPassword = 'Passwords do not match'
    }
    if (!nationalID.trim()) {
      errors.nationalID = 'nationalID is required'
    } else if (nationalID.length ==14) {
      errors.nationalID = 'nationalID must be at least 14 characters long'
    }
    if (!phone.trim()) {
      errors.phone = 'phone is required'
    } else if (phone.length ==11) {
      errors.phone = 'phone must be at least 11 characters long'
    }
    if (!address.trim()) {
      errors.address = 'phone is required'
    } 

    if (!joinedDate.trim()) {
      errors.joinedDate = 'joinedDate is required'
    } 

    if (!endDate.trim()) {
      errors.endDate = 'endDate is required'
    }

    if (!profilePic.trim()) {
      errors.profilePic = 'profilePic is required'
    }
    return errors
  }

  return (
    <div className="auth-form-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={registration}>
        <label htmlFor="name">Full name</label>
        <input
          type="name"
          placeholder="enter your full name"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p className="text-danger">{errors.name}</p>}
        <label htmlFor="email">email</label>
        <input
          type="email"
          placeholder="email@gmail.com"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="text-danger">{errors.email}</p>}

        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          placeholder="***********"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="text-danger">{errors.password}</p>}
        <label htmlFor="co">Confirm your password</label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="***********"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errors.confirmPassword && (
          <p className="text-danger">{errors.confirmPassword}</p>
        )}

        <label htmlFor="co">National ID </label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="National ID"
          name="nationalID"
          value={nationalID}
          onChange={(e) => setNationalID(e.target.value)}
        />
        {errors.nationalID && (
          <p className="text-danger">{errors.nationalID}</p>
        )}

        <label htmlFor="co">Phone </label>
        <input
          type="text"
          id="phone"
          placeholder="phone"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {errors.phone && (
          <p className="text-danger">{errors.phone}</p>
        )}

        <label htmlFor="co">Address </label>
        <input
          type="text"
          id="address"
          placeholder="address"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        {errors.address && (
          <p className="text-danger">{errors.address}</p>
        )}


        <label htmlFor="co">Joined date </label>
        <input
          type="date"
          id="joinedDate"
          placeholder="joinedDate"
          name="joinedDate"
          value={joinedDate}
          onChange={(e) => setJoinedDate(e.target.value)}
        />
        {errors.joinedDate && (
          <p className="text-danger">{errors.joinedDate}</p>
        )}

        <label htmlFor="co">Profile Picture </label>
        <input
          type="file"
          id="profilePic"
          placeholder="profile picture"
          name="profilePic"
          value={profilePic}
          onChange={(e) => setProfilePic(e.target.value)}
        />
        {errors.profilePic && (
          <p className="text-danger">{errors.profilePic}</p>
        )}
        <button type="submit" className="submission">
          Register
        </button>
      </form>
      <button className="link-btn" onClick={() => props.onFormSwitch('login')}>
        Already have an account? Login here.
      </button>
    </div>
  )
}

export default Register
