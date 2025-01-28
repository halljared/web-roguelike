import { Item } from '@/models/Item'

export class PlaygroundModel {
  private _selectedCopies: Item[] = []

  get selectedCopies(): Item[] {
    return this._selectedCopies
  }

  addCopy(item: Item): void {
    const copy = Item.copy(item, false)
    this._selectedCopies.push(copy)
  }

  removeCopy(itemId: string): void {
    const index = this._selectedCopies.findIndex(copy => copy.id === itemId)
    if (index !== -1) {
      this._selectedCopies.splice(index, 1)
    }
  }

  clearCopies(): void {
    this._selectedCopies = []
  }
}
