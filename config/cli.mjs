import tma from "tt-ide-cli";
import path from "path";
import { fileURLToPath } from "url";

// 构建NPM
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const buildNpm = async () => {
  await tma.buildNpm({
    project: {
      path: path.resolve(dirname, "../src"),
    },
  });
};
buildNpm();
