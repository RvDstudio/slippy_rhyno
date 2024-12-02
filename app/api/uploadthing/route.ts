import { createRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "@/app/api/uploadthing/core";
// Call another API that sends the image url to replicate API

export const { GET, POST } = createRouteHandler({
    router: ourFileRouter,
    config: {
        isDev: (process.env.NODE_ENV === "development"),
        logLevel: "debug",
    },
});