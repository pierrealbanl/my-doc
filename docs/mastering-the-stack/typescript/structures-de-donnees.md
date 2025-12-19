---
id: structures-de-donnees
title: 3. Les structures de données
---

# Les structures de données

## 3.1. Les objets

En TypeScript, **un objet** est une structure de données qui regroupe plusieurs valeurs sous forme de paires clé-valeur, chaque clé étant associée à un type précis. Il peut être créé librement sans passer par une classe, tandis qu’en Java, un objet provient toujours d’une classe définie à l’avance.

```ts
function index(): void {
    const obj: {name: string, age: number} = {
        name: "Bob",
        age: 20
    };
    console.log(obj);
}

index();
```

## 3.2. Les tableaux

**Les tableaux** sont plus simples à manipuler grâce aux méthodes intégrées directement dans le langage, tandis qu’en Java, leur utilisation est plus stricte et leur taille fixe dès la création.

```ts
function index(): void {
    const array: string[] = ["Bob", "Alice"];

    array[0] = "Eve";
    array[1] = "Alisson";
    console.log(array);
}

index();
```

:::info
À noter qu'il est également possible de créer un tableau avec `Array<T>`. Le fonctionnement reste identique, seule la manière de l’écrire change.

```ts
function index(): void {
    const array = new Array<string>();
    
    array.push("Bob");
    array.push("Alice");
    array[0] = "Eve";
    array[1] = "Alisson";
    console.log(array);
}

index();
```
:::

### 3.2.1. Manipuler les tableaux avec `map`, `filter`, `includes`, `sort` et `forEach`

Contrairement à Java où l’on doit passer par `stream()`, en TypeScript les méthodes de manipulation s’appliquent directement sur le tableau lui-même.

```ts
function index(): void {
    const array: string[] = ["Bob", "Alice", "Eve", "Alisson"];

    const filteredArray: string[] = array
        .map((s: string): string => s.toUpperCase())
        .filter((s: string): boolean => s === s.toUpperCase());
    console.log(filteredArray);

    console.log(filteredArray.includes("ALICE"));

    console.log(filteredArray.sort());

    filteredArray.forEach((value: string): void => console.log(value));
}

index();
```

## 3.3. Typage réutilisable avec `type`

`type` permet de donner un alias à une forme de donnée (objet, tableau, fonction, etc...) afin de la réutiliser facilement dans le code.

```ts
type Vehicle = {
    manufacturer: string;
    weight: number;
    enginePower: number;
}

function index(): void {
    const vehicle: Vehicle = {
        manufacturer: "Ferrari",
        weight: 1380,
        enginePower: 570
    };

    console.log(vehicle);

    const vehicleList: Vehicle[] = [
        {manufacturer: "Ferrari", weight: 1380, enginePower: 570},
        {manufacturer: "Mercedes", weight: 11700, enginePower: 625}
    ];

    console.log(vehicleList);
}

index();
```

## 3.4. Les interfaces

En TypeScript, **une interface** sert à décrire la structure d’un objet pour le typage, alors qu’en Java, elle sert à imposer un comportement que les classes doivent implémenter.

```ts
interface Vehicle {
    weight: number;
    enginePower: number;
}

function index(): void {
    const ferrari: Vehicle = {
        weight: 1380,
        enginePower: 570,
    };
    console.log(ferrari);
}

index();
```

Ici, l’interface permet de décrire un objet simple, tout comme le mot-clé `type` peut le faire. La différence apparaît à partir du moment où l’on manipule des **classes** : une `interface` peut en effet **définir des méthodes** qui seront ensuite **implémentées dans une classe** pour créer des **instances** (des objets) :

```ts
interface Vehicle {
    calculateSpeed(seconds: number): number;
}

class Car implements Vehicle {
    public constructor(public weight: number, public enginePower: number) {}

    public calculateSpeed(seconds: number): number {
        return ((this.enginePower / this.weight) * seconds) * 3.6;
    }
}

function index(): void {
    const ferrari = new Car(1380, 570);
    console.log("La Ferrari après 10 secondes :", ferrari.calculateSpeed(10), "km/h");
}

index();
```

## 3.5. Ensemble non ordonné d’éléments uniques : `Set<T>`

Le fonctionnement d’un `Set` en TypeScript est similaire à celui d’un `HashSet` en Java : il s’agit d’une structure de données qui permet de stocker une collection d’éléments uniques, sans ordre particulier.. Contrairement à Java, où l’on instancie souvent une classe concrète implémentant l’interface `Set` (par exemple `HashSet`), TypeScript fournit directement un unique type `Set<T>`.

Les principales méthodes disponibles pour manipuler un `Set` sont : `add`, `has`, `size`, `delete` et `clear` :

```ts
function index(): void {
    const vehicle = new Set<string>();

    vehicle.add("Ferrari");
    vehicle.add("Ferrari"); // Impossible d’ajouter un doublon
    vehicle.add("Mercedes");
    vehicle.add("Lamborghini");
    console.log("Les véhicules disponibles dans la liste :", vehicle);

    console.log(vehicle.has("Mercedes"));

    console.log("La taille de la liste est", vehicle.size);

    vehicle.delete("Lamborghini");
    vehicle.delete("Mercedes");
    console.log("Les véhicules disponibles dans la liste :", vehicle);

    vehicle.clear();
    console.log("Les véhicules disponibles dans la liste :", vehicle);
}

index();
```

## 3.6. Stocker et manipuler des paires clé–valeur : `Map<K,V>`

Le fonctionnement d’une `Map` en TypeScript est proche de celui d’une `HashMap` en Java : il s’agit d’une structure de données qui permet de stocker des paires clé/valeur. Contrairement à Java, où l’on instancie souvent une classe concrète implémentant l’interface `Map` (par exemple `HashMap`), TypeScript fournit directement un unique type `Map<K, V>`.

Les principales méthodes disponibles pour manipuler une `Map` sont : `set`, `get`, `has`, `size`, `delete` et `clear` :

```ts
function index(): void {
    const vehicle = new Map<string, number>();

    vehicle.set("Ferrari", 570);
    vehicle.set("Mercedes", 625);
    vehicle.set("Lamborghini", 740);
    console.log("Les véhicules disponibles dans la liste :", vehicle);

    console.log(vehicle.get("Ferrari"));

    console.log(vehicle.has("Mercedes"));

    console.log("La taille de la liste est", vehicle.size);

    vehicle.delete("Lamborghini");
    vehicle.delete("Mercedes");
    console.log("Les véhicules disponibles dans la liste :", vehicle);

    vehicle.clear();
    console.log("Les véhicules disponibles dans la liste :", vehicle);
}

index();
```
