import { Pipe, PipeTransform } from '@angular/core';
import { Image } from '../models/image.model';

@Pipe({
    name: 'search'
})
export class SearchPipe implements PipeTransform{

    transform(items: Image[], searchText: string): Image[] {
        if (!items) return [];
        if (!searchText) return items;
        if (!searchText.trim().length) return items;

        const sText = searchText.trim().toLowerCase();
        return items.filter((item: Image) => {
            return item.tags.includes(sText)
        })
    }

}
