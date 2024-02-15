import React from "react";
// @ts-ignore
import addIcon from "../../icons/add.png";

export default function Note({type}: { type: string }): React.JSX.Element {
	return (<div className="note-label-container">
		<label>Subjective</label>
		<button className="icon-button"><img src={addIcon} alt={"Add"}
		                                     style={{
			                                     width: '20px',
			                                     height: '20px'
		                                     }}/>
		</button>
	</div>);
}
