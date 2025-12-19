---
id: classes-heritage-modificateurs
title: 2. Classes, héritage et modificateurs
---

# Classes, héritage et modificateurs

## 2.1. Les classes et héritage

Le fonctionnement des classes et de l’héritage en TypeScript est très proche de celui de Java : on utilise également le mot-clé `class`, ainsi que `extends` pour créer une sous classe.

En revanche, le constructeur doit toujours être défini avec le mot-clé `constructor`, et la déclaration des propriétés se fait en indiquant d’abord un modificateur d’accès (par défaut `public`), suivi du nom de la propriété puis de son type, par exemple : `public weight: number;` :

```ts
class Vehicle {
    weight: number;
    enginePower: number;

    constructor(weight: number, enginePower: number) {
        this.weight = weight;
        this.enginePower = enginePower;
    }

    calculateSpeed(seconds: number): number {
        return ((this.enginePower / this.weight) * seconds) * 3.6;
    }
}

function index(): void {
    const ferrari = new Vehicle(1380, 570);
    console.log("La Ferrari après 10 secondes :", ferrari.calculateSpeed(10), "km/h");
}

index();
```

En TypeScript, il existe une **syntaxe abrégée** permettant de déclarer les propriétés directement dans la signature du constructeur. Cette écriture remplace à la fois la déclaration des propriétés et leur affectation dans le constructeur.

Le comportement reste exactement le même, mais la syntaxe est simplement plus concise :

```ts
class Vehicle {
    constructor(private weight: number, private enginePower: number) {}

    calculateSpeed(seconds: number): number {
        return ((this.enginePower / this.weight) * seconds) * 3.6;
    }
}

function index(): void {
    const ferrari = new Vehicle(1380, 570);
    console.log("La Ferrari après 10 secondes :", ferrari.calculateSpeed(10), "km/h");
}

index();
```

## 2.2. Les modificateurs

### 2.2.1. Modificateurs d’accès

Les modificateurs , `public`, `private` et `protected` s’appliquent aux propriétés, aux méthodes et aux constructeurs aussi bien en Java qu’en TypeScript, et remplissent un rôle conceptuellement identique. Une différence notable subsiste toutefois : **TypeScript ne possède pas la notion de package**, et **les classes sont publiques par défaut**. Ainsi, la visibilité d’une classe ne se contrôle pas avec le mot-clé `public`, mais avec les mots-clés `export` et `import`, qui déterminent simplement si la classe peut être utilisée depuis un autre fichier :

```ts title="vehicle.ts"
export class Vehicle {
    public constructor(private weight: number, private enginePower: number) {}

    public calculateSpeed(seconds: number): number {
        return ((this.enginePower / this.weight) * seconds) * 3.6;
    }
}
```

```ts title="index.ts"
import {Vehicle} from "./vehicle";

function index(): void {
    const ferrari = new Vehicle(1380, 570);
    console.log("La Ferrari après 10 secondes :", ferrari.calculateSpeed(10), "km/h");
}

index();
```

:::info
Si la classe n’est utilisée que dans le même fichier, il n’est pas nécessaire de l’exporter.
:::

### 2.2.2. Modificateurs non liés à l'accès

Les modificateurs `static` et `abstract` sont également communs à Java et à TypeScript. Ils peuvent être appliqués aux propriétés et aux méthodes et, dans le cas du modificateur `abstract`, également aux classes, avec une sémantique globalement comparable dans les deux langages. Une différence majeure doit toutefois être soulignée : **TypeScript ne dispose pas de l’équivalent du modificateur final appliqué à une classe**, ce qui signifie qu’on ne peut pas empêcher l’héritage comme en Java.

En revanche, pour les propriétés, TypeScript fournit le modificateur `readonly`, qui joue un rôle similaire à `final` :

| **Modificateur** | **Description**                                                 |
| :--------------- |:----------------------------------------------------------------|
| `readonly`       | Empêche une propriété d'être réassignée après l’initialisation. |

```ts
class Vehicle {
    public constructor(readonly weight: number, readonly enginePower: number) {}

    public ferrariWeight(): number {
        return this.weight = 1380; // Erreur de compilation
    }

    public calculateSpeed(seconds: number): number {
        return ((this.enginePower / this.weight) * seconds) * 3.6;
    }
}

function index(): void {
    const ferrari = new Vehicle(1380, 570);
    console.log("La Ferrari après 10 secondes :", ferrari.calculateSpeed(10), "km/h");
}

index();
```
