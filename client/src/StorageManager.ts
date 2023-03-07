export class StorageManager {
	public getPairingCode(): string {
		return localStorage.getItem("pairingCode") ?? "";
	}

	public setPairingCode(pairingCode: string): void {
		localStorage.setItem("pairingCode", pairingCode);
	}

	public getDidGiveConsent(): boolean {
		return localStorage.getItem("didGiveConsent") === "true";
	}

	public setDidGiveConsent(didGiveConsent: boolean): void {
		localStorage.setItem("didGiveConsent", didGiveConsent.toString());
	}
}

export default new StorageManager();
