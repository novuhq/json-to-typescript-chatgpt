import React, { useState } from "react";
import Delete from "./icons/Delete";
import Copy from "./icons/Copy";
import Editor from "@monaco-editor/react";
import Loading from "./Loading";
import { CopyToClipboard } from "react-copy-to-clipboard";

const App = () => {
	const [value, setValue] = useState("");
	const [output, setOutput] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = () => {
		setLoading(true);
		fetch("http://localhost:4000/convert", {
			method: "POST",
			body: JSON.stringify({
				value,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setLoading(false);
				setOutput(data.response);
			})
			.catch((err) => console.error(err));
	};
	const copyToClipBoard = () => alert(`Copied ✅`);
	if (loading) {
		return <Loading />;
	}
	return (
		<main className='app'>
			<div className='header__container'>
				<header>
					<h3>JSON</h3>
					<div className='header__right'>
						<button className='runBtn' onClick={handleSubmit}>
							RUN
						</button>
						<Delete setValue={setValue} />
					</div>
				</header>
				<header>
					<h3>Typescript</h3>
					<CopyToClipboard text={output} onCopy={copyToClipBoard}>
						<span>
							<Copy />
						</span>
					</CopyToClipboard>
				</header>
			</div>

			<div className='code__container'>
				<div className='code'>
					<Editor
						height='90vh'
						className='editor'
						defaultLanguage='json'
						defaultValue='{}'
						value={value}
						onChange={(value) => setValue(value)}
					/>
				</div>

				<div className='output'>
					<Editor
						height='90vh'
						className='editor'
						defaultLanguage='typescript'
						options={{
							domReadOnly: true,
							readOnly: true,
						}}
						defaultValue=''
						value={output}
					/>
				</div>
			</div>
		</main>
	);
};

export default App;
