export const getUserId = () => {
    const user: any = localStorage.getItem("user");
    if(user) {
      const userData = JSON.parse(user);
      return userData._id;
    }
    return "";
  }
