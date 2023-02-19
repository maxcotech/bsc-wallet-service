import { Request, Response } from "express";
import Controller from "./Controller";

class HomeController extends Controller {
    public static index(req: Request, res: Response){
        res.send({
<<<<<<< HEAD
            hello: "Welcome to smart chain wallet service",
            baseUrl: req.baseUrl
=======
            hello: "Hello Welcome to ethereum wallet ",
            baseUrl: req.baseUrl,
          
>>>>>>> 9263669e00eb225d4aef4b1aac66231d011c96fa
        })
    }

    
}

export default HomeController;