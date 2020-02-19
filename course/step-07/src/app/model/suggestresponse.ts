import { Adres } from './adres';

export class SuggestResponse {
    public numFound: number;
    public start: number;
    public maxScore: number;
    public docs: Adres[];
}