import React, { useEffect, useState } from "react";
import { Typography, Popover } from "antd";
import axios from "axios";
import "./favorite.css";
import { useSelector } from "react-redux";
import {
  IMAGE_BASE_URL,
  API_KEY,
  API_URL,
  POSTER_SIZE,
  IMAGE_SIZE,
} from "../../Config";

const { Title } = Typography;

function FavoritePage() {
  const user = useSelector((state) => state.user);
  const [Favorites, setFavorites] = useState([]);
  const [Loading, setLoading] = useState(true);
  let variable = { userFrom: localStorage.getItem("userId") };

  useEffect(() => {
    fetchFavoredMovie();
  }, []);

  const fetchFavoredMovie = () => {
    axios.post("/api/favorite/getFavoredMovie", variable).then((response) => {
      if (response.data.success) {
        //console.log(response.data.favoritedMovies);
        let data = response.data.favoritedMovies;
          data.map((favorite, index) => {
          let endpoint = `${API_URL}movie/${favorite.movieId}?api_key=${API_KEY}&language=en-US`;
          fetch(endpoint)
            .then((result) => result.json())
            .then((result) => {
              if (result && result.backdrop_path) {
                const moviePosterPath = `${IMAGE_BASE_URL}w1280${result.backdrop_path}`;
                //console.log(moviePosterPath);
                data[index]["moviePosterPath"] = moviePosterPath;
                //console.log("moviePosterpath= ", moviePosterPath);
                if(index == data.length-1){
                  setFavorites(data);
                  setLoading(false);
                }
              }
              //console.log(`${IMAGE_BASE_URL}${IMAGE_SIZE}${result.backdrop_path}`);
            }, setLoading(false))
            .catch((error) => console.log("Error: ", error));
            return favorite;
        });
      } else {
        console.log("error =", response);
        alert("Failed to get subscription videos");
      }
    });
  };

  const onClickDelete = (movieId, userFrom) => {
    const variables = {
      movieId: movieId,
      userFrom: userFrom,
    };

    axios
      .post("/api/favorite/removeFromFavorite", variables)
      .then((response) => {
        if (response.data.success) {
          fetchFavoredMovie();
        } else {
          alert("Failed to Remove From Favorite");
        }
      });
  };

  //const renderCards=null;
  const renderCards =
    Favorites.length != 0
      ? Favorites.map((favorite, index) => {
          //console.log('posterpath= ',favorite.moviePosterPath);
          const content = (
            <div>
              {favorite.moviePosterPath ? (
                <img src={favorite.moviePosterPath} alt="No image" width="350" height="350" />
              ) : (
                "no image"
              )}
            </div>
          );

          return (
            <tr key={index}>
              <Popover content={content} title={`${favorite.movieTitle}`}>
                <td>{favorite.movieTitle}</td>
              </Popover>

              <td>{favorite.movieRunTime} mins</td>
              <td>
                <button
                  onClick={() =>
                    onClickDelete(favorite.movieId, favorite.userFrom)
                  }
                >
                  {" "}
                  Remove{" "}
                </button>
              </td>
            </tr>
          );
        })
      : null;

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title level={2}> Favorite Movies By Me </Title>
      <hr />
      {user.userData && !user.userData.isAuth ? (
        <div
          style={{
            width: "100%",
            fontSize: "2rem",
            height: "500px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>Please Log in first...</p>
          <a href="/login">Go to Login page</a>
        </div>
      ) : (
        !Loading && (
          <table>
            <thead>
              <tr>
                <th>Movie Title</th>
                <th>Movie RunTime</th>
                <td>Remove from favorites</td>
              </tr>
            </thead>
            <tbody>{renderCards}</tbody>
          </table>
        )
      )}
    </div>
  );
}

export default FavoritePage;
