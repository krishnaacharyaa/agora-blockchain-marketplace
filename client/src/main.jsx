import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import {
	ThirdwebProvider,
	ConnectWallet,
	metamaskWallet,
} from "@thirdweb-dev/react";
import { StateContextProvider } from "./contex";
import { BrowserRouter as Router } from "react-router-dom";
import { Sepolia } from "@thirdweb-dev/chains";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
	<ThirdwebProvider activeChain={Sepolia} supportedWallets={[metamaskWallet()]}>
		<Router>
			<StateContextProvider>
				<App />
			</StateContextProvider>
		</Router>
	</ThirdwebProvider>
);
