import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import '/Authform.css';

export default function Login() {
    //form state managemant
    const [formData, setFormData] = useState ({
        email:'',
        password:'',
    });
    const [error, setError] = useState ('');
    const [loading, setLoading] = useState ('');

    //get auth functions and nav
    const {login} = useAuth ();
    const navigate = useNavigate ();

    function handleChange (e) {
        setFormData({
            ...formData,
            [e.targrt.name] :e.targrt.value
        });
    }

    async function handleChange(e) {
        e.preventDefault();
        try{
            setError('');
            setLoading(true);

            await login(formData.email, formData.password);
             navigate('/dashboard');

        }catch (error) {
            setError('Failed to sign in:' + error.message)
        }

        setLoading (false);
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Welcome...</h2>

                {error &&  <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}className="auth-form">
                    <div className="form-group">
                        <label htmlFor="email" className="Email"></label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="Password"></label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                    type="submit"
                    disabled={loading}
                    className="auth-button"
                    >
                        {loading ? 'Signing in...':'Sign In'}
                    </button>
                </form>
                <p className="auth-link">
                    Don't have an account? <Link to='/register'>Sign Up</Link>
                </p>
            </div>
        </div>
    )
}
    