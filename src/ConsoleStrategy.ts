import { OutputDataStrategy, ShelterAnimalContent } from "./OutputDataStrategy";

export default class ConsoleStrategy implements OutputDataStrategy {
    data: ShelterAnimalContent[];
    constructor(data: ShelterAnimalContent[]) {
        this.data = data;
    }
    output( ):void {
        this.data.forEach((animal)=>console.log("This animal:", animal))
    }
}
