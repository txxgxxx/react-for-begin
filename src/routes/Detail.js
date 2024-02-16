import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";
function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movieDetail, setMovieDetail] = useState([]);
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovieDetail(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div>
      {loading ? (
        <h1>loading...</h1>
      ) : (
        <div className={styles.container}>
          <div className={styles.detail}>
            <div>
              <img
                src={movieDetail.large_cover_image}
                alt={movieDetail.title}
                className={styles.detail__poster}
              />
            </div>
            <div className={styles.detail__info}>
              <div>
                <h2>{movieDetail.title}</h2>
                <ul>
                  <li>{movieDetail.year}</li>
                  {movieDetail.genres.map((genre) => (
                    <li key={genre}>{genre}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p>{movieDetail.description_full}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
