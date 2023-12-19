import express from "express";


export const getFilename = (req: express.Request, res: express.Response): string => {
    const path = req.path;
    const filename = path.split("/").pop();
    if (filename) {
        return filename;
    } else {
        return "No filename found";
    }
};
