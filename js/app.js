import { getChannels, updateChannels } from "../services/api.js";
import { deleteChannel } from "./delete.js";
import { filterChannels } from "./filter.js";
import { searchChannels } from "./search.js";
import { showChannelInfo, showChannels, someClickEvents } from "./ui.js";
import { addChannel } from "./add.js";

// const channels = await getChannels();

// console.log(channels)

getChannels();

// showChannels(await getChannels());

searchChannels();

filterChannels();

showChannelInfo(await getChannels());

someClickEvents();

// ADD CHANNEL:START
addChannel();
// ADD CHANNEL:END

// ============= delete

deleteChannel()