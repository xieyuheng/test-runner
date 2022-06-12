import * as Loggers from "../loggers"
import { AppConfig } from "./app-config"

export class App {
  config = new AppConfig()
  logger = new Loggers.PrettyLogger()
}

export default new App()
