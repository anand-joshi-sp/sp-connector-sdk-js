#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const stream_1 = require("stream");
const path_1 = __importDefault(require("path"));
const util_1 = require("util");
const child_process_1 = require("child_process");
const lib_1 = require("../lib");
const archiver_1 = __importDefault(require("archiver"));
const fs_1 = __importDefault(require("fs"));
const COMMAND_RUN = 'run';
const COMMAND_PACKAGE = 'package';
const argv = process.argv.slice(2);
// We are expecting argv similar to: [**/*.js, port?]
if (!argv[0]) {
    throw new Error('missing arg: need at least one arg for the command');
}
else if (argv[0] == COMMAND_PACKAGE) {
    packageConnector();
}
else {
    runDev();
}
// packageConnector packages connector files into a zip file
function packageConnector() {
    const zipName = process.env.npm_package_name + '-' + process.env.npm_package_version + '.zip';
    const archive = (0, archiver_1.default)('zip', { zlib: { level: 9 } });
    const stream = fs_1.default.createWriteStream('dist/' + zipName);
    archive.file('dist/index.js', { name: 'index.js' })
        .file('connector-spec.json', { name: 'connector-spec.json' })
        .on('error', err => {
        console.error('Failed to generate connector zip file', err);
    })
        .pipe(stream);
    stream.on('close', () => {
        console.log('Connector zip file created under dist folder: ' + zipName);
    });
    archive.finalize();
}
// runDev runs a local server to invoke commands to the connector
function runDev() {
    let connectorPath = path_1.default.resolve(process.cwd(), argv[0]);
    let port = Number(argv[1]) || 3000;
    if (argv[0] == COMMAND_RUN) {
        connectorPath = path_1.default.resolve(process.cwd(), argv[1]);
        port = Number(argv[2]) || 3000;
    }
    if (path_1.default.extname(connectorPath) !== '.js') {
        throw new Error(`invalid file path: ${connectorPath}`);
    }
    /**
     * Spawns a child process that runs TypeScript compiler (tsc) with watch option and inlineSourcemap for debugging.
     * spawn will fail in pure JS projects as typescript devDependency is expected to be missing
     */
    const spawnTsc = () => {
        const tsc = (0, child_process_1.spawn)(/^win/.test(process.platform) ? 'tsc.cmd' : 'tsc', ['--inlineSourcemap', 'true', '--sourceMap', 'false', '--watch'], { shell: true })
            .once('spawn', () => {
            tsc.stdout.on('data', (data) => console.log(`tsc: ${data}`));
            tsc.stderr.on('data', (data) => console.error(`tsc: ${data}`));
        })
            .once('error', (ignored) => { });
        return tsc;
    };
    spawnTsc();
    /**
     * Loads the connector module from specified connectorPath.
     * Connector config is set as env var to be read via `readConfig()`.
     *
     * Implementation Notes:
     * We need to cleanly init and destroy connector and env var each time, so that this function may perform correctly
     * under async calls. The connector module is prevented from being cached in `required`,
     * and the CONNECTOR_CONFIG env var is deleted once it is read into the connector
     *
     * @param connectorPath Path to connector module
     * @param config Connector config
     */
    const loadConnector = async (connectorPath) => {
        let c = require(connectorPath);
        const connector = c.connector;
        const connectorCustomizer = c.connectorCustomizer;
        Object.keys(require.cache)
            .filter((key) => !key.includes('node_modules'))
            .forEach((key) => delete require.cache[key]);
        return {
            connector: typeof connector === 'function' ? await connector() : connector,
            connectorCustomizer: typeof connectorCustomizer === 'function' ? await connectorCustomizer() : connectorCustomizer
        };
    };
    const app = (0, express_1.default)()
        .use(express_1.default.json({ strict: true }))
        .post('/', async (req, res) => {
        try {
            res.type('application/x-ndjson');
            const cmd = req.body;
            await (0, lib_1._withConfig)(cmd.config, async () => {
                const c = await loadConnector(connectorPath);
                const out = new stream_1.Transform({
                    writableObjectMode: true,
                    transform(chunk, encoding, callback) {
                        try {
                            this.push(JSON.stringify(chunk) + '\n');
                        }
                        catch (e) {
                            callback(e);
                        }
                        callback();
                    },
                });
                (0, stream_1.pipeline)(out, res, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
                await new Promise(async (resolve, reject) => {
                    out.on('finish', () => resolve());
                    out.on('error', (e) => reject(e));
                    try {
                        if (c.connector == null && c.connectorCustomizer == null) {
                            return reject(new Error('Connector not found. Did you export it?'));
                        }
                        // Running connector is exists. This will also run customizer if customizer exists.
                        if (c.connector != null) {
                            return await c.connector._exec(cmd.type, { version: cmd.version, commandType: cmd.type }, cmd.input, out, c.connectorCustomizer);
                        }
                        // Run customizer only
                        let output = await c.connectorCustomizer._exec(cmd.type, { version: cmd.version, commandType: cmd.type }, cmd.input, out);
                        out.write(output);
                    }
                    catch (e) {
                        reject(e);
                    }
                    finally {
                        out.end();
                    }
                });
                res.status(200);
            });
        }
        catch (e) {
            console.error(typeof e === "string" ? e : e?.message);
            let errorType = lib_1.ConnectorErrorType.Generic;
            if (e instanceof lib_1.ConnectorError) {
                errorType = e.type;
            }
            res.status(500).write(`${errorType} error: \n + ${(0, util_1.inspect)(e)}`);
        }
        finally {
            res.end();
        }
    });
    app.listen(port, () => {
        console.log(`SailPoint connector local development server listening at http://localhost:${port}`);
    });
}
//# sourceMappingURL=spcx.js.map