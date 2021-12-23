import logo from "./logo.svg";
import "./App.css";
import { StoicIdentity } from "ic-stoic-identity";
import { useState } from "react";

function App() {
  const [principleId, setPrincipleId] = useState(null);

  const login = () => {
    StoicIdentity.load().then(async (identity) => {
      if (identity !== false) {
        //ID is a already connected wallet!
      } else {
        //No existing connection, lets make one!
        identity = await StoicIdentity.connect();
        console.log({ identity });
      }

      //Lets display the connected principal!
      console.log(identity.getPrincipal().toText());
      setPrincipleId(identity.getPrincipal().toText());

      //Create an actor canister
      // const actor = Actor.createActor(idlFactory, {
      //   agent: new HttpAgent({
      //     identity,
      //   }),
      //   canisterId,
      // });

      //Disconnect after
      StoicIdentity.disconnect();
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        {principleId != null ? (
          <button className="primary">{principleId}</button>
        ) : (
          <button className="primary" onClick={() => login()}>
            Connect with Stoic
          </button>
        )}
      </header>
    </div>
  );
}

export default App;
