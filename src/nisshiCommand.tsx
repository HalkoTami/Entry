import { getApplications ,open,launchCommand,LaunchType} from "@raycast/api";
import { getNisshiLink } from "./getNisshiLink";
export default async function Command() {
  const installedApplications = await getApplications();
  const notion = installedApplications.find((app)=>{return app.name == "Notion"})
  const Js = JSON.parse(JSON.stringify(notion))
  const link = await getNisshiLink()
  
  await open(link,notion);

}
 