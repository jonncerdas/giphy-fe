import React, {useEffect, useRef} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import {useAppSelector, useAppDispatch, useIntersectionObserver} from '../../app/hooks';

// components
import {
  ScrollToTop,
  SimpleCard,
  GiphySearchBar,
} from './components';
import {
  fetchTrendingGIFsAsync,
  selectError,
  selectPagination,
  selectGIFs,
  selectStatus,
} from "./giphySlice";
import {GifObject} from "../../common/types";

import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar';

export interface State extends SnackbarOrigin {
  open: boolean;
}

export function Giphy() {

  const gifs = useAppSelector(selectGIFs);
  const status = useAppSelector(selectStatus);
  const pagination = useAppSelector(selectPagination);
  const error = useAppSelector(selectError);

  const dispatch = useAppDispatch();

  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {});

  const isVisible = !!entry?.isIntersecting;
  const offset = pagination.count + pagination.offset;

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

  // Fetch trending gifs when page loads
  useEffect(() => {
    if (status === 'idle' ) {
      dispatch(fetchTrendingGIFsAsync(offset));
    }
  }, [status, offset, dispatch])

  // Pagination Infinite Scroll
  useEffect(() => {
    if (status === 'succeeded' && isVisible) {
      dispatch(fetchTrendingGIFsAsync(offset));
    }
  }, [isVisible, status, offset, dispatch])

  let content: JSX.Element | Array<JSX.Element>

  if (status === 'loading') {
    content = <div className="loader">Loading...</div>
  }  else if (status === 'failed') {
    content = <div>{error}</div>
  }

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
        showBackButton={false}
        offset={offset}
      />
      <ScrollToTop/>
      <main>
        <Container maxWidth="md">
          <Grid container spacing={2}>
            {// @ts-ignore
              content
            }
            {
              gifs.map((gif: GifObject, index:number) => (
                      <SimpleCard
                        key={gif.id+index}
                        gif={gif}
                        onHandleShareButton={handleClick({ vertical: 'top', horizontal: 'center' })}
                      />))
            }
            <div id="endOfPage" ref={ref}/>
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}