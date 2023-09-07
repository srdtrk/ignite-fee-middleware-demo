// Generated by Ignite ignite.com/cli

import { StdFee } from "@cosmjs/launchpad";
import { SigningStargateClient, DeliverTxResponse } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { msgTypes } from './registry';
import { IgniteClient } from "../client"
import { MissingWalletError } from "../helpers"
import { Api } from "./rest";
import { MsgPayPacketFeeAsync } from "./types/ibc/applications/fee/v1/tx";
import { MsgPayPacketFee } from "./types/ibc/applications/fee/v1/tx";

import { IncentivizedAcknowledgement as typeIncentivizedAcknowledgement} from "./types"
import { Fee as typeFee} from "./types"
import { PacketFee as typePacketFee} from "./types"
import { PacketFees as typePacketFees} from "./types"
import { IdentifiedPacketFees as typeIdentifiedPacketFees} from "./types"
import { FeeEnabledChannel as typeFeeEnabledChannel} from "./types"
import { RegisteredPayee as typeRegisteredPayee} from "./types"
import { RegisteredCounterpartyPayee as typeRegisteredCounterpartyPayee} from "./types"
import { ForwardRelayerAddress as typeForwardRelayerAddress} from "./types"
import { Metadata as typeMetadata} from "./types"

export { MsgPayPacketFeeAsync, MsgPayPacketFee };

type sendMsgPayPacketFeeAsyncParams = {
  value: MsgPayPacketFeeAsync,
  fee?: StdFee,
  memo?: string
};

type sendMsgPayPacketFeeParams = {
  value: MsgPayPacketFee,
  fee?: StdFee,
  memo?: string
};


type msgPayPacketFeeAsyncParams = {
  value: MsgPayPacketFeeAsync,
};

type msgPayPacketFeeParams = {
  value: MsgPayPacketFee,
};


export const registry = new Registry(msgTypes);

type Field = {
	name: string;
	type: unknown;
}
function getStructure(template) {
	const structure: {fields: Field[]} = { fields: [] }
	for (let [key, value] of Object.entries(template)) {
		let field = { name: key, type: typeof value }
		structure.fields.push(field)
	}
	return structure
}
const defaultFee = {
  amount: [],
  gas: "200000",
};

interface TxClientOptions {
  addr: string
	prefix: string
	signer?: OfflineSigner
}

export const txClient = ({ signer, prefix, addr }: TxClientOptions = { addr: "http://localhost:26657", prefix: "cosmos" }) => {

  return {
		
		async sendMsgPayPacketFeeAsync({ value, fee, memo }: sendMsgPayPacketFeeAsyncParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgPayPacketFeeAsync: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgPayPacketFeeAsync({ value: MsgPayPacketFeeAsync.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgPayPacketFeeAsync: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgPayPacketFee({ value, fee, memo }: sendMsgPayPacketFeeParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgPayPacketFee: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgPayPacketFee({ value: MsgPayPacketFee.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgPayPacketFee: Could not broadcast Tx: '+ e.message)
			}
		},
		
		
		msgPayPacketFeeAsync({ value }: msgPayPacketFeeAsyncParams): EncodeObject {
			try {
				return { typeUrl: "/ibc.applications.fee.v1.MsgPayPacketFeeAsync", value: MsgPayPacketFeeAsync.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgPayPacketFeeAsync: Could not create message: ' + e.message)
			}
		},
		
		msgPayPacketFee({ value }: msgPayPacketFeeParams): EncodeObject {
			try {
				return { typeUrl: "/ibc.applications.fee.v1.MsgPayPacketFee", value: MsgPayPacketFee.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgPayPacketFee: Could not create message: ' + e.message)
			}
		},
		
	}
};

interface QueryClientOptions {
  addr: string
}

export const queryClient = ({ addr: addr }: QueryClientOptions = { addr: "http://localhost:1317" }) => {
  return new Api({ baseURL: addr });
};

class SDKModule {
	public query: ReturnType<typeof queryClient>;
	public tx: ReturnType<typeof txClient>;
	public structure: Record<string,unknown>;
	public registry: Array<[string, GeneratedType]> = [];

	constructor(client: IgniteClient) {		
	
		this.query = queryClient({ addr: client.env.apiURL });		
		this.updateTX(client);
		this.structure =  {
						IncentivizedAcknowledgement: getStructure(typeIncentivizedAcknowledgement.fromPartial({})),
						Fee: getStructure(typeFee.fromPartial({})),
						PacketFee: getStructure(typePacketFee.fromPartial({})),
						PacketFees: getStructure(typePacketFees.fromPartial({})),
						IdentifiedPacketFees: getStructure(typeIdentifiedPacketFees.fromPartial({})),
						FeeEnabledChannel: getStructure(typeFeeEnabledChannel.fromPartial({})),
						RegisteredPayee: getStructure(typeRegisteredPayee.fromPartial({})),
						RegisteredCounterpartyPayee: getStructure(typeRegisteredCounterpartyPayee.fromPartial({})),
						ForwardRelayerAddress: getStructure(typeForwardRelayerAddress.fromPartial({})),
						Metadata: getStructure(typeMetadata.fromPartial({})),
						
		};
		client.on('signer-changed',(signer) => {			
		 this.updateTX(client);
		})
	}
	updateTX(client: IgniteClient) {
    const methods = txClient({
        signer: client.signer,
        addr: client.env.rpcURL,
        prefix: client.env.prefix ?? "cosmos",
    })
	
    this.tx = methods;
    for (let m in methods) {
        this.tx[m] = methods[m].bind(this.tx);
    }
	}
};

const Module = (test: IgniteClient) => {
	return {
		module: {
			IbcApplicationsFeeV1: new SDKModule(test)
		},
		registry: msgTypes
  }
}
export default Module;