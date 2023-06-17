import React from "react";
import {
  Grid,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import { User } from "../../types/user";

interface LikersUserRowProps {
  user: User;
}

const LikersUserRow: React.FC<LikersUserRowProps> = ({ user }) => {
  return (
    <>
      <Card key={user.id} sx={{ maxWidth: 800 }}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <CardMedia
              sx={{ height: 120 }}
              image={user.avatar}
              title={user.firstName}
            />
          </Grid>
          <Grid item xs={6}>
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {user.firstName} {user.lastName},{" "}
                <Typography variant="body2" color="text.secondary">
                  {user.age} | {user.jobTitle}
                </Typography>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user.description && <br />}
                <b>
                  {user.email} | {user.phone}
                </b>
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={3} display={"flex"} alignItems={"center"}>
            <Button size="small">Ignore</Button>
            <Button size="small" variant="outlined" sx={{ color: "purple" }}>
              Accept
            </Button>
          </Grid>
        </Grid>
      </Card>
      <hr />
    </>
  );
};

export default LikersUserRow;
