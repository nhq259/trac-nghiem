import { useNavigate } from "react-router-dom";
import { checkExits, register } from "../../services/usersServiece";
import { generateToken } from "../../helpers/generateToken";

function Register() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    const checkExitsEmail = await checkExits("email", email);

    if (checkExitsEmail.length > 0) {
      alert("Email da ton tai");
    } else {
      const options = {
        fullName: fullName,
        email: email,
        password: password,
        token: generateToken(),
      };

      const response = await register(options);

      if (response) {
        navigate("/login");
      } else {
        alert("Dang ki that bai");
      }
    }

    console.log(checkExitsEmail);

    // console.log(e.target[0].value)
    // console.log(e.target[1].value)
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Register Quiz</h2>
        <div>
          <input type="fullName" placehoder="Nhập ho tennn" />
        </div>
        <div>
          <input type="email" placehoder="Nhập email" />
        </div>
        <div>
          <input type="password" placehoder="Nhập mật khẩu" />
        </div>
        <button type="submit">Dang ki</button>
      </form>
    </>
  );
}

export default Register;
