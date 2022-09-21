import { Redirect } from "react-router-dom";


function ProtectedRoute({ loggedIn, children, linkToSignIn }) {
  return loggedIn ? children : <Redirect to={linkToSignIn} />;
}

export default ProtectedRoute;