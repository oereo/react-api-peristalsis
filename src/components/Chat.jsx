import React from "react";

function Chat(){
      const [messageList, setMessageList] = React.useState<Message[]>([]);
  const [value, setValue] = React.useState('');
  const submit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }
    return(
        <>
        </>
    )
}

export default Chat;