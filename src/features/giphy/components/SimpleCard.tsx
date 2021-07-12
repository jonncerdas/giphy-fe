import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Grid from '@material-ui/core/Grid';
import ShareIcon from '@material-ui/icons/Share';
import {GifObject} from "../../../common/types";

import { handleFavorites } from "../giphySlice";
import {useAppDispatch} from "../../../app/hooks";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: 165,
      borderRadius: 12,
      boxShadow: 'none',
      '&:hover': {
        boxShadow: `0 6px 12px 0`,
      },
    },
    actionArea: {
      borderRadius: 16,
      transition: '0.2s',
      '&:hover': {
        opacity: '0.4',
        transform: 'scale(1.1)',
      }
    },
    media: {
      // paddingTop: '56.25%', // 16:9
      margin: "-70px auto 0",
      width: "100%",
      height: 180,
      borderRadius: "2px",
      // boxShadow: "0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)",
      // position: "relative",
      zIndex: 1000
    },
    content: {
      position: 'absolute',
      top: '85px',
      textAlign: 'center',
    },
    favorite: {
      color: '#ffffff',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    share: {
      color: '#ffffff',
    },
    favoriteSelected: {
      color: 'red',
    },
    avatar: {
      backgroundColor: red[500],
    },
    font: {
      lineHeight: '0.9',
      letterSpacing: '0.00938em',
      fontWeight: 'bolder',
      color: '#ffffff',
    }
  }),
);

interface GiphyCardProps{
  gif: GifObject,
  onHandleShareButton: () => void,
  isFavorite?: boolean
}

export default function SimpleCard({ gif, onHandleShareButton, isFavorite=false }: GiphyCardProps) {
  const classes = useStyles();
  const [favorite, setFavorite] = React.useState(isFavorite);
  const [isShown, setIsShown] = React.useState(false);

  const dispatch = useAppDispatch();

  const handleFavoriteClick = (gifId: string) => {
    dispatch(handleFavorites({gifId: gifId, favoriteStatus: !favorite}));
    setFavorite(!favorite);
  };

  const handleShareClick = () => {
    navigator.clipboard.writeText(gif.bitly_url);
    onHandleShareButton();
  }

  const showOnHover = () => {
    setIsShown(!isShown);
  };

  return (
    <Grid item md={3}>
      <CardActionArea className={classes.actionArea}
          onMouseEnter={() => showOnHover()}
          onMouseLeave={() => showOnHover()}
      >
        <Card className={classes.root}>
            <CardActions disableSpacing>
                <Icon
                  className={classes.share}
                  onClick={() => {handleShareClick()}}
                >
                  { (isShown || favorite) && (
                    <ShareIcon />
                  )}
                </Icon>
                <Icon
                  className={clsx(classes.favorite, {
                    [classes.favoriteSelected]: favorite,
                  })}
                  onClick={() => handleFavoriteClick(gif.id)}
                  aria-expanded={favorite}
                  aria-label="favorite"
                >
                  { (isShown || favorite) && (
                    <FavoriteIcon />
                  )}
                </Icon>

            </CardActions>
          <CardMedia
            className={classes.media}
            image={gif.images.downsized_medium.url}
            title={gif.title}
          />
          <CardContent className={classes.content}>
            {isShown && (
                <Typography className={classes.font} variant="body1" color="textPrimary" component="h2">
                  {gif.title}
                </Typography>
            )}
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
}
