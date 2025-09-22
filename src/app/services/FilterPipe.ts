import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {
  transform<T extends Record<string, any>>(items: T[], searchText: string): T[] {
    if (!searchText || !items) return items;
    const term = searchText.toLowerCase();
    return items.filter(item =>
      Object.values(item).some(
        value => value?.toString().toLowerCase().includes(term)
      )
    );
  }
}