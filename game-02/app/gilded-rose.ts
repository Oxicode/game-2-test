export const NAME_BACKSTAGE = 'Backstage passes to a TAFKAL80ETC concert';
export const NAME_AGED = 'Aged Brie';
export const NAME_CONJURED = 'Conjured Mana Cake';
export const NAME_SULFURAS = 'Sulfuras, Hand of Ragnaros';
export const UP = 'UP';
export const DOWN = 'DOWN';
export const MAX_QUALITY = 50;

export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, quality, sellIn) {
        this.name = name;
        this.quality = quality;
        this.sellIn = sellIn;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    tick() {
        return this.items.map((item) => {
            if (![NAME_AGED, NAME_BACKSTAGE].includes(item.name)) {
                this.qualityChange(item, DOWN);
            } else {
                if (item.quality < MAX_QUALITY) {
                    item.quality++;

                    if (item.name === NAME_BACKSTAGE) {
                        if (item.sellIn < 11) { this.qualityChange(item, UP); }
                        if (item.sellIn < 6) { this.qualityChange(item, UP); }
                    }
                }
            }

            if (item.name !== NAME_SULFURAS) {
                item.sellIn--;
            }

            if (item.sellIn >= 0) { return item; }

            if (item.name === NAME_AGED) {
                this.qualityChange(item, UP);
                return item;
            }

            if (item.name !== NAME_BACKSTAGE) {
                this.qualityChange(item, DOWN);
            } else {
                this.qualityZero(item);
            }

            return item;
        });
    }

    qualityZero(item: Item): void {
        item.quality = 0;
    }

    qualityChange(item: Item, operation: typeof UP | typeof DOWN): void {
        if (operation === UP) {
            if (item.quality < MAX_QUALITY) {
                item.quality++;
            }
            return;
        }

        if (item.quality <= 0) { return; }

        if (item.name !== NAME_SULFURAS) {
            item.quality--;
        }

        if (item.name === NAME_CONJURED) {
            item.quality--;
        }

    }
}
