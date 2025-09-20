import prisma from '../prisma/client.js';
import config from './config/config.js';
import app from './app.js';
const PORT = process.env.PORT ?? config.port;
let server;
if (prisma) {
    console.log('Connected to Database');
    server = app.listen(PORT, () => {
        console.log(`Listening to port ${PORT}`);
    });
}
const exitHandler = () => {
    if (server) {
        server.close(() => {
            console.log('Server closed');
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
};
const unexpectedErrorHandler = (error) => {
    console.log(error);
    exitHandler();
};
process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
process.on('SIGTERM', () => {
    console.log('SIGTERM received');
    if (server) {
        server.close();
    }
});
//# sourceMappingURL=index.js.map