import { PageContainer, FormContainer } from "./LoginPage.styles";
import {useState} from "react";
import { Grid } from "@mui/material";
import {User,NewUser} from "../../../types";
import { sign } from "crypto";

const LoginPage = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  const [logInData, setLogInData] = useState<User>({username:"", password:""});
  const [signUpData, setSignUpData] = useState<NewUser>({firstname:"", lastname:"", username:"", password:"", confirmpassword:""});

  const handleLoginSubmit =(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if(!logInData?.username || !logInData.password) return;
    console.log("Login:",logInData);
    setLogInData({username: '', password: ''});
  }

    const handleSignupSubmit =(event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
    if(!signUpData?.username || !signUpData?.password || !signUpData?.firstname || !signUpData?.lastname 
      || !signUpData?.confirmpassword) return;
    if(signUpData.password !== signUpData.confirmpassword){
      alert("Passwords dont match"); return;
    }
    console.log("SignUp:",signUpData);
    setSignUpData({username: '', firstname: '', lastname: '', password: '', confirmpassword:''});

  }
  
  return (
    <PageContainer container>
      <Grid item md={4} xs={4} lg={4}>
        {/* ACT 8*/}
        <FormContainer>
         {loggedIn ? (
           <form onSubmit={handleLoginSubmit}> 
            <h2>Login</h2>
            <div>
              <label htmlFor="username">Username</label>
              <input type="text" placeholder="Username" value={logInData?.username} onChange={(e)=> setLogInData({...logInData, username: e.target.value})} />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input type="password" placeholder="Password" value={logInData?.password} onChange={(e)=> setLogInData({...logInData, password: e.target.value})}/>
            </div>
            <a href="#" onClick={()=> setLoggedIn(false)}> Don't have an account?</a>
            <button type="submit">Login</button>
          </form>
         ) : (
           <form onSubmit={handleSignupSubmit}> 
            <h2>Sign Up</h2>
            <div className="row">
              <div>
                <label htmlFor="firstname">First name</label>
                <input type="text" placeholder="First Name" value={signUpData?.firstname } onChange={(e)=> setSignUpData({...signUpData, firstname: e.target.value})}></input>
              </div>
              <div>
                <label htmlFor="lastname">Last name</label>
                <input type="text" placeholder="Last Name"  value={signUpData?.lastname} onChange={(e)=> setSignUpData({...signUpData, lastname: e.target.value})}></input>
              </div>
            </div>
            <div>
              <label htmlFor="username">Username</label>
              <input type="text" placeholder="Username"  value={signUpData?.username} onChange={(e)=> setSignUpData({...signUpData, username: e.target.value})}></input>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input type="password" placeholder="Password" value={signUpData?.password} onChange={(e)=> setSignUpData({...signUpData, password: e.target.value})}></input>
            </div>
            <div>
              <label htmlFor="confirmpswd">Confirm password </label>
              <input type="password" placeholder="Confirm Password" value={signUpData?.confirmpassword} onChange={(e)=> setSignUpData({...signUpData, confirmpassword: e.target.value})} ></input>
            </div>
            <a href="#" onClick={()=> setLoggedIn(true)}> Already have an account?</a>
            <button type="submit">Sign Up</button>
          </form>
         )}
        </FormContainer>
      </Grid>
    </PageContainer>
  );
};

export default LoginPage;
