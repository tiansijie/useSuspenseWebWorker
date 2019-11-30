import { useState, useEffect } from "react";

const promise = new Promise(() => {});

function useSuspenseWebWorker(worker) {
	const [result, setResult] = useState();
	worker.onmessage = function(e) {
		setResult({
			result: e
		});
	};
	worker.onerror = function(e) {
		setResult({
			error: e
		});
	};

	const runner = args => {
		setResult(null);
		worker.postMessage(args);
	};

	useEffect(() => {
		const cleanup = () => {
			worker.terminate();
			setResult();
		};
		return cleanup;
	}, [worker]);

	if (result != null) {
		return [{ read: () => result }, runner];
	} else if (result === undefined) {
		return [{ read: () => null }, runner];
	} else {
		return [
			{
				read: () => {
					throw promise;
				}
			},
			runner
		];
	}
}

export default useSuspenseWebWorker;
