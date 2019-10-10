import { Packet, Client } from "mosca";

const toggle = (packet: Packet, client: Client) => {
    packet.payload, client.id;
}

export default { toggle };
