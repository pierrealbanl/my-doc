---
id: types-variables-fonctions
title: 1. Types standard, variables et fonctions
---

# Types standard, variables et fonctions

## 1.1. Types et déclaration de variables

Rust est un langage fortement typé et statique : chaque variable a un type connu à la compilation :

| **Type**                          | **Description**                                    |
|:----------------------------------|:---------------------------------------------------|
| `i8`, `i16`, `i32`, `i64`, `i128` | Entier signé (taille en bits)                      |
| `u8`, `u16`, `u32`, `u64`, `u128` | Entier non signé (taille en bits)                  |
| `isize`, `usize`                  | Entier dépendant de l’architecture (32 ou 64 bits) |
| `f32`                             | Nombre décimal (simple précision)                  |
| `f64`                             | Nombre décimal (double précision)                  |
| `bool`                            | Valeur logique (`true` ou `false`)                 |
| `char`                            | Un caractère Unicode (4 octets)                    |
| `&str`                            | Chaîne de caractères immuable empruntée            |
| `String`                          | Chaîne de caractères dynamique et possédée         |
| `()`                              | Type unité (équivalent à « rien » / `void`)        |

## 1.2. Déclaration d'une variable sans et avec type explicite

Par défaut, toutes les variables **ne peuvent pas voir leur valeur modifiée** après leur initialisation. Pour autoriser la modification de la valeur, il faut utiliser le mot-clé `mut`.

**Sans type explicite :**

```rust
fn main() {
    let n1 = 5;
    // n1 = 10; Erreur : réaffectation interdite
    println!("{n1}");

    let mut n2 = 5;
    n2 = 10;
    println!("{n2}");
}
```

**Avec type explicite :**

```rust
fn main() {
    let n1: i32 = 5;
    // n1 = 10; Erreur : réaffectation interdite
    println!("{n1}");

    let mut n2: i32 = 5;
    n2 = 10;
    println!("{n2}");
}
```

### 1.2.1. Les deux manières de déclarer une chaîne de caractères

`&str` est une référence vers une chaîne existante : elle ne possède donc pas la mémoire, **il n’est pas possible de modifier la valeur, aucune allocation n’est effectuée, et sa durée de vie est limitée à celle de la donnée référencée.** 

À l’inverse, `String` est une chaîne de caractères qui possède sa propre mémoire : **il est possible de modifier la valeur** (ajouter, supprimer ou changer du texte), **le type est responsable de libérer la mémoire, et sa durée de vie est entièrement contrôlée par le programme.**

```rust
fn main() {
    let mut s1: &str = "Hello World!";
    s1 = "World"; // Changement de référence
    println!("{s1}");

    let mut s2: String = String::from("Hello World!");
    s2 = String::from("World!"); // Réaffectation avec un nouveau String
    println!("{s2}");
}
```

## 1.3. Déclaration d’une fonction : paramètres typés et valeur retournée

Les paramètres d’une fonction ont toujours un type explicite, et le type de retour est indiqué après le symbole `->`. En Rust, la dernière expression de la fonction, lorsqu’elle n’est pas suivie d’un point-virgule, correspond à la valeur retournée :

```rust
fn sum(a: i32, b: i32) -> i32 {
    a + b
}

fn main() {
    let n: i32 = sum(5, 10);
    println!("{n}");
}
```
