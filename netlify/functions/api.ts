import express, { json, Router } from "express";
import serverless from "serverless-http";

const router = Router();

export type FileEntry = [string, string[], string, string, string];

export interface FileObject {
    fileName: string;
    aliases: string[];
    description: string;
    extension: string;
    filePath: string;
  }
export const convertToJsonObject = (fileEntries: FileEntry[]): FileObject[] => {
    return fileEntries.map(([fileName, aliases, description, extension, filePath]) => ({
      fileName,
      aliases,
      description,
      extension,
      filePath,
    }));
  };


  const getFilename = (req: express.Request, res: express.Response): string => {
    const path = req.path;
    const filename = path.split("/").pop();
    if (filename) {
      return filename;
    } else {
      return "No filename found";
    }
  };

const files: FileEntry[] = [
  ["background", ["bg"], "One of the backgrounds for the site", "png", "background.png"],
  ["favicon", ["fav"], "The favicon for the site", "png", "favicon.png"],
];

const cdn = express();

router.get("/", (req, res) => {
  const jsonObjects: FileObject[] = convertToJsonObject(files);

  // send the json object to the client
  res.status(200).send(jsonObjects);

  });

router.get("*", async (req, res) => {
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
      res.status(200).sendFile(filePath, { root: "./public" });
      return;
    }
  }
});

cdn.use("/api/", router);

export const handler = serverless(cdn);

// start the server
// cdn.listen(3000, () => {
//   console.log("Server is running");
// });
