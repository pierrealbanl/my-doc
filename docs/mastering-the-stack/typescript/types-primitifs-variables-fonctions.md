---
id: types-primitifs-variables-fonctions
title: 1. Types primitifs, variables et fonctions
---

# Types primitifs, variables et fonctions

## 1.1. Types primitifs et spéciaux

| **Type**    | **Description**                            |
| :---------- |:-------------------------------------------|
| `string`    | Chaîne de caractères                       |
| `number`    | Nombres (entiers, flottants)               |
| `bigint`    | Entiers très grands                        |
| `boolean`   | Valeur logique (`true` ou `false`)         |
| `null`      | Valeur nulle volontaire                    |
| `undefined` | Valeur non définie                         |
| `void`      | Absence de valeur de retour                |
| `any`       | Type qui accepte tout, désactive le typage |
| `unknown`   | Type inconnu, plus sûr que `any`           |

En TypeScript, comme en Java, il existe des **classes wrapper** mais il n’est pas nécessaire de les utiliser pour accéder aux méthodes associées.

En effet, les types primitifs (`string`, `number`, `boolean`, etc.) **permettent déjà d’appeler directement ces méthodes**. Cela est rendu possible grâce à un mécanisme interne appelé **auto-boxing** : lorsqu’une méthode est invoquée sur un primitif, le langage **convertit automatiquement et temporairement ce primitif** en son objet wrapper correspondant, exécute la méthode, puis retourne le résultat sous forme primitive.

Ainsi, même si les classes wrapper existent, elles ne sont pratiquement jamais utilisées car les primitives suffisent pour accéder aux fonctionnalités offertes.

## 1.2. Les différentes manières de déclarer une variable

En **JavaScript**, lorsqu’on déclare une variable, son type est implicite et peut changer au fil des réassignations : une variable initialisée avec une chaîne peut ensuite recevoir un nombre, sans que le langage ne s’y oppose.

En revanche, en **TypeScript**, une variable déclarée avec un type explicite ne pourra être réassignée qu’avec une valeur compatible avec ce type. Ainsi, si une variable est définie comme `string`, elle ne pourra plus contenir un `number` ou un `boolean`. Cela permet de prévenir des erreurs courantes dès la phase de compilation.

### 1.2.1. `const`

Déclare une **variable constante**, c’est-à-dire une variable qui **ne peut pas être réassignée une fois initialisée**.

```ts
function index(): void {
    const s: string = '';
    s = "Hello World!"; // Erreur : réaffectation interdite
    console.log(s);
}

index();
```

:::warning
Petite particularité : avec un objet ou un tableau, `const` empêche seulement de **changer la variable**, mais **pas de modifier l’objet** :

```ts
function allowed(): void {
    const obj: { name: string, age: number } = {
        name: "Bob",
        age: 20
    };
    obj.name = "Alice";
    obj.age = 25;
    console.log(obj);
}

allowed();

function notAllowed(): void {
    const obj: { name: string, age: number } = {
        name: "Bob",
        age: 20
    };
    obj = { name: "Alice", age: 25 } // Erreur : réaffectation interdite
    console.log(obj);
}

notAllowed();
```
:::

:::info
*Si la notion d’objet n’est pas claire, des explications sont proposées dans la section 5.*
:::

### 1.2.2. `let`

Déclare une **variable mutable**, c’est-à-dire une variable qui **peut être réassignée avec une nouvelle valeur**.

```ts
function index(): void {
    let s: string = '';
    s = "Hello World!";
    console.log(s);
}

index();
```

## 1.3. Les fonctions régulières : déclaration et expression de fonction

En TypeScript, il y a plusieurs manières d’écrire une fonction régulière :

```ts
function index(a: number, b: number): number {
    return a + b;
}

const functionInVariable = function(a: number, b: number): number {
    return a + b;
}

console.log(index(5, 5));
console.log(functionInVariable(5, 5));
```

Les deux formes réalisent exactement la même opération : elles définissent une fonction régulière qui peut être exécutée de la même manière. La distinction principale entre **une déclaration de fonction** et **une expression de fonction** réside dans le comportement de hoisting :

Le **hoisting** est un mécanisme de JavaScript dans lequel certaines déclarations sont traitées avant l’exécution du code. Concrètement, le moteur JavaScript déplace en mémoire les déclarations de fonctions au début de leur portée (scope). Cela signifie qu’une fonction déclarée avec la syntaxe `function` peut être appelée avant sa définition dans le code source, car elle a déjà été enregistrée par le moteur. Les variables déclarées avec `let` et `const` ne bénéficient pas du hoisting de la même manière : elles sont placées en mémoire mais ne sont accessibles qu’après leur ligne de déclaration (zone dite de Temporal Dead Zone).

- Déclaration de fonction : accessible dans tout le scope, y compris avant sa définition.
- Expression de fonction : accessible uniquement après son assignation à une variable.

## 1.4. Fonctions fléchées

Les fonctions fléchées (arrow functions) sont une manière raccourcie d’écrire des fonctions en TypeScript. Elles utilisent la syntaxe `(): type => {...}` au lieu du mot-clé `function`.

Elles sont généralement assignées à une variable : cela permet de manipuler la fonction comme une donnée. On peut la stocker, la transmettre en paramètre ou la renvoyer en résultat. Cette approche rend le code plus flexible, réutilisable et modulaire.

```ts
function functionInVariable(a: number, b: number): number {
    return a + b;
}

const ArrowFunction = (a: number, b: number): number => a + b;

console.log(functionInVariable(5,5));
console.log(ArrowFunction(5,5));
```

### 1.4.1. Retour implicite vs retour explicite

Une fonction fléchée peut utiliser deux formes de retour :

```ts
// Retour implicite
const ArrowFunctionImplicit = (a: number, b: number): number => a + b;

// Retour explicite
const ArrowFunctionExplicit = (a: number, b: number): number => {
    return a + b;
}

console.log(ArrowFunctionImplicit(5,5));
console.log(ArrowFunctionExplicit(5,5));
```

- Retour implicite : lorsque le corps de la fonction est écrit sans accolades `{...}`, la valeur de l’expression est automatiquement retournée.
- Retour explicite : lorsque le corps est entouré d’accolades `{...}`, l’utilisation du mot-clé `return` est nécessaire pour renvoyer une valeur.
