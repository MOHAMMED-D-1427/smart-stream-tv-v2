import { getChannels, updateChannels } from "../services/api.js";
import { deleteChannel } from "./delete.js";
import { filterChannels } from "./filter.js";
import { searchChannels } from "./search.js";
import { showChannelInfo, showChannels, someClickEvents } from "./ui.js";
import { addChannel } from "./add.js";


// console.log(channels)

getChannels();

// showChannels(await getChannels());

searchChannels();

filterChannels();

showChannelInfo(await getChannels());

someClickEvents();

addChannel();

// ============= delete

deleteChannel()

// =============
// updateChannels()