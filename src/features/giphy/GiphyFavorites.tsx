import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import {useAppSelector} from '../../app/hooks';

// components
import {
  ScrollToTop,
  SimpleCard,
  GiphySearchBar,
} from './components';
import {selectFavoriteGIFs} from "./giphySlice";
import {GifObject} from "../../common/types";
import Snackbar, {SnackbarOrigin} from "@material-ui/core/Snackbar";
import {State} from "./Giphy";

export function GiphyFavorites() {

  const favoriteGIFs = useAppSelector(selectFavoriteGIFs);

  // SnackBar
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState: SnackbarOrigin) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <div>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          message="Link copied to clipboard!"
          key={vertical + horizontal}
          autoHideDuration={1500}
        />
      </div>
      <GiphySearchBar
        showBackButton={true}
        offset={0}
      />
      <ScrollToTop/>
      <main>
        <Container maxWidth="md">
          <Grid container spacing={2}>
            { favoriteGIFs.length === 0 && (<div>No favorites yet!</div>) }
            {
              favoriteGIFs.map((gif: GifObject) => (
                      <SimpleCard
                        key={gif.id}
                        gif={gif}
                        onHandleShareButton={handleClick({ vertical: 'top', horizontal: 'center' })}
                        isFavorite={true}
                      />))
            }
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}