import React from "react";
interface sendButtonInterface {
	formName: string
}
let SendButton: React.FC<sendButtonInterface> = ({formName}) => {

	return <button className='send-button' type="submit" form={formName}><span className="material-symbols-outlined">
		send
	</span></button>;


}

export default SendButton;