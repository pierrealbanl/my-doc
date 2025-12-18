---
id: modelisation-comportement-objets
title: 5. Modélisation du comportement des objets
---

# Modélisation du comportement des objets

## 5.1. Implémentation et méthodes : `impl`

Le mot-clé `impl` permet de définir le comportement associé à une `struct` ou à un `enum`, ainsi que d’implémenter des interfaces via les `trait`. Bien que Rust ne possède pas de classes, la combinaison de ces éléments permet de reproduire les principaux concepts de la programmation orientée objet.

### 5.1.1. Implémentation de méthodes pour une structure

```rust
struct Vehicle {
    manufacturer: String,
    weight: f32,
    engine_power: f32
}

impl Vehicle {
    fn calculate_speed(&self, seconds: f32) -> f32 {
        ((self.engine_power / self.weight) * seconds) * 3.6
    }
}

fn main() {
    // `vehicle` est une instance de `Vehicle`
    let vehicle = Vehicle {
        manufacturer: String::from("Ferrari"),
        weight: 1380.0,
        engine_power: 570.0
    };
    println!("{}", vehicle.manufacturer);
    println!("{}", vehicle.weight);
    println!("{}", vehicle.engine_power);

    println!("{}", vehicle.calculate_speed(10.0));
}
```

Ici, le bloc `impl` permet d’implémenter des méthodes pour la structure `Vehicle`. Ces méthodes définissent ce que l’objet est capable de faire, en utilisant ses propres données.

Dans une approche orientée objet, une instance de la structure est d’abord créée, puis la méthode associée est appelée sur cette instance afin de manipuler ou d’exploiter ses données.

### 5.1.2. Associer un comportement à un type avec les traits

Un trait permet de **définir un ensemble de méthodes communes.** Implémenter un trait pour un type donné `impl Trait for Type` oblige à écrire toutes les méthodes demandées par ce trait.

```rust 
struct Vehicle {
    manufacturer: String,
    weight: f32,
    engine_power: f32
}

trait CalculateSpeed {
    fn calculate_speed(&self, seconds: f32) -> f32;
}

impl CalculateSpeed for Vehicle {
    fn calculate_speed(&self, seconds: f32) -> f32 {
        ((self.engine_power / self.weight) * seconds) * 3.6
    }
}

fn main() {
    // `vehicle` est une instance de `Vehicle`
    let vehicle = Vehicle {
        manufacturer: String::from("Ferrari"),
        weight: 1380.0,
        engine_power: 570.0
    };
    println!("{}", vehicle.manufacturer);
    println!("{}", vehicle.weight);
    println!("{}", vehicle.engine_power);

    println!("{}", vehicle.calculate_speed(10.0));
}
```

Une fois le trait implémenté, les méthodes du trait peuvent être appelées directement sur les variables de ce type.

### 5.1.3. Implémentation de méthodes pour une énumération

```rust
enum VehicleFuel {
    Petrol {octane: i32},
    Diesel,
    Electric
}

impl VehicleFuel {
    fn vehicle_fuel(&self) {
        match self {
            VehicleFuel::Petrol {octane} => println!("{}", octane),
            VehicleFuel::Diesel => println!("Diesel"),
            VehicleFuel::Electric => println!("Electric"),
        }
    }
}

fn main() {
    // `fuel_petrol` est une instance de `VehicleFuel::Petrol`
    let fuel_petrol = VehicleFuel::Petrol { octane: 98 };
    fuel_petrol.vehicle_fuel();

    // `fuel_diesel` est une instance de `VehicleFuel::Diesel`
    let fuel_diesel = VehicleFuel::Diesel;
    fuel_diesel.vehicle_fuel();

    // `fuel_electric` est une instance de `VehicleFuel::Electric`
    let fuel_electric = VehicleFuel::Electric;
    fuel_electric.vehicle_fuel();
}
```

Ici, le bloc `impl` permet d’implémenter des méthodes pour l’énumération `VehicleFuel`. Ces méthodes adaptent leur comportement en fonction de la variante de l’énumération, en s’appuyant sur le mécanisme de pattern matching afin de traiter chaque cas de manière explicite.

Dans une approche orientée objet, une instance de l’énumération est d’abord créée, puis la méthode associée est appelée sur cette instance. Le comportement exécuté dépend alors de l’état ou de la forme représentée par la valeur de l’énumération.
