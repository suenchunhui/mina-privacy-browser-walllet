import axios from 'axios';

class MerkleListenerLib {
  host: string;
  port: number;

  constructor(host: string, port: number) {
    this.host = host;
    this.port = port;
  }

  async _get(treeType: string, value: string, params?: string) {
    const tmp = await axios.get(
      `http://${this.host}:${this.port}/${treeType}/${value}${params ? '?'+params : ''}`
    );
    return tmp.data;
  }

  async getPublicRoot() {
    return this._get('public', 'root');
  }

  async getPrivateRoot() {
    return this._get('private', 'root');
  }

  async getNullifierRoot() {
    return this._get('nullifier', 'root');
  }

  async getPublicWitness(index: number) {
    return this._get('public', 'witness', `index=${index}`);
  }

  async getPrivateWitness(index: number) {
    return this._get('private', 'witness', `index=${index}`);
  }

  async getNullifierWitness(index: number) {
    return this._get('nullifier', 'witness', `index=${index}`);
  }

  async getPublicBalance(address: string) {
    return this._get('nullifier', 'witness', `address=${address}`);
  }
}

export { MerkleListenerLib };
