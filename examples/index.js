import React, { Suspense, useTransition } from "react";
import ReactDOM from "react-dom";
import useWorker from "../lib/index.js";

const myWorker = new Worker("worker.js");

function Button({ data, onClick }) {
	const read = data.read();
	if (read && read.result && read.result.error) {
		return <div>Error {read.result.error}</div>;
	}
	return (
		<div style={centerStyle}>
			<button onClick={onClick}>Click Me</button>
			<div>Result</div>
			<div>{read && JSON.stringify(read.result.data)}</div>
		</div>
	);
}

function Wrapper() {
	const [workerResult, runWorker] = useWorker(myWorker);
	const [startTransition] = useTransition({
		// Wait 20 ms before fallback
		timeoutMs: 20
	});
	return (
		<div className="App">
			<Suspense fallback={<div style={centerStyle}>loading</div>}>
				<Button
					data={workerResult}
					onClick={() => {
						startTransition(() => {
							runWorker([1, 2]);
						});
					}}
				/>
			</Suspense>
		</div>
	);
}

function App() {
	return <Wrapper />;
}

const centerStyle = {
	display: "flex",
	width: "100%",
	justifyContent: "center",
	alignItems: "center",
	height: "100%",
	flexDirection: "column"
};

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(<App />);
