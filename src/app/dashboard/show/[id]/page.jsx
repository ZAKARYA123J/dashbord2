"use client";
import React, { useContext } from "react";
import { useParams } from "next/navigation";
import { DataContext } from "@/contexts/post";
import { Grid, Typography, Paper, Box, Card, CardMedia, CardContent } from "@mui/material";

function Page() {
  const { id } = useParams();
  const { detail, data } = useContext(DataContext);

  // Filter details based on postId
  const filteredDetails = detail?.filter((item) => item.postId == id);

  // Filter images from data based on id
  const filteredData = data?.filter((item) => item.id == id);

  return (
    <Box p={4}>
      <Grid container spacing={3}>
        {/* Property Details Section */}
        {filteredDetails?.length > 0 ? (
          filteredDetails.map((item, key) => (
            <Grid item xs={12} key={key}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Post Details
                </Typography>
                <Typography> <strong>Construction Year:</strong> {item.constructionyear}</Typography>
                <Typography><strong>urface: </strong>S{item.surface} m²</Typography>
                <Typography><strong>Rooms: </strong> {item.rooms}</Typography>
                <Typography><strong>Bedrooms:</strong>{item.bathrooms}</Typography>
                <Typography><strong>Kitchen: </strong>{item.kitchen}</Typography>
                <Typography><strong> Furnished:</strong> {item.furnished ? "Yes" : "No"}</Typography>
                <Typography><strong>Floor:</strong> {item.floor}</Typography>
                <Typography><strong> Elevator: </strong>{item.elevator ? "Yes" : "No"}</Typography>
                <Typography><strong>Parking:</strong> {item.parking ? "Available" : "Not Available"}</Typography>
                <Typography><strong> Balcony:</strong> {item.balcony ? "Yes" : "No"}</Typography>
                <Typography><strong>Pool:</strong> {item.pool ? "Yes" : "No"}</Typography>
                <Typography><strong> Facade:</strong> {item.facade}</Typography>
                <Typography><strong>Documents:</strong> {item.documents}</Typography>
              </Paper>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1">No details found for this post.</Typography>
          </Grid>
        )}

        {/* Images Section */}
        {filteredData?.length > 0 ? (
          filteredData.map((item, key) => (
            <Grid item xs={12} key={key}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Images
                </Typography>
                <Grid container spacing={2}>
                  {item.img && item.img.length > 0 ? (
                    item.img.map((image, imgKey) => (
                      <Grid item xs={12} sm={6} md={4} key={imgKey}>
                        <Card>
                          <CardMedia
                            component="img"
                            height="200"
                            image={image.url}
                            alt={`Image ${imgKey}`}
                          />
                        </Card>
                      </Grid>
                    ))
                  ) : (
                    <Grid item xs={12}>
                      <Typography variant="body2">No images found.</Typography>
                    </Grid>
                  )}
                </Grid>
              </Paper>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1">No images found for this post.</Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default Page;
