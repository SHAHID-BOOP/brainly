import Jwt, { decode } from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";
export const userMiddleware = (req, res, next) => {
    const header = req.headers["authorization"];
    const decoded = Jwt.verify(header, JWT_SECRET);
    if (decoded) {
        // @ts-ignore
        req.userId = decoded._id;
        next();
    }
    else {
        res.status(403).json({
            message: "you are not logged in"
        });
    }
};
//# sourceMappingURL=middleware.js.map