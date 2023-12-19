import express, { json } from "express";
import colors from "colors";

import { FileEntry, FileObject } from "./types/File";
import { getFilename } from "./functions/getFilename";
import { convertToJsonObject } from "./functions/convertToJsonObject";

const files: FileEntry[] = [
  ["background", ["bg"], "One of the backgrounds for the site", "png", "background.png"],
  ["favicon", ["fav"], "The favicon for the site", "png", "favicon.png"],
];

const cdn = express();

cdn.get("/", (req, res) => {
  const jsonObjects: FileObject[] = convertToJsonObject(files);

  // send the json object to the client
  res.status(200).send(jsonObjects);

  });

cdn.get("*", async (req, res) => {
  let fname = getFilename(req, res);

  if (fname === "No filename found" || fname === undefined || !fname) {
    res.status(404).send("No filename provided");
    return;
  } else {
    // check if fname is in files array first feild or the in aliases (second field)
    let file = files.find((file) => {
      return file[0] === fname || file[1].includes(fname);
    });

    if (file === undefined) {
      res.status(404).send("File not found");
      return;
    } else {
      let filePath = `${file[4]}`;
      res.status(200).send("Test").sendFile(filePath, { root: "./public" });
      return;
    }
  }
});

// start the server
cdn.listen(3000, () => {
  console.log(colors.green("Server is running"));
});
