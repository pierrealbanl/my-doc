---
id: structures-de-donnees
title: 3. Les structures de données
---

# Les structures de données

## 3.1. Les tableaux

En Rust, un tableau ne se résume pas à une simple collection de valeurs : **sa taille est intégrée à son type.** La création d’un tableau repose donc sur une définition explicite du type et du nombre d’éléments à l’aide de la syntaxe `[T; N]`. Ainsi, `[i32; 0]` et `[i32; 1]` correspondent à **deux types distincts**, ce qui permet d’éliminer toute ambiguïté ou erreur de dimension dès la compilation, avant même l’exécution du programme.
```rust
fn main() {
    let mut array: [i32; 4] = [0, 10, 15, 20];
    array[0] = 5;
    
    // Affichage de l’ensemble du tableau
    println!("{:?}", array);

    // Parcours du tableau via une référence (sans le consommer)
    for i in &array {
        println!("{i}")
    }
}
```

L’affichage d’un tableau se fait à l’aide du spécificateur de format `{:?}`, qui permet d’utiliser l’affichage de débogage.

## 3.2. Vecteur `Vec<T>` : structure de données dynamique

À la différence d’un tableau classique dont la taille est déterminée à la compilation, un vecteur `Vec<T>` est une structure de données dynamique permettant de stocker plusieurs éléments de même type, avec une taille modifiable durant l’exécution du programme.

```rust
fn main() {
    let mut vector: Vec<i32> = Vec::new();
    vector.push(0);
    vector.push(10);
    vector.push(15);
    vector.push(20);
    println!("{:?}", vector);

    vector.insert(1, 5);
    println!("{:?}", vector);

    println!("{}", vector.len());

    vector.remove(0);
    println!("{:?}", vector);

    vector.pop();
    println!("{:?}", vector);
}
```

## 3.3. Les tuples

En Rust, un tuple est une structure simple qui regroupe un nombre fixe d'éléments, où chaque élément peut avoir un type différent.

```rust
fn main() {
    let mut tuple: (&str, i32) = ("Bob", 20);
    println!("{:?}", tuple);

    tuple.0 = "Alice";
    tuple.1 = 25;
    println!("{:?}", tuple);
}
```

:::warning
Les tuples ne sont pas itérables avec for car leurs éléments peuvent être de types différents et leur taille est fixe à la compilation.
:::

### 3.3.1. Déstructuration des tuples

La déstructuration d’un tuple permet d’extraire ses valeurs et de les assigner à des variables distinctes.

```rust
fn main() {
    let tuple: (&str, i32) = ("Bob", 20);
    let (name, age) = tuple;
    println!("{name} {age}");
}
```

## 3.4. Stocker et manipuler des paires clé–valeur : `HashMap`

`HashMap` est une structure de données de la bibliothèque standard de Rust permettant d’associer des clés à des valeurs. Elle est définie dans le module `std::collections` et doit être importée avant toute utilisation.

```rust
use std::collections::HashMap;

fn main() {
    let mut map: HashMap<&str, i32> = HashMap::new();
    map.insert("Bob", 20);
    map.insert("Alice", 25);
    println!("{:?}", map);

    // Parcours des éléments avec une boucle `for`
    for (name, age) in &map {
        println!("{name} {age}");
    }

    map.remove("Alice");
    println!("{:?}", map);
}
```

### 3.4.1. Accéder à une valeur dans une `HashMap`

La méthode `.get` permet d’accéder à la valeur associée à une clé dans une HashMap. Elle renvoie une `Option<T>`, qu’il faut traiter pour gérer le cas où la clé n’existe pas. Il existe plusieurs façons de traiter cette valeur selon que la clé est présente ou non :

```rust
use std::collections::HashMap;

fn main() {
    let mut map: HashMap<&str, i32> = HashMap::new();
    map.insert("Bob", 20);
    map.insert("Alice", 25);

    // Accès à une valeur avec `if let Some(...)`
    if let Some(age) = map.get("Bob") {
        println!("{age}");
    }

    // Accès à une valeur avec `match`
    match map.get("Bob") {
        Some(age) => println!("{age}"),
        None => println!("Error: no value associated with this key"),
    }
}
```
