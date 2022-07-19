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
    const data = await fetchTokens();
    dispatch({ type: tokenFetchActions.TOKEN_FETCH_SUCCESS, payload: data });
  }, []);

  const fetchTokens = async () => {
    return instance
      .get("/secret/get", { withCredentials: true })
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        return err;
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
      <LeftSidebar />
      <div className="right_bx">
        <TopNavbar />
        {state.status === tokenFetchActions.TOKEN_FETCH_SUCCESS ? <TokenItem tokens={state.tokenArray} decryptKey={credential.encKey} /> : null}
        {state.status === tokenFetchActions.TOKEN_FETCH_INIT ? <SmallSpinner /> : null}
      </div>
    </>
  );
}

export default DashboardComponents;
