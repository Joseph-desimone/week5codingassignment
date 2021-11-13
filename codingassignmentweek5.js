class Car {
    constructor(model, year) {
        this.year = year;
        this.model = model;
    }

    decribe(){
        return `${this.model} made in the year ${this.year}.`;
    }
}


class Make {
    constructor(name) {
        this.name = name;
        this.cars = [];
    }

    addCar(car) {
        if(car instanceof Car) {
            this.cars.push(car);
        } else {
            throw new Error(`you can only add an instance of a Car. Argument is not a Car: ${car}`);

        }
    }

    describe() {
        return `${this.name} has ${this.cars.lenght} listed.` ;
    }
}

class Menu {
    constructor() {
        this.vehicle = [];
        this.selectedCar = null;
    }

    start() {
        let selection = this.showMainMenuOptions();

        while (selection != 0){
            switch (selection){
                case '1' :
                    this.createMake();
                    break;
                case '2':
                    this.viewMake();
                    break;
                case '3':
                    this.deleteMake();
                    break;
                case '4':
                    this.displayMakes();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }

        alert('Farewell!');
    }

    showMainMenuOptions() {
        return prompt(`
        0) exit
        1) Add make
        2) View makes
        3) Delete make
        4) Display all makes
        `);
    }

    showMakeMenuOptions(makeInfo) {
        return prompt(`
        0) Back
        1) Add Model
        2) Delete Model
        ----------------
        ${makeInfo}
        `);
    }

    displayMakes() {
        let makeString = '';
        for (let i = 0; i < this.vehicle.length; i++) {
            makeString += i + ') ' + this.vehicle[i].name + '\n';
        }
        alert(makeString);
    }

    createMake() {
        let name = prompt('Enter Make of car');
        this.vehicle.push(new Make(name));
    }

    viewMake() {
        let index = prompt('Enter the index of the Make you wish to view');
        if (index > -1 && index < this.vehicle.length) {
            this.selectedCar = this.vehicle[index];
            let description = 'Make Name: ' + this.selectedCar.name + '\n';

            for (let i = 0; i < this.selectedCar.cars.length; i++){
                description += i + ') ' + this.selectedCar.cars[i].year + ' - ' + this.selectedCar.cars[i].model + '\n';
            }

            let selection = this.showMakeMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createModel();
                    break;
                case '2':
                    this.deleteModel();
            }
        }
    }

    deleteMake(){
        let index = prompt('Enter the index of the Make you wish to delete:');
        if (index > -1 && index < this.vehicle.length) {
            this.vehicle.splice(index, 1);
        }
    }

    createModel() {
        let model = prompt('Enter Model of car: ');
        let year = prompt('Enter year of the car: ');
        this.selectedCar.cars.push(new Car(model, year));
    }
    deleteModel() {
        let index = prompt('Enter the index of the model you wish to delete:' );
        if (index > -1 && index < this.selectedCar.cars.length) {
            this.selectedCar.cars.splice(index, 1);
        }
    }
}


let menu = new Menu();
menu.start();