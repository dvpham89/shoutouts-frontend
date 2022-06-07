import { FormEvent, useState } from "react";
import ShoutOut from "../models/ShoutOut";
import "./ShoutOutForm.css";

interface Props {
  addShoutOut: (so: ShoutOut) => void;
}

const ShoutOutForm = ({ addShoutOut }: Props) => {
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [msg, setMsg] = useState("");

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    addShoutOut({ to, from, text: msg });
    setTo("");
    setFrom("");
    setMsg("");
  };

  return (
    <form className="ShoutOutForm" onSubmit={submitHandler}>
      <label htmlFor="to">To: </label>
      <input
        type="text"
        name="to"
        id="to"
        onChange={(e) => setTo(e.target.value)}
        value={to}
      />
      <label htmlFor="from">From: </label>
      <input
        type="text"
        name="from"
        id="from"
        onChange={(e) => setFrom(e.target.value)}
        value={from}
      />
      <label htmlFor="msg">Message: </label>
      <input
        type="text"
        name="msg"
        id="msg"
        onChange={(e) => setMsg(e.target.value)}
        value={msg}
      />
      <button>Submit ShoutOut</button>
    </form>
  );
};

export default ShoutOutForm;
