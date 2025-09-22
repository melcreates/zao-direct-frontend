import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { UserContext } from "../helper/UserContext";



const Account = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        phone_number: "",
        location: "",
        user_type: "",
        password: ""
    });

    const [loginFormData, setLoginFormData] = useState({
        email: "",
        password: ""
    })

    const { login } = useContext(UserContext); // get login function

    const handleRegister = async (e) => {
        e.preventDefault();
        console.log("Submitting registration...")
        try {
            await axios.post("http://localhost:5000/register", formData);
            navigate("/dashboard");
            setFormData({ ...formData, full_name: "", email: "", phone_number: "", location: "", user_type: "", password: "" })
        } catch (err) {
            console.error(err);
            alert("Registration failed");
            setFormData({ ...formData, full_name: "", email: "", phone_number: "", location: "", user_type: "", password: "" })
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/login", loginFormData);
            login(res.data.user, res.data.token); // store globally
            navigate("/dashboard");
        } catch (err) {
            console.error(err);
            alert("Login failed");
        }
    }

    return (
        <section className="account py-80">
            <div className="container container-lg">
                <div >
                    <div className="row gy-4">
                        {/* Login Card Start */}
                        <form className="col-xl-6 pe-xl-5" onSubmit={handleLogin}>
                            <div className="border border-gray-100 hover-border-main-600 transition-1 rounded-16 px-24 py-40 h-100">
                                <h6 className="text-xl mb-32">Login</h6>
                                <div className="mb-24">
                                    <label
                                        htmlFor="email"
                                        className="text-neutral-900 text-lg mb-8 fw-medium"
                                    >
                                        Email address <span className="text-danger">*</span>{" "}
                                    </label>
                                    <input
                                        type="text"
                                        className="common-input"
                                        id="email"
                                        placeholder="Full Name"
                                        value={loginFormData.email}
                                        onChange={(e) => { setLoginFormData({ ...loginFormData, email: e.target.value }) }}
                                    />
                                </div>
                                <div className="mb-24">
                                    <label
                                        htmlFor="password"
                                        className="text-neutral-900 text-lg mb-8 fw-medium"

                                    >
                                        Password
                                    </label>
                                    <div className="position-relative">
                                        <input
                                            type="password"
                                            className="common-input"
                                            id="password"
                                            placeholder="Enter Password"
                                            value={loginFormData.password}
                                            onChange={(e) => { setLoginFormData({ ...loginFormData, password: e.target.value }) }}
                                        />
                                        <span
                                            className="toggle-password position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y cursor-pointer ph ph-eye-slash"
                                            id="#password"
                                        />
                                    </div>
                                </div>
                                <div className="mb-24 mt-48">
                                    <div className="flex-align gap-48 flex-wrap">
                                        <button type="submit" className="btn btn-main py-18 px-40" >
                                            Log in
                                        </button>
                                        <div className="form-check common-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                defaultValue=""
                                                id="remember"
                                            />
                                            <label
                                                className="form-check-label flex-grow-1"
                                                htmlFor="remember"
                                            >
                                                Remember me
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-48">
                                    <Link
                                        to="#"
                                        className="text-danger-600 text-sm fw-semibold hover-text-decoration-underline"
                                    >
                                        Forgot your password?
                                    </Link>
                                </div>
                            </div>
                        </form>
                        {/* Login Card End */}
                        {/* Register Card Start */}
                        <form className="col-xl-6" onSubmit={handleRegister}>
                            <div className="border border-gray-100 hover-border-main-600 transition-1 rounded-16 px-24 py-40">
                                <h6 className="text-xl mb-32">Register</h6>
                                <div className="mb-24">
                                    <label
                                        htmlFor="usernameTwo"
                                        className="text-neutral-900 text-lg mb-8 fw-medium"
                                    >
                                        Username <span className="text-danger">*</span>{" "}
                                    </label>
                                    <input
                                        type="text"
                                        className="common-input"
                                        id="full_name"
                                        placeholder="Write a username"
                                        value={formData.full_name}
                                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                    />
                                </div>
                                <div className="mb-24">
                                    <label
                                        htmlFor="emailTwo"
                                        className="text-neutral-900 text-lg mb-8 fw-medium"
                                    >
                                        Email address
                                        <span className="text-danger">*</span>{" "}
                                    </label>
                                    <input
                                        type="email"
                                        className="common-input"
                                        id="email"
                                        placeholder="Enter Email Address"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                                <div className="mb-24">
                                    <label htmlFor="phone_number" className="text-neutral-900 text-lg mb-8 fw-medium">
                                        Phone Number <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="common-input"
                                        id="phone_number"
                                        placeholder="Enter phone number"
                                        value={formData.phone_number}
                                        onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                                    />
                                </div>
                                <div className="mb-24">
                                    <label htmlFor="county" className="text-neutral-900 text-lg mb-8 fw-medium">
                                        County <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="common-input"
                                        id="county"
                                        placeholder="Enter county"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    />
                                </div>
                                <div className="mb-24">
                                    <label className="text-neutral-900 text-lg mb-8 fw-medium">
                                        User Type <span className="text-danger">*</span>
                                    </label>
                                    <div className="d-flex gap-10">
                                        <label>
                                            <input
                                                type="radio"
                                                name="user_type"
                                                value="Farmer"
                                                checked={formData.user_type === "Farmer"}
                                                onChange={(e) => setFormData({ ...formData, user_type: e.target.value })}
                                            /> Farmer
                                        </label>

                                        <label>
                                            <input
                                                type="radio"
                                                name="user_type"
                                                value="Buyer"
                                                checked={formData.user_type === "Buyer"}
                                                onChange={(e) => setFormData({ ...formData, user_type: e.target.value })}
                                            /> Buyer
                                        </label>
                                    </div>
                                </div>
                                <div className="mb-24">
                                    <label
                                        htmlFor="enter-password"
                                        className="text-neutral-900 text-lg mb-8 fw-medium"
                                    >
                                        Password
                                        <span className="text-danger">*</span>
                                    </label>
                                    <div className="position-relative">
                                        <input
                                            type="password"
                                            className="common-input"
                                            id="password"
                                            placeholder="Enter Password"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        />
                                        <span
                                            className="toggle-password position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y cursor-pointer ph ph-eye-slash"
                                            id="#enter-password"
                                        />
                                    </div>
                                </div>
                                <div className="my-48">
                                    <p className="text-gray-500">
                                        Your personal data will be used to process your order, support
                                        your experience throughout this website, and for other purposes
                                        described in our{"  "}
                                        <Link to="#" className="text-main-600 text-decoration-underline">
                                            {" "}
                                            privacy policy
                                        </Link>
                                        .
                                    </p>
                                </div>
                                <div className="mt-48">
                                    <button type="submit" className="btn btn-main py-18 px-40" >
                                        Register
                                    </button>
                                </div>
                            </div>
                        </form>
                        {/* Register Card End */}
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Account