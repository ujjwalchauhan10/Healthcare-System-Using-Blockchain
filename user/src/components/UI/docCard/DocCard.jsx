import React from "react";
import { Button } from "../Button";

const DocCard = ({ uri }) => {
  return (
    <div>
      <a href={uri} target="_blank" rel="noopener noreferrer">
        <Button
          variant="contained"
          className="rounded"
          buttonText={"Report"}
          //onClick={}
        />
      </a>
    </div>
  );
};

export default DocCard;
