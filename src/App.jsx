import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementR, decrementR } from "./store/robotSlice";
import { incrementM, decrementM } from "./store/missionSlice";

function App() {
  const dispatch = useDispatch();
  const { countR } = useSelector((state) => state.robot);
  const { countM } = useSelector((state) => state.mission);
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <br />
      <div className="flex p-2 gap-2">
        <button onClick={() => dispatch(incrementR())}>+</button>
        <h1>{countR}</h1>
        <button onClick={() => dispatch(decrementR())}>-</button>
      </div>
      <br />
      <div className="flex p-2 gap-2">
        <button onClick={() => dispatch(incrementM())}>+</button>
        <h1>{countM}</h1>
        <button onClick={() => dispatch(decrementM())}>-</button>
      </div>
    </>
  );
}

export default App;
