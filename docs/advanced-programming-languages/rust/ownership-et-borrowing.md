---
id: ownership-et-borrowing
title: 3. Les concepts fondamentaux de l’ownership et du borrowing
---

# Les concepts fondamentaux de l’ownership et du borrowing

Rust est un langage de programmation bas niveau qui vise à offrir les performances du C tout en éliminant une large classe de bugs liés à la gestion de la mémoire. Pour cela, Rust introduit des règles strictes, vérifiées à la compilation, autour de deux concepts centraux : **l’ownership et le borrowing**.

## 3.1. L’ownership

En C, la gestion de la mémoire repose presque entièrement sur le programmeur. Le langage fournit des pointeurs, mais n’impose aucune règle stricte sur qui possède la donnée, qui a le droit de la modifier, ni combien de temps elle reste valide. Par exemple, lorsqu’un pointeur est copié, rien n’indique clairement qui devra libérer la mémoire, ce qui ouvre la porte aux doubles free, aux fuites mémoire ou aux accès invalides.

```C
int main(void) {
    char *s = malloc(10);
    char *copy = s; // copie du pointeur (même adresse)
    // s et copy sont valides ici et pointent vers la même zone mémoire
    // qui doit free(s) ? s ou copy ? les deux ? personne ?
}
```
Rust introduit une notion absente du C : **l’ownership.** Chaque valeur a un propriétaire unique, clairement défini par le langage. Lorsque cette propriété est transférée, l’ancien propriétaire n’a plus le droit d’utiliser la valeur. Cette règle, vérifiée à la compilation, supprime toute ambiguïté sur la libération de la mémoire.

```rust
fn main() {
    let s: String = String::from("Hello World!");
    let copy: String = s; // Ownership déplacé
    // s est invalide ici, impossible de l'utiliser
}
```

## 3.2. Le borrowing

Rust permet d’accéder à une donnée sans en être propriétaire grâce aux références, mais impose des règles d’emprunt strictes. Une valeur peut être empruntée par **plusieurs références immuables** permettant la lecture simultanée, ou par une **unique référence mutable**, qui autorise la lecture et l’écriture de manière exclusive. Ces règles sont vérifiées à la compilation et éliminent toute ambiguïté sur les accès mémoire, empêchant ainsi les data races avant même l’exécution du programme.

```rust
fn with_mutable_borrow() -> () {
    let mut n: i32 = 5;
    let p1: &mut i32 = &mut n;
    let p2: &mut i32 = &mut n; // Erreur : une valeur ne peut avoir qu’UNE référence mutable à la fois
    *p1 = 10;
    println!("{p1}");
}

fn with_immutable_borrows() -> () {
    let n: i32 = 5;
    let p1: &i32 = &n;
    let p2: &i32 = &n; // OK : plusieurs lectures simultanées
    println!("{p1} {p2}");
}

fn main() {
    with_mutable_borrow();
    with_immutable_borrows();
}
```

Ici, une valeur peut être empruntée soit plusieurs lecteurs `&n`, soit un seul écrivain `&mut n`, jamais les deux en même temps.

En résumé, Rust ne réinvente pas les concepts fondamentaux du C : pointeurs, accès indirect, durée de vie des données existaient déjà. La différence majeure est que Rust transforme ces règles implicites et mentales en contraintes explicites et vérifiées à la compilation. **Là où le C fait confiance au programmeur, Rust préfère refuser un programme potentiellement dangereux avant qu’il ne puisse produire un bug.**
