const { app, BrowserWindow } = require("electron");
const { spawn } = require("child_process");
const path = require("path");

let mainWindow;
let nextProcess;

const PORT = 3000;
const NEXT_URL = `http://localhost:${PORT}`;

function startNextServer() {
  return new Promise((resolve, reject) => {
    const isDev = !app.isPackaged;

    let command;
    let args;
    let options;

    if (isDev) {
      command = process.platform === "win32"
        ? "npm.cmd"
        : "npm";

      args = [
        "run",
        "start",
        "--",
        "-p",
        PORT.toString(),
      ];

      options = {
        cwd: process.cwd(),
        shell: true,
        env: {
          ...process.env,
          NODE_ENV: "production",
        },
      };
    } else {
      const nextPath = path.join(
        process.resourcesPath,
        "app"
      );

      command = process.platform === "win32"
        ? "node.exe"
        : "node";

      args = [
        path.join(
          nextPath,
          "node_modules",
          "next",
          "dist",
          "bin",
          "next"
        ),
        "start",
        "-p",
        PORT.toString(),
      ];

      options = {
        cwd: nextPath,
        env: {
          ...process.env,
          NODE_ENV: "production",
        },
      };
    }

    nextProcess = spawn(
      command,
      args,
      options
    );

    nextProcess.stdout.on("data", (data) => {
      console.log(`[Next.js] ${data}`);

      const output = data.toString();

      if (
        output.includes("Ready") ||
        output.includes("started server") ||
        output.includes(`localhost:${PORT}`)
      ) {
        resolve();
      }
    });

    nextProcess.stderr.on("data", (data) => {
      console.error(`[Next.js] ${data}`);
    });

    nextProcess.on("error", (error) => {
      reject(error);
    });
  });
}


async function waitForServer(url, retries = 40) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);

      if (response.ok) {
        return true;
      }
    } catch {}

    await new Promise((resolve) =>
      setTimeout(resolve, 500)
    );
  }

  throw new Error("Next.js no respondió.");
}

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 700,

    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },

    title: "Vivero HJ",
  });

  try {
    await startNextServer();
    await waitForServer(NEXT_URL);

    await mainWindow.loadURL(NEXT_URL);
  } catch (error) {
    console.error(
      "Error iniciando aplicación:",
      error
    );
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (
      BrowserWindow.getAllWindows().length === 0
    ) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (nextProcess) {
    nextProcess.kill();
  }

  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("before-quit", () => {
  if (nextProcess) {
    nextProcess.kill();
  }
});