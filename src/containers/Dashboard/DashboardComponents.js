import React from "react";
import { useSelector } from "react-redux";
import SmallSpinner from "../../components/SmallSpinner/SmallSpinner";
import { instance } from "../../constants";
import LeftSidebar from "./components/LeftSidebar";
import TokenItem from "./components/TokenItem";
import TopNavbar from "./components/TopNavbar";
import { initialState, reducer, tokenFetchActions } from "./reducer";

function DashboardComponents() {
  const credential = useSelector((state) => state.credential);
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const startFetchingTokens = React.useCallback(async () => {
    try {
      const data = await fetchTokens();
      console.log("success")
      dispatch({ type: tokenFetchActions.TOKEN_FETCH_SUCCESS, payload: data });
    } catch(err) {
      dispatch({
        type: tokenFetchActions.TOKEN_FETCH_FAILED,
        payload: "Something went wrong!!!",
      });
    }
  }, []);

  const fetchTokens = async () => {
    return instance
      .get("/secret/get", { withCredentials: true })
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  const deleteTokenHandler = (tokenItem) => {
    dispatch({ type: tokenFetchActions.TOKEN_FETCH_INIT });
    instance
      .delete(`/secret/delete?id=${tokenItem.uuid}`, { withCredentials: true })
      .then(() => {
        const newTokenArray = state.tokenArray.filter((item) => {
          return item.uuid !== tokenItem.uuid;
        });
        dispatch({
          type: tokenFetchActions.TOKEN_FETCH_SUCCESS,
          payload: newTokenArray,
        });
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          dispatch({
            type: tokenFetchActions.TOKEN_FETCH_FAILED,
            payload: err.response.data.message,
          });
          console.log(err.response.data.message);
        } else {
          dispatch({
            type: tokenFetchActions.TOKEN_FETCH_FAILED,
            payload: "Something went wrong!!!",
          });
          console.log("Something went wrong!!!");
        }
      });
  };

  React.useEffect(() => {
    if (credential.encKey) {
      dispatch({ type: tokenFetchActions.TOKEN_FETCH_INIT });
      startFetchingTokens();
    }
  }, [startFetchingTokens, credential.encKey]);

  return (
    <>
      <LeftSidebar username={credential.email} />
      <div className="right_bx">
        <TopNavbar />
        {state.status === tokenFetchActions.TOKEN_FETCH_SUCCESS ? (
          <TokenItem
            tokens={state.tokenArray}
            decryptKey={credential.encKey}
            deleteTokenHandler={deleteTokenHandler}
          />
        ) : null}
        {state.status === tokenFetchActions.TOKEN_FETCH_INIT ? (
          <SmallSpinner />
        ) : null}
        {state.status === tokenFetchActions.TOKEN_FETCH_FAILED ? (
          <div className="alert alert-danger" role="alert" style={{width: 'max-content', padding: '1.1rem'}}>{state.error}</div>
        ) : null}
      </div>
    </>
  );
}

export default DashboardComponents;
