import React, { useState } from "react";
import SearchBar from "material-ui-search-bar";
import { Typography } from "@material-ui/core/";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {searchGIFsAsync} from "../giphySlice";
import {useAppDispatch} from "../../../app/hooks";
import ReplyIcon from '@material-ui/icons/Reply';
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '4%',
      marginLeft: '22%',
      display: 'flex',
      width: '36%',
      padding: '10px',
      flexFlow: 'row wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    searchBar: {
      margin: '0px 0px auto 37%',
      maxWidth: '800px',
      borderRadius: 12,
      '&:hover': {
        boxShadow: `0 6px 12px 0`,
      },
    },
    favorites: {
      float: 'left',
    },
    link: {
        color: "#000000",
        "&:hover": {
            color: "#000000",
            textDecoration: "none"
        }
    },
    wrapIcon: {
      verticalAlign: 'middle',
      display: 'inline-flex'
     },
  }),
);

interface Props {
  showBackButton: boolean,
  offset: number,
}

export default function GiphySearchBar({showBackButton, offset}: Props) {
  const classes = useStyles();
  const [searchItem, setSearchItem] = useState("");
  const dispatch = useAppDispatch();

  return (
    <div className={classes.root}>
      { (!showBackButton) ? (
        <React.Fragment>
          <SearchBar
            className={classes.searchBar}
            value={searchItem}
            onChange={value => {
              setSearchItem(value);
            }}
            onRequestSearch={() => dispatch(searchGIFsAsync({searchTerm:searchItem, offset:offset}))}
            style={{
              margin: "0 0 auto 33%",
              maxWidth: 800
            }}
          />
            <Link to="/favorites">My Saved GIFs</Link>

        </React.Fragment>
      ) : (
        <React.Fragment>
          <Link to="/"><ReplyIcon/> Back</Link>
          <Typography variant="h6">
            My Saved GIFs
          </Typography>
        </React.Fragment>
      )
      }
    </div>
  );
}
