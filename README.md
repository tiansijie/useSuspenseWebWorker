# useSuspenseWebWorker

### Use webworker with react suspense and hooks

### Install

---

`yarn add use-suspense-webworker`

`npm install use-suspense-webworker`

### Usage

---

```js
import { Suspense, useTransition } from "react";
import useWorker from "use-suspense-webworker";

const myWorker = new Worker("./worker.js");

function Button({ data, onClick }) {
	const read = data.read();

	if (read && read.result && read.result.error) {
		return <div>Error {read.result.error}</div>;
	}

	return (
		<div style={centerStyle}>
			<button onClick={onClick}>Click Me</button>
			<div>Result</div>
			<div>{read && JSON.stringify(read && read.result.data)}</div>
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
```

### Example

---

`npm run example`

then go to `http://localhost:1234`
