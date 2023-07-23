// ** Third Party Imports
import axios from "axios";

// ** Demo Components Imports
import Profile from "src/views/apps/user/Profile";

const UserView = () => {
  return <Profile />;
};

export const getStaticProps = async () => {
  return {
    props: {},
  };
};

export default UserView;
