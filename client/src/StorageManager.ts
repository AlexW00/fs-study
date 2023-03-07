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

	public reset(): void {
		localStorage.clear();
	}
}

export default new StorageManager();
