import React from "react";
import { Box } from "@mui/material";
import { User } from "../../types/user";
import LikersUserRow from "./likersUserRow";

interface LikersModalListProps {
  users: User[];
}

const style = {
  overflow: "auto",
  p: 3,
  flex: 1,
};

const LikersModalList: React.FC<LikersModalListProps> = ({ users }) => {
  return (
    <Box sx={style}>
      {users.map((user) => (
        <LikersUserRow user={user} />
      ))}
    </Box>
  );
};

export default LikersModalList;
