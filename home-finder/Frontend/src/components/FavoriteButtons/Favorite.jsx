import React from "react";
import axios from "axios";
import { Button } from "reactstrap";

class AddFavorite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      home_id: this.props.id,
      favorite_house_id: "",
      isFav: "",
    };
  }

  componentDidMount() {
    this.getFavorites();
  }

  getFavorites = () => {
    axios
      .get(
        "http://100.24.18.12:8000/api/show_favorite_id_by_home?house_id=" +
          this.state.home_id,
        {
          headers: {
            Authorization: "Token " + localStorage.getItem("user"),
          },
        }
      )
      .then((response) => {
        this.setState({
          favorite_house_id: response.data.favorite[0].house.id,
        });
        this.setState({
          isFav:
            this.state.favorite_house_id === this.state.home_id ? true : false,
        });
        this.state.favoritedHomes = response.data.favorite.map((f) => {
          return f.house;
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  addToFavorite = () => {
    axios
      .post(
        "http://100.24.18.12:8000/api/add_favorite/",
        {
          house_id: this.state.home_id,
        },
        {
          headers: {
            Authorization: "Token " + localStorage.getItem("user"),
          },
        }
      )
      .then(() => {
        this.setState({ isFav: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  removeFavorite = () => {
    axios
      .delete("http://100.24.18.12:8000/api/delete_favorite/", {
        headers: {
          Authorization: "Token " + localStorage.getItem("user"),
        },
        params: {
          house_id: this.state.home_id,
        },
      })
      .then(() => {
        this.setState({ isFav: false });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        {this.state.isFav ? (
          <Button color="warning" onClick={this.removeFavorite}>
            Delete Favorite
          </Button>
        ) : (
          <Button color="warning" onClick={this.addToFavorite}>
            Favorite
          </Button>
        )}
      </div>
    );
  }
}

export default AddFavorite;
