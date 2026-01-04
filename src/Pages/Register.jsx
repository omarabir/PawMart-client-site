import React, { useContext } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";

const Register = () => {
  const { createUser, signInWithGoogle, user, updateUserProfile, setUser } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  const validatePassword = (password) => {
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least 1 uppercase letter.";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least 1 lowercase letter.";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    return null;
  };
  if (user) {
    return <Navigate to="/"></Navigate>;
  }
  const handleRegister = (e) => {
    e.preventDefault();
    const displayName = e.target.displayName.value;
    const photoURL = e.target.photoURL.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const passwordError = validatePassword(password);
    if (passwordError) {
      toast.error(passwordError);
      return;
    }
    createUser(email, password)
      .then((result) => {
        updateUserProfile(displayName, photoURL).then(() => {
          setUser({ ...result.user, displayName, photoURL });
          toast.success("User created successfully!");
          navigate(from, { replace: true });
        });
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        toast.success("User created successfully!");
        console.log(result.user);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  return (
    <div className="hero min-h-screen  py-10">
      <div className="hero-content flex flex-col justify-center">
        <div className="text-center  lg:pr-10">
          <h1 className="text-5xl  font-bold">Join PawMart!</h1>
          <p className="py-6">
            Create an account to start listing pets for adoption, sell supplies,
            or find your new best friend. Join our community of pet lovers
            today!
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-xl bg-base-100">
          <form onSubmit={handleRegister} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Your Name"
                className="input input-bordered"
                required
                name="displayName"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
                name="email"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
                name="password"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="url"
                placeholder="https://example.com/photo.jpg"
                className="input input-bordered"
                name="photoURL"
              />
            </div>

            <div className="form-control mt-6 mx-auto w-full">
              <button
                className="btn text-white bg-[#FE7F73] w-full"
                type="submit"
              >
                Register
              </button>
            </div>
            <div className="divider">OR</div>
            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="btn bg-white text-black border-[#e5e5e5]"
            >
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Login with Google
            </button>
            <p className="text-center text-sm mt-4">
              Already have an account?{" "}
              <Link to="/login" className="link text-[#FE7F73] font-semibold">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
