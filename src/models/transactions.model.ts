export interface Transaction {
  amount: number;
  assetId: null | string;
  attachment: string;
  fee: number;
  feeAsset: null;
  height: number;
  id: string;
  recipient: string;
  sender: string;
  senderPublicKey: string;
  signature: string;
  timestamp: number;
  type: number;
}
export interface Course {
  course: number;
}

export interface Asset {
  name: string;
}
