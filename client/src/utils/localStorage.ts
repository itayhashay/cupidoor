export const getUserId = () => {
    const user: any = localStorage.getItem("user");
    if(user) {
      const userData = JSON.parse(user);
      return userData._id;
    }
    return "";
  }

  export const getUserLikedApartments = () => {
    const likedApartments: any = localStorage.getItem("userLikedApartments");
    if(likedApartments) {
      const userLikedApartments = JSON.parse(likedApartments);
      return userLikedApartments;
    }
    return [];
  }

  export const getUserLikedApartmentsIds = () => {
    const likedApartments: any = localStorage.getItem("userLikedApartments");
    if(likedApartments) {
      const userLikedApartments = JSON.parse(likedApartments);
      const likedApartmentsIds: string[] = userLikedApartments.map((apartments: any) => apartments._id);
      return likedApartmentsIds;
    }
    return [];
  }
