---
id: bases-react
title: 1. Comprendre les bases de React
---

# Comprendre les bases de React

Avant de commencer, il est essentiel de comprendre le principe de React : l’idée est d’intégrer du code HTML directement dans du TypeScript (ou JavaScript). Pour cela, on crée une fonction qui retourne du code HTML, grâce à une syntaxe appelée TSX. Voici un exemple :

```tsx title="React pur"
function Index() {
    return (
        <div>
            <p>Hello World!</p>
        </div>
    );
}

export default Index;
```

Les points importants à retenir sont les suivants :
- Le code HTML doit être placé entre parenthèses juste après le `return`.
- Le contenu retourné doit être englobé dans une balise parent, généralement un `<div></div>`.

## 1.1. Le Data Binding et ses différentes formes en React

Le data binding (liaison de données) est un mécanisme qui permet de synchroniser les données du code (logique) à leur représentation visuelle dans l’interface utilisateur (UI), et inversement.

Il assure que toute modification d’une donnée dans le code se reflète automatiquement dans l’affichage, et, dans certains cas, qu’une modification effectuée dans l’interface se répercute également sur la donnée dans le code :

- Quand les données changent dans le code → l’affichage se met automatiquement à jour.
- Dans certains cas → quand l’utilisateur agit dans l’interface (saisie, clic…), la donnée du code est aussi modifiée.

| **Type de binding** | **Syntaxe**             | **Exemple**                                                      |
| :------------------ |:------------------------|:-----------------------------------------------------------------|
| Interpolation       | `{data}`                | `<h1>{data}</h1>`                                                |
| Property binding    | `property={expression}` | `<img src={imageUrl} />`                                         |
| Event binding       | `onEvent={openDialog}`  | `<button onClick={() => openDialog()}>Click</button>`            |

## 1.2. Les Hooks en React

**Un Hook** est une fonction spéciale fournie par React qui permet d’ajouter des fonctionnalités à un composant fonctionnel, comme se souvenir de données, réagir à des changements ou encore interagir avec le navigateur.

### 1.2.1. `useState()`

Un état en React, c’est comme une mémoire pour ton composant. C’est une petite boîte où il peut **stocker une information** (un nombre, un texte, vrai/faux, etc.).

`useState()` est un outil qui permet de créer une valeur que le composant peut mémoriser, ainsi qu’une fonction pour la mettre à jour.

```tsx
const [count, setCount] = useState(0);
```

On donne une valeur de départ à `count` avec `useState(...)`, et on récupère aussi une fonction `setCount(...)` qui permet de changer cette valeur.

```tsx title="React pur"
import {useState} from "react"

function Index() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>Click here!</button>
            <p>Count = {count}</p>
        </div>
    );
}

export default Index;
```
À chaque fois que `setCount(...)` est appelé, React met à jour la valeur et réaffiche le composant avec la nouvelle donnée.

### 1.2.2. `useRef<HTMLDivElement>()`

`useRef<HTMLDivElement>()` permet de créer une référence vers une valeur persistante ou vers un élément du DOM.

```tsx
import {useRef} from "react";

function Index() {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <div ref={ref}>
            <p>Hello World!</p>
        </div>
    )
}

export default Index;
```

## 1.3. Rendu conditionnel

Le rendu conditionnel permet d’afficher un élément uniquement si une condition est remplie. Plusieurs techniques existent, chacune adaptée à des situations différentes.

### 1.3.1. Avec `&&`

```tsx title="React pur"
import {useState} from 'react';

function Index() {
    const [isVisible, setIsVisible] = useState(true);

    return (
        <div>
            <button onClick={() => setIsVisible(!isVisible)}>Click Here!</button>
            {isVisible && <p>Hello World!</p>}
        </div>
    );
}

export default Index;
```

Si `isVisible` vaut `true`, le paragraphe `<p>` est rendu. Si `isVisible` vaut `false`, rien n’est affiché.

Cette approche est particulièrement adaptée pour des cas simples où l’on souhaite afficher un élément uniquement dans une situation précise et rien sinon.

Elle est concise et lisible, mais limitée lorsqu’il s’agit de prévoir une alternative (par exemple afficher un autre contenu quand la condition est fausse).

### 1.3.2. Avec l’opérateur ternaire `?` `:`

L’opérateur ternaire permet d’exprimer une condition et de définir deux résultats possibles : l’un si la condition est vraie, l’autre si elle est fausse.

```tsx title="React pur"
import {useState} from 'react';

function Index() {
    const [isVisible, setIsVisible] = useState(true);

    return (
        <div>
            <button onClick={() => setIsVisible(!isVisible)}>Click Here!</button>
            {isVisible ? <p>Hello World!</p> : <p>Goodbye!</p>}
        </div>
    );
}

export default Index;
```

Dans cet exemple, si `isVisible` vaut `true`, le texte affiché sera *"Hello World!"*. Sinon, *"Goodbye!"* apparaîtra. Cette méthode est idéale lorsqu’il existe deux cas distincts à gérer.

## 1.4. Utilisation de `.map()` et différence avec TypeScript

La méthode `.map()` n’est pas utilisée de la même manière en TypeScript qu’en React. En TypeScript, elle sert principalement à **transformer un tableau en un autre tableau** : `["Bob", "Alice", "Eve"]` devient `["BOB", "ALICE", "EVE"]`

```tsx
// `["Bob", "Alice", "Eve"]` devient `["BOB", "ALICE", "EVE"]`
```

En revenche, en React, `.map()` est le plus souvent utilisé pour **convertir un tableau en une liste d’éléments JSX,** afin d’être rendus dans l’interface utilisateur :

```tsx title="React pur"
import {useState} from 'react';

function Index() {
    const [isVisible, setIsVisible] = useState(true);
    const items: string[] = ["Bob", "Alice", "Eve", "Alisson"]

    return (
        <div>
            <button onClick={() => setIsVisible(!isVisible)}>Info</button>
            {isVisible &&
                <ul>
                    {items.map((item: string, i: number) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>
            }
        </div>
    )
}

export default Index;
```

:::info
`key` permet à React d’identifier chaque élément d’une liste de façon unique, exactement comme si on parcourait la liste avec une boucle `for`.
:::
