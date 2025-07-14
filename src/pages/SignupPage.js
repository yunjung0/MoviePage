// import react, {useState} from React;
// import { useNavigate } from "react-router-dom";
// import Signup from '../components/Signup';

// function Signup() {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async(e) => {
//     e.preventDefault();
//     try{
//       await Signup(username,email, password);
//       alert('회원가입이 완료되었습니다! 로그인해주세요.')
//       navigate('/login');
//     }catch (err) {
//       if (err.response && err.response.data) {
//                 const messages = Object.values(err.response.data).flat().join(' ');
//                 setError(messages);
//             } else {
//                 setError('회원가입 중 오류가 발생했습니다.');
//             }
//     }
    
//   }
// }